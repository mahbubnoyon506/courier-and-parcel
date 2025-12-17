export type ParcelStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Failed";

export type PaymentMethod = "COD" | "Prepaid";

export interface Booking {
  _id: string;
  assignedAgentId?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  senderId?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  } | null;
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
export interface Agent {
  _id: string;
  name: string;
  email: string;
  role: "agent";
  phone: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  auth0Id: string;
  role: "customer";
  name: string;
  email: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}
