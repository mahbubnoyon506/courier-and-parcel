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
import { User, Weight, CreditCard, ShieldAlert, Package } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  bookings: Booking[];
};

export default function BookingsTable({ bookings }: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (bookings.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <Package className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
        <p className="text-muted-foreground font-medium">
          No bookings found in the system.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Sender Info</TableHead>
              <TableHead className="font-bold">Parcel Details</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Assigned Agent</TableHead>
              <TableHead className="font-bold">Payment</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-foreground">
                      {booking.senderId?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-45">
                      {booking.senderId?.email}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-primary" />
                      {booking.parcelType}
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Weight className="w-3 h-3" />
                      {booking.weight} kg
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>

                <TableCell>
                  {booking.assignedAgentId ? (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <span className="text-sm font-medium">
                        {booking.assignedAgentId.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-md border border-orange-100">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        Unassigned
                      </span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className="font-medium gap-1 text-[11px] px-2 py-0"
                  >
                    <CreditCard className="w-3 h-3" />
                    {booking.paymentMethod}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <BookingTableAction
                    booking={booking}
                    onAssign={setSelectedBooking}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedBooking && (
        <AssignAgentModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
}
