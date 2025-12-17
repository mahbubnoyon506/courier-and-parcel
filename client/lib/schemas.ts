import { z } from "zod";

export const bookingSchema = z.object({
  pickupAddress: z.string().min(5),
  deliveryAddress: z.string().min(5),
  parcelType: z.string(),
  weight: z.coerce.number().min(1),
  paymentMethod: z.enum(["COD", "Prepaid"]),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
