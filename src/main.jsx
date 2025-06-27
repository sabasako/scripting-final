import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout.jsx";
import CartPage from "./pages/CartPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import CheckoutDetails from "./pages/CheckoutDetails.jsx";
import CheckoutLayout from "./pages/CheckoutLayout.jsx";
import CheckoutShipping from "./pages/CheckoutShipping.jsx";
import CheckoutPayment from "./pages/CheckoutPayment.jsx";

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
        Component: CheckoutLayout,
        children: [
          {
            path: "details",
            Component: CheckoutDetails,
          },
          {
            path: "shipping",
            Component: CheckoutShipping,
          },
          {
            path: "payment",
            Component: CheckoutPayment,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
