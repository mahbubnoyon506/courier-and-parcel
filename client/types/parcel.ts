import { date } from "./../node_modules/zod/src/v4/core/regexes";
export type ParcelStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Failed";

export interface Parcel {
  _id: string;
  trackingId: string;
  senderName: string;
  receiverName: string;
  deliveryAddress: string;
  pickupAddress: string;
  parcelType: string;
  weight: string;
  paymentMethod: [];
  isPaid: boolean;
  cost: number;
  currentLocation: string;
  status: ParcelStatus;
  assignedAgentId?: string;
  deliveryDate?: typeof date;
  createdAt: string;
}
