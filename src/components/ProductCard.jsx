import { ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.css";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { currencySymbol, exchangeToCurrentCurrency } = useCurrency();
  const { addToCart, cartItems } = useCart();

  const { name, price, imageUrl, inStock } = product;

  const convertedPrice = exchangeToCurrentCurrency(price);

  function handleAddToCart() {
    addToCart(product);
    if (isInCart) {
      alert(`${name} is already in your cart.`);
    }
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Link to={`/details/${product.id}`} className={styles.card}>
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
          <button
            disabled={isInCart}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              handleAddToCart();
            }}
            className={`${styles.cartButton} ${isInCart ? styles.inCart : ""}`}
          >
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
    </Link>
  );
};

export default ProductCard;
