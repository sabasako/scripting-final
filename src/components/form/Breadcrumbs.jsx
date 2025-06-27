import { Link, useLocation } from "react-router";

export default function Breadcrumbs() {
  const location = useLocation();

  const breadcrumbs = [
    { label: "Cart", href: "/cart", status: "finished" },
    {
      label: "Details",
      href: "/checkout/details",
      status: location.pathname === "/checkout/details" ? "active" : "finished",
    },
    {
      label: "Shipping",
      href: "/checkout/shipping",
      status:
        location.pathname === "/checkout/shipping"
          ? "active"
          : location.pathname === "/checkout/payment"
          ? "finished"
          : "",
    },
    {
      label: "Payment",
      href: "/checkout/payment",
      status: location.pathname === "/checkout/payment" ? "active" : "",
    },
  ];

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href}>
          <Link
            to={crumb.href}
            className={`breadcrumb-link ${
              crumb.status === "active"
                ? "active"
                : crumb.status === "finished"
                ? "finished"
                : ""
            }
                      `}
          >
            {crumb.label}
          </Link>
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
}
