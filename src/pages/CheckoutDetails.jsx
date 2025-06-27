import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import "../components/form/forms.css";
import { Link, useNavigate } from "react-router";
import regions from "../data/regions.json";
import Breadcrumbs from "../components/form/Breadcrumbs";
import { useCheckout } from "../contexts/CheckoutContext";
import FormActions from "../components/form/FormActions";

const shippingSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  shippingNote: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  province: z.string().min(1, { message: "Please select a province" }),
  country: z.string().min(1, { message: "Please select a country" }),
  saveInfo: z.boolean().optional(),
});

export default function CheckoutDetails() {
  const navigate = useNavigate();
  const { details, setDetails } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
    defaultValues: {
      email: details.email || "",
      firstName: details.firstName || "",
      lastName: details.lastName || "",
      address: details.address || "",
      shippingNote: details.shippingNote || "",
      city: details.city || "",
      postalCode: details.postalCode || "",
      province: details.province || "",
      country: details.country || "",
      saveInfo: details.saveInfo || false,
    },
  });

  function onSubmit(data) {
    setDetails((prevDetails) => ({
      ...prevDetails,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      shippingNote: data.shippingNote,
      city: data.city,
      postalCode: data.postalCode,
      province: data.province,
      country: data.country,
      saveInfo: data.saveInfo,
    }));

    navigate("/checkout/shipping");
  }

  return (
    <section className="form-section">
      <Breadcrumbs />
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
          <FormSelect
            id="province"
            label="Province"
            register={register}
            error={errors.province}
          >
            <option value="">Province</option>
            {regions.georgia.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}

            {regions.us.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </FormSelect>
        </div>
        <div className="form-row">
          <FormSelect
            id="country"
            label="Country/Region"
            register={register}
            error={errors.country}
          >
            <option value="">Country</option>
            <option value="GEO">Georgia</option>
            <option value="US">United States</option>
          </FormSelect>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="saveInfo" {...register("saveInfo")} />
          <label htmlFor="saveInfo">
            Save this information for a future fast checkout
          </label>
        </div>

        <FormActions
          backLabel={"Back to cart"}
          submitLabel={"Go to shipping"}
          backUrl={"/cart"}
        />
      </form>
    </section>
  );
}
