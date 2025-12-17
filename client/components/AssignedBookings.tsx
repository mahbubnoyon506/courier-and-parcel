// components/booking/BookingsTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

import { Booking, ParcelStatus } from "@/types/types";
import { StatusBadge } from "./StatusBadge";
import UpdateStatus from "./UpdateStatus";
import BookingDetailsModal from "./BookingDetailsModal";

type Props = {
  bookings: Booking[];
  onStatusChange: (id: string, status: ParcelStatus) => void;
};

export default function AssignedBookings({ bookings, onStatusChange }: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking._id}
              className="cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              <TableCell>
                <div className="font-medium">{booking.senderId?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {booking.senderId?.email}
                </div>
              </TableCell>

              <TableCell>{booking.pickupAddress}</TableCell>
              <TableCell>{booking.deliveryAddress}</TableCell>

              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>

              <TableCell
                className="text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <UpdateStatus
                  onChange={(status: ParcelStatus) =>
                    onStatusChange(booking._id, status)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
}
