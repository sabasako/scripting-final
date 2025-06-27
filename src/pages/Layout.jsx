import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import { CartProvider } from "../contexts/CartContext";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import { CategoryProvider } from "../contexts/CategoryContext";
import { CheckoutProvider } from "../contexts/CheckoutContext";

export default function Layout() {
  const location = useLocation();

  const pathsToHideNav = ["/checkout"];
  const shouldHideNav = pathsToHideNav.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <CartProvider>
      <CheckoutProvider>
        <CurrencyProvider>
          <CategoryProvider>
            {!shouldHideNav && <Navigation />}
            <Outlet />
          </CategoryProvider>
        </CurrencyProvider>
      </CheckoutProvider>
    </CartProvider>
  );
}
