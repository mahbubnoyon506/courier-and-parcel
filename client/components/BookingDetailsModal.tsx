// components/booking/BookingDetailsModal.tsx
"use client";

import { Booking } from "@/types/types";
import { Modal } from "./ui/Modal";
import {
  CreditCard,
  Info,
  MapPin,
  Package,
  Phone,
  User,
  Weight,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
  booking: Booking | null;
  onClose: () => void;
};

export default function BookingDetailsModal({ booking, onClose }: Props) {
  if (!booking) return null;

  return (
    <Modal open={!!booking} onOpenChange={onClose} title="Booking Details">
      <div className="space-y-6 pt-4">
        {/* Section 1: Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
              <User className="w-3 h-3" /> Sender
            </p>
            <p className="font-semibold text-sm">{booking.senderId?.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
              <Phone className="w-3 h-3" /> Phone
            </p>
            <p className="font-semibold text-sm">{booking.senderId?.phone}</p>
          </div>
        </div>

        <Separator />
        <div className="space-y-4">
          <div className="relative pb-2">
            <div className="absolute left-1.75 top-6 bottom-0 w-0.5 bg-muted-foreground/20" />

            <div className="flex gap-3 items-start">
              <div className="mt-1 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
              <div>
                <p className="text-xs text-muted-foreground">Pickup Address</p>
                <p className="text-sm leading-tight">{booking.pickupAddress}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <MapPin className="w-4 h-4 text-destructive z-10" />
            <div>
              <p className="text-xs text-muted-foreground">Delivery Address</p>
              <p className="text-sm leading-tight">{booking.deliveryAddress}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section 3: Parcel Specs */}
        <div className="bg-muted/50 p-3 rounded-lg grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm capitalize">{booking.parcelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{booking.weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm uppercase">{booking.paymentMethod}</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            <Badge
              variant={booking.isPaid ? "default" : "destructive"}
              className="text-[10px] px-1 h-5"
            >
              {booking.isPaid ? "PAID" : "UNPAID"}
            </Badge>
          </div>
        </div>

        {/* Section 4: Status Footer */}
        <div className="flex items-center justify-between bg-primary/5 p-3 rounded-md border border-primary/10">
          <span className="text-sm font-medium">Current Status</span>
          <Badge className="uppercase tracking-wider">{booking.status}</Badge>
        </div>
      </div>
    </Modal>
  );
}
