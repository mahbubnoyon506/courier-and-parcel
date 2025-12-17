// components/booking/BookingActions.tsx
"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "@/types/types";
import { useDeleteBooking } from "@/lib/bookings";
import { ConfirmDelete } from "./ConfirmDelete";
import { useState } from "react";

type Props = {
  booking: Booking;
  onAssign: (booking: Booking) => void;
};

export default function BookingTableAction({ booking, onAssign }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: deleteBooking, isPending } = useDeleteBooking();
  const handleDelete = () => {
    deleteBooking(booking._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAssign(booking)}>
            Assign Agent
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-600"
            onSelect={() => setShowDeleteConfirm(true)}
          >
            Delete Booking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Delete Booking?"
        description={`Are you sure you want to delete the booking for ${booking.senderId?.name}? This cannot be undone.`}
      />
    </>
  );
}
