import { z } from "zod";

export const detailsSchema = z.object({
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
