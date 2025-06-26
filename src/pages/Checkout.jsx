import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import "../components/form/forms.css";
import { Link } from "react-router";

const shippingSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  shippingNote: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  province: z.string().min(1, { message: "Please select a province" }),
  country: z.string().min(1, { message: "Please select a country" }),
  saveInfo: z.boolean().optional(),
});

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
  });

  function onSubmit(data) {
    console.log("Form submitted successfully:", data);
    alert("Form submitted! Check the console for the data.");
  }

  const product = {
    name: "Running Short",
    price: 50.0,
    quantity: 1,
    image: "https://placehold.co/100x100/e0e0e0/000000?text=Item",
  };

  const breadcrumbs = [
    { label: "Cart", href: "/cart" },
    { label: "Details", href: "/checkout" },
    { label: "Shipping", href: "/shipping" },
    { label: "Payment", href: "/payment" },
  ];

  return (
    <div className="checkout-container">
      <section className="form-section">
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <Link
                to={crumb.href}
                className={`breadcrumb-link ${
                  crumb.href === "/checkout" ? "active" : ""
                }
                ${crumb.href === "/cart" ? "finished" : ""}
                `}
              >
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="checkout-form"
          noValidate
        >
          <h2 className="section-header">Contact</h2>
          <FormInput
            id="email"
            label="Email or mobile phone number"
            register={register}
            error={errors.email}
          />

          <h2 className="section-header" style={{ marginTop: "40px" }}>
            Shipping Address
          </h2>
          <div className="form-row">
            <FormInput
              id="firstName"
              label="Name"
              register={register}
              error={errors.firstName}
            />
            <FormInput
              id="lastName"
              label="Second Name"
              register={register}
              error={errors.lastName}
            />
          </div>
          <FormInput
            id="address"
            label="Address and number"
            register={register}
            error={errors.address}
          />
          <FormInput
            id="shippingNote"
            label="Shipping note (optional)"
            register={register}
            error={errors.shippingNote}
          />
          <div className="form-row">
            <FormInput
              id="city"
              label="City"
              register={register}
              error={errors.city}
            />
            <FormInput
              id="postalCode"
              label="Postal Code"
              register={register}
              error={errors.postalCode}
            />
          </div>
          <div className="form-row">
            <FormSelect
              id="province"
              label="Province"
              register={register}
              error={errors.province}
            >
              <option value="">Province</option>
              <option value="ON">Ontario</option>
              <option value="QC">Quebec</option>
              <option value="BC">British Columbia</option>
            </FormSelect>

            <FormSelect
              id="country"
              label="Country/Region"
              register={register}
              error={errors.country}
            >
              <option value="IT">Italy</option>
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </FormSelect>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="saveInfo" {...register("saveInfo")} />
            <label htmlFor="saveInfo">
              Save this information for a future fast checkout
            </label>
          </div>

          <div className="form-actions">
            <a href="#" className="link-secondary">
              Back to cart
            </a>
            <button type="submit" className="btn btn-primary">
              Go to shipping
            </button>
          </div>
        </form>
      </section>

      <section className="summary-section">
        <div className="product-summary">
          <div className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-quantity-badge">{product.quantity}</div>
            <div className="product-details">
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="price-details">
          <div className="price-row">
            <span>Subtotal</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Shipping</span>
            <span>Calculated at the next step</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
