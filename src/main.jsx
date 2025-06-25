import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout.jsx";
import { CategoryProvider } from "./contexts/CategoryContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [{ index: true, Component: App }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <CurrencyProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </CurrencyProvider>
    </CartProvider>
  </StrictMode>
);
