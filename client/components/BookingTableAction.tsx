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
import { useDeleteBooking } from "@/lib/myBookings";

type Props = {
  booking: Booking;
  onAssign: (booking: Booking) => void;
  setOpen: (open: boolean) => void;
};

export default function BookingTableAction({
  booking,
  onAssign,
  setOpen,
}: Props) {
  const { mutate: deleteBooking } = useDeleteBooking();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            onAssign(booking);
            setOpen(true);
          }}
        >
          Assign Agent
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600"
          onClick={() => deleteBooking(booking._id)}
        >
          Delete Booking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
