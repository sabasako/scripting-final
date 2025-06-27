import { Minus, Plus } from "lucide-react";
import styles from "./Cart.module.css";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { Link } from "react-router";

export default function CartDetails({ shouldBeVisible = true }) {
  const {
    cartItems,
    handleQuantityChange,
    handleSizeChange,
    totalItems,
    totalPrice,
  } = useCart();

  const { exchangeToCurrentCurrency, currencySymbol } = useCurrency();

  return (
    <div
      className={`${styles.popover} ${
        shouldBeVisible ? styles.visible : styles.hidden
      }`}
    >
      {shouldBeVisible ? (
        <h1 className={styles.header}>Cart</h1>
      ) : (
        <h3 className={styles.popoverHeader}>
          My Bag, <span className={styles.itemCount}>{totalItems} items</span>
        </h3>
      )}

      <div
        className={`${styles.itemList} ${shouldBeVisible ? "" : styles.hidden}`}
      >
        {cartItems.map((item) => {
          const convertedPrice = exchangeToCurrentCurrency(item.price);

          return (
            <div
              key={item.id}
              className={`${styles.cartItem} ${
                shouldBeVisible ? styles.visible : ""
              }`}
            >
              <div className={styles.itemDetails}>
                <div>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>
                    {currencySymbol}
                    {convertedPrice}
                  </div>
                </div>
                <div className={styles.itemOptions}>
                  <div className={styles.optionLabel}>Size:</div>
                  <div className={styles.sizeOptions}>
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        className={`${styles.sizeButton} ${
                          item.size === size ? styles.sizeButtonSelected : ""
                        }`}
                        onClick={() => handleSizeChange(item.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.itemRight}>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <Minus size={14} />
                  </button>
                </div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.itemImage}
                />
              </div>
            </div>
          );
        })}
      </div>

      {shouldBeVisible ? (
        <div>
          <div style={{ fontSize: "24px" }}>
            Quantity: <strong>{totalItems}</strong>
          </div>
          <div style={{ fontSize: "24px" }}>
            Total:{" "}
            <strong>
              {currencySymbol}
              {exchangeToCurrentCurrency(totalPrice)}
            </strong>
          </div>

          {totalItems > 0 && (
            <Link to="/checkout/details" className={styles.continueButton}>
              Continue
            </Link>
          )}
        </div>
      ) : (
        <div className={styles.popoverFooter}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>
              {currencySymbol}
              {exchangeToCurrentCurrency(totalPrice)}
            </span>
          </div>

          <div className={styles.actionButtons}>
            <Link to="/cart" className={styles.viewBagButton}>
              VIEW BAG
            </Link>
            {totalItems > 0 && (
              <Link to="/checkout/details" className={styles.checkoutButton}>
                CHECK OUT
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
