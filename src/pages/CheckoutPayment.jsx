import { z } from "zod";
import Breadcrumbs from "../components/form/Breadcrumbs";
import FormActions from "../components/form/FormActions";
import ShippingTable from "../components/form/ShippingTable";
import { useCheckout } from "../contexts/CheckoutContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/form/FormInput";
import { CircleCheck, CreditCard, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { paymentSchema } from "../schemas/paymentSchema";
import { detailsSchema } from "../schemas/detailsSchema";
import { useNavigate, useSearchParams } from "react-router";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPayment() {
  const { details, setDetails } = useCheckout();
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();
  const { cartItems, resetCart } = useCart();
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState("payment");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    mode: "onBlur",
    defaultValues: {
      cardNumber: details.cardNumber || "",
      cardHolder: details.cardHolder || "",
      cardExpiry: details.cardExpiry || "",
      cardCVV: details.cardCVV || "",
    },
  });

  const data = [
    {
      heading: "Contact",
      label: details.email,
    },
    {
      heading: "Ship To",
      label: `${details.address}, ${details.postalCode}, ${details.city}, ${details.province}, ${details.country}`,
    },
    {
      heading: "Method",
      label:
        details.shippingMethod === "standard"
          ? "Standard Shipping - FREE"
          : `Express Shipping - ${currencySymbol}${exchangeToCurrentCurrency(
              4.99
            )}`,
    },
  ];

  async function onSubmit(data) {
    try {
      setLoading(true);

      setDetails((prevDetails) => ({
        ...prevDetails,
        cardNumber: data.cardNumber,
        cardHolder: data.cardHolder,
        cardExpiry: data.cardExpiry,
        cardCVV: data.cardCVV,
      }));

      validateDetails({
        ...details,
        cardNumber: data.cardNumber,
        cardHolder: data.cardHolder,
        cardExpiry: data.cardExpiry,
        cardCVV: data.cardCVV,
      });

      await new Promise(() => {
        setTimeout(() => {
          setLoading(false);
          setSearchParams({ paymentStatus: "success" });

          setFormState("success");
        }, 2000);
      });
    } catch (error) {
      console.error("Payment submission error:", error);
      alert(
        "Please fix the following errors:\n \n" + error?.message ||
          "An error occurred during payment submission. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function validateDetails(checkoutData) {
    if (cartItems.length === 0) {
      throw new Error("Your cart is empty. Please add items to your cart.");
    }

    const fullCheckoutSchema = detailsSchema.merge(paymentSchema);
    const result = fullCheckoutSchema.safeParse(checkoutData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const combinedErrors = Object.values(fieldErrors).flat().join("\n");

      throw new Error(combinedErrors);
    }
  }

  function handleExpiryInput(e) {
    const target = e.target;
    let value = target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    target.value = value;
  }

  function handleReset() {
    setDetails({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      shippingNote: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      saveInfo: false,
      shippingMethod: "standard",
      cardNumber: "",
      cardHolder: "",
      cardExpiry: "",
      cardCVV: "",
    });
    resetCart();
    navigate("/");
  }

  if (formState === "success") {
    return (
      <section>
        <Breadcrumbs />

        <div className="checkout-success">
          <CircleCheck className="success-icon" />
          <h2>Payment Confirmed</h2>
          <p>ORDER #2039</p>

          <button onClick={handleReset}>Back to shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Breadcrumbs />
      <ShippingTable data={data} even />
      <h2 className="shipping-heading">Payment method</h2>

      <div></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="payment-form"
        id="paymentForm"
      >
        <div className="payment-header">
          <CreditCard size={28} />
          <h3>Credit Card</h3>
        </div>

        <div className="payment-input-container">
          <FormInput
            id="cardNumber"
            label="Card Number"
            register={register}
            error={errors.cardNumber}
          />

          <FormInput
            id="cardHolder"
            label="Holder Name"
            register={register}
            error={errors.cardHolder}
          />

          <div className="payment-input-wrapper">
            <FormInput
              id="cardExpiry"
              label="Expiration (MM/YY)"
              register={register}
              onInput={handleExpiryInput}
              error={errors.cardExpiry}
            />
            <FormInput
              id="cardCVV"
              label="CVV"
              register={register}
              error={errors.cardCVV}
              type="password"
              maxLength={4}
            />
          </div>
        </div>
      </form>

      <FormActions
        formId={"paymentForm"}
        backLabel={"Back to shipping"}
        submitLabel={"Pay now"}
        backUrl={"/checkout/success"}
      />

      {loading && (
        <div className="payment-loading">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
    </section>
  );
}
