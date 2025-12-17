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

import { Booking } from "@/types/types";
import { StatusBadge } from "./StatusBadge";
import BookingTableAction from "./BookingTableAction";
import AssignAgentModal from "./AssignAgentModal";

type Props = {
  bookings: Booking[];
};

export default function BookingsTable({ bookings }: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Parcel</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>
                <div className="font-medium">{booking.senderId?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {booking.senderId?.email}
                </div>
              </TableCell>

              <TableCell>{booking.parcelType}</TableCell>
              <TableCell>{booking.weight} kg</TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>

              <TableCell>
                {booking.assignedAgentId ? (
                  booking.assignedAgentId.name
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </TableCell>

              <TableCell>{booking.paymentMethod}</TableCell>

              <TableCell className="text-right">
                <BookingTableAction
                  booking={booking}
                  onAssign={setSelectedBooking}
                  setOpen={setOpen}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBooking && (
        <AssignAgentModal
          booking={selectedBooking}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  );
}
