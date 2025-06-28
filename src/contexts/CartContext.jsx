import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) return;

    setCartItems((items) => [
      ...items,
      { ...product, quantity: 1, size: size || product.sizes[0] },
    ]);
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSizeChange = (id, newSize) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, size: newSize } : item))
    );
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        handleQuantityChange,
        handleSizeChange,
        addToCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
