import { useState } from "react";
import Breadcrumbs from "../components/form/Breadcrumbs";
import FormActions from "../components/form/FormActions";
import ShippingTable from "../components/form/ShippingTable";
import { useCheckout } from "../contexts/CheckoutContext";
import { useCurrency } from "../contexts/CurrencyContext";

export default function CheckoutShipping() {
  const { details, setDetails } = useCheckout();
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();

  const [shippingMethod, setShippingMethod] = useState("standard");

  const data = [
    {
      heading: "Contact",
      label: details.email,
    },
    {
      heading: "Ship To",
      label: `${details.address}, ${details.postalCode}, ${details.city}, ${details.province}, ${details.country}`,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    setDetails((prevDetails) => ({
      ...prevDetails,
      shippingMethod,
    }));
  }

  return (
    <section>
      <Breadcrumbs />
      <ShippingTable data={data} />

      <h2 className="shipping-heading">Shipping method</h2>
      <div className="shipping-option-container">
        <button
          onClick={() => setShippingMethod("standard")}
          className="shipping-option"
        >
          <input
            type="checkbox"
            onChange={() => setShippingMethod("standard")}
            checked={shippingMethod === "standard"}
          />
          <div>
            <p className="shipping-name">Standard Shipping</p>
            <p className="shipping-price">Free</p>
          </div>
        </button>

        <button
          onClick={() => setShippingMethod("express")}
          className="shipping-option"
        >
          <input
            type="checkbox"
            onChange={() => setShippingMethod("express")}
            checked={shippingMethod === "express"}
          />
          <div>
            <p className="shipping-name">Express Shipping</p>
            <p className="shipping-price">
              {currencySymbol}
              {exchangeToCurrentCurrency(4.99)}
            </p>
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <FormActions
          backLabel={"Back to details"}
          submitLabel={"Go to payment"}
          backUrl={"/checkout/details"}
        />
      </form>
    </section>
  );
}
