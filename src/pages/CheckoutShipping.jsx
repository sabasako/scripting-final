import { useNavigate } from "react-router";
import Breadcrumbs from "../components/form/Breadcrumbs";
import FormActions from "../components/form/FormActions";
import ShippingTable from "../components/form/ShippingTable";
import { useCheckout } from "../contexts/CheckoutContext";
import { useCurrency } from "../contexts/CurrencyContext";

export default function CheckoutShipping() {
  const { details, setDetails } = useCheckout();
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();
  const navigate = useNavigate();

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

    navigate("/checkout/payment");
  }

  function changeMethod(method) {
    setDetails((prevDetails) => ({
      ...prevDetails,
      shippingMethod: method,
    }));
  }

  return (
    <section>
      <Breadcrumbs />
      <ShippingTable data={data} />

      <h2 className="shipping-heading">Shipping method</h2>
      <div className="shipping-option-container">
        <button
          onClick={() => changeMethod("standard")}
          className="shipping-option"
        >
          <input
            type="checkbox"
            onChange={() => changeMethod("standard")}
            checked={details.shippingMethod === "standard"}
          />
          <div>
            <p className="shipping-name">Standard Shipping</p>
            <p className="shipping-price">Free</p>
          </div>
        </button>

        <button
          onClick={() => changeMethod("express")}
          className="shipping-option"
        >
          <input
            type="checkbox"
            onChange={() => changeMethod("express")}
            checked={details.shippingMethod === "express"}
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
