import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import { CartProvider } from "../contexts/CartContext";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import { CategoryProvider } from "../contexts/CategoryContext";

export default function Layout() {
  const location = useLocation();

  const pathsToHideNav = ["/checkout"];
  const shouldHideNav = pathsToHideNav.includes(location.pathname);

  return (
    <CartProvider>
      <CurrencyProvider>
        <CategoryProvider>
          {!shouldHideNav && <Navigation />}
          <Outlet />
        </CategoryProvider>
      </CurrencyProvider>
    </CartProvider>
  );
}
