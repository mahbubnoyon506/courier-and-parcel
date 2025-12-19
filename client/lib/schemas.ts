import { z } from "zod";

export const bookingSchema = z.object({
  pickupAddress: z.string().min(5, "Pickup address is too short"),
  deliveryAddress: z.string().min(5, "Delivery address is too short"),
  parcelType: z.string().min(1, "Please select a parcel type"),
  weight: z.coerce.number().min(0.1, "Weight must be at least 0.1kg"),
  // weight: z.number().min(0.1, "Weight must be at least 0.1kg"),
  paymentMethod: z.enum(["COD", "Prepaid"]),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
