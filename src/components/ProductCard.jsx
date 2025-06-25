import { ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.css";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();
  const { addToCart } = useCart();

  const { name, price, imageUrl, inStock } = product;

  const convertedPrice = exchangeToCurrentCurrency(price);

  function handleAddToCart() {
    const alreadyInCart = addToCart(product);
    if (alreadyInCart) {
      alert(`${name} is already in your cart.`);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x400/e2e8f0/cbd5e0?text=Image+Not+Found";
          }}
        />

        {!inStock && (
          <div className={styles.outOfStockOverlay}>
            <span>OUT OF STOCK</span>
          </div>
        )}

        {inStock && (
          <button onClick={handleAddToCart} className={styles.cartButton}>
            <ShoppingCart size={24} />
          </button>
        )}
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>
          {currencySymbol}
          {convertedPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
