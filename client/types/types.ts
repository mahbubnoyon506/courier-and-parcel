export type ParcelStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Failed";

export type PaymentMethod = "COD" | "Prepaid";

export interface Booking {
  _id: string;
  assignedAgentId: string | null;
  senderId: string;

  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  weight: number;

  paymentMethod: PaymentMethod;
  status: ParcelStatus;
  isPaid: boolean;

  createdAt: string;
  updatedAt: string;
}
