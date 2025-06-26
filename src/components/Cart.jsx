import { ShoppingCart } from "lucide-react";
import styles from "./Cart.module.css";
import { useCart } from "../contexts/CartContext";
import CartDetails from "./CartDetails";
import { Link } from "react-router";

export default function Cart() {
  const { totalItems } = useCart();

  return (
    <div className={styles.cartWrapper}>
      <Link to={"/cart"} className={styles.controlButton}>
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </Link>

      <CartDetails shouldBeVisible={false} />
    </div>
  );
}
