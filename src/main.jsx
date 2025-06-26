import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout.jsx";
import CartPage from "./pages/CartPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import CheckoutPage from "./pages/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "details/:id",
        Component: DetailsPage,
      },
      {
        path: "checkout",
        Component: CheckoutPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
