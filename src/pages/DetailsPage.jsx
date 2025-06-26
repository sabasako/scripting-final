import { useParams } from "react-router";
import products from "../products.json";
import styles from "./DetailsPage.module.css";
import { useState } from "react";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";

export default function DetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => +p.id === +id);

  const { addToCart, cartItems } = useCart();
  const { exchangeToCurrentCurrency, currencySymbol } = useCurrency();

  const [localSize, setLocalSize] = useState();

  if (!product) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "70px" }}>
        Product not found
      </h1>
    );
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  function handleSizeChange(newSize) {
    setLocalSize(newSize);
  }

  function handleAddToCart() {
    addToCart(product, localSize);
    if (isInCart) {
      alert(`${name} is already in your cart.`);
    }
  }

  return (
    <main className={`${styles.detailsPage} container`}>
      <div className={styles.imagesContainer}>
        <div className={styles.smallImagesContainer}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productSmallImage}
          />

          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productSmallImage}
          />

          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productSmallImage}
          />
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div>
        <h1>{product.name}</h1>

        <div className={styles.itemOptions}>
          <div className={styles.optionLabel}>Size:</div>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${
                  localSize === size ? styles.sizeButtonSelected : ""
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: "18px" }}>
          <p>Price:</p>
          <div className={styles.price}>
            {currencySymbol}
            {exchangeToCurrentCurrency(product.price)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`${styles.addToCartButton} ${isInCart && styles.isInCart}`}
        >
          {isInCart ? "Already in Cart" : "Add to Cart"}
        </button>

        <p className={styles.description}>{product.description}</p>
      </div>
    </main>
  );
}
