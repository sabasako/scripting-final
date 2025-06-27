import { Outlet } from "react-router";
import "../components/form/forms.css";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";

export default function CheckoutLayout() {
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();
  const { cartItems, totalPrice } = useCart();

  return (
    <main className="checkout-container">
      <div className="form-container">
        <Outlet />
      </div>
      <section className="summary-section">
        <div className="product-summary">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product.id} className="product-item">
                <div style={{ position: "relative" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-quantity-badge">
                    {product.quantity}
                  </div>
                </div>
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <p>
                    {currencySymbol}
                    {exchangeToCurrentCurrency(product.price)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h3 className="section-header">Your Cart is Empty</h3>
          )}
        </div>
        <div className="price-details">
          <div className="price-row">
            <span>Subtotal</span>
            <span>
              {currencySymbol}
              {exchangeToCurrentCurrency(totalPrice)}
            </span>
          </div>
          <div className="price-row">
            <span>Shipping</span>
            <span>Calculated at the next step</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>
              {currencySymbol}
              {exchangeToCurrentCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
