import { Minus, Plus, ShoppingCart } from "lucide-react";
import styles from "./Cart.module.css";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";

export default function Cart() {
  const {
    cartItems,
    handleQuantityChange,
    handleSizeChange,
    totalItems,
    totalPrice,
  } = useCart();

  const { exchangeToCurrentCurrency, currencySymbol } = useCurrency();

  return (
    <div className={styles.cartWrapper}>
      <button className={styles.controlButton}>
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </button>

      <div className={styles.popover}>
        <h3 className={styles.popoverHeader}>
          My Bag, <span className={styles.itemCount}>{totalItems} items</span>
        </h3>

        <div className={styles.itemList}>
          {cartItems.map((item) => {
            const convertedPrice = exchangeToCurrentCurrency(item.price);

            return (
              <div key={item.id} className={styles.cartItem}>
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

        <div className={styles.popoverFooter}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>
              {currencySymbol}
              {exchangeToCurrentCurrency(totalPrice)}
            </span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.viewBagButton}>VIEW BAG</button>
            <button className={styles.checkoutButton}>CHECK OUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
