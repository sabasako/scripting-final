import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const exchangeRates = {
  USD: 1,
  EUR: 0.86,
  JPY: 145.6,
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); // USD || EUR || JPY

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const exchangeToCurrentCurrency = (price) => {
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const currencySymbol =
    currency === "USD" ? "$" : currency === "EUR" ? "€" : "¥";

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        exchangeRates,
        currencySymbol,
        changeCurrency,
        exchangeToCurrentCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
