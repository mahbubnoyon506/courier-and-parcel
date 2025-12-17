"use client";
import BookingsTable from "@/components/BookingsTable";
import { Spinner } from "@/components/ui/spinner";
import { useAllBookings } from "@/lib/allBookings";
import React from "react";

const AllBookings = () => {
  const { data: bookings, isLoading, isError, error } = useAllBookings();
  console.log(bookings);

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
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default AllBookings;
