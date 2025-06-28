import styles from "./Navigation.module.css";
import { useCurrency } from "../contexts/CurrencyContext";
import Logo from "./Logo.jsx";
import { useCategory } from "../contexts/CategoryContext.jsx";
import Cart from "./Cart.jsx";
import { Link } from "react-router";

const navItems = ["WOMEN", "MEN", "KIDS"];

export default function Navigation() {
  const { currency, changeCurrency, currencySymbol } = useCurrency();
  const { category, changeCategory } = useCategory();

  return (
    <header>
      <div className={`container ${styles.navWrapper}`}>
        <nav className={styles.navLeft}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item}>
                <button
                  href="#"
                  onClick={() => changeCategory(item)}
                  className={`${styles.navLink} ${
                    category === item ? styles.active : ""
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Link to={"/"} className={styles.logo}>
          <Logo />
        </Link>

        <div className={styles.controlsRight}>
          <div className={styles.currencySelector}>
            <button className={styles.controlButton}>
              <span style={{ fontSize: "18px" }}>{currencySymbol}</span>
              <div className={styles.currencyArrow}>{">"}</div>
            </button>
            <ul className={styles.currencyMenu}>
              <li>
                <button
                  className={currency === "USD" ? styles.active : ""}
                  onClick={() => changeCurrency("USD")}
                >
                  <span>$</span>
                  <span>USD</span>
                </button>
              </li>
              <li>
                <button
                  className={currency === "EUR" ? styles.active : ""}
                  onClick={() => changeCurrency("EUR")}
                >
                  <span>€</span>
                  <span>EUR</span>
                </button>
              </li>
              <li>
                <button
                  className={currency === "JPY" ? styles.active : ""}
                  onClick={() => changeCurrency("JPY")}
                >
                  <span>¥</span>
                  <span>JPY</span>
                </button>
              </li>
            </ul>
          </div>

          <Cart />
        </div>
      </div>
    </header>
  );
}
