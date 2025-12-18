"use client";

import BookingCard from "@/components/BookingCard";
import { CreateBooking } from "@/components/CreateBooking";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMyBookings } from "@/lib/myBookings";
import { Booking } from "@/types/types";
import { PlusCircle } from "lucide-react";

export default function UserDashboard() {
  const { data: bookings, isLoading, isError, error } = useMyBookings();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
        <p className="ml-2">Loading your bookings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Error loading bookings: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Parcel Bookings</h2>
      <CreateBooking
        trigger={
          <Button>
            <PlusCircle className="w-4 h-4" />
            Book New Parcel
          </Button>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bookings?.map((booking: Booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
