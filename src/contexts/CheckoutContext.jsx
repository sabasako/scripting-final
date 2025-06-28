import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [details, setDetails] = useState({
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

  return (
    <CheckoutContext.Provider value={{ details, setDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
