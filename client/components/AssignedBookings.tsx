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
import { MapPin, Eye, MousePointerClick } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  bookings: Booking[];
  onStatusChange: (id: string, status: ParcelStatus) => void;
};

export default function AssignedBookings({ bookings, onStatusChange }: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <TooltipProvider>
      <div className="relative">
        <div className="p-4 bg-muted/30 border-b flex items-center gap-2 text-xs text-muted-foreground">
          <MousePointerClick className="w-3.5 h-3.5" />
          Tip: Click any row to view full customer and parcel details.
        </div>

        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-62.5">Sender & Parcel</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Update Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="group cursor-pointer transition-colors hover:bg-primary/5"
                onClick={() => setSelectedBooking(booking)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {booking.senderId?.name?.charAt(0)}
                      </div>
                      {/* Interactive Hint Icon */}
                      <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-0.5 border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm">
                        {booking.senderId?.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-mono">
                        ID: {booking._id.slice(-6).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1 max-w-75">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                      <span className="text-muted-foreground truncate">
                        {booking.pickupAddress}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <MapPin className="w-3 h-3 text-destructive" />
                      <span className="truncate">
                        {booking.deliveryAddress}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>

                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()} // Crucial: Prevents modal from opening when clicking button
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
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </TooltipProvider>
  );
}
