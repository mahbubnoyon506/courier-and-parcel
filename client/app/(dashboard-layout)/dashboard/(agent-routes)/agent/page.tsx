"use client";
import AssignedBookings from "@/components/AssignedBookings";
import { Spinner } from "@/components/ui/spinner";
import { useAssignedParcels, useUpdateStatus } from "@/lib/bookings";

export default function AgentDashboard() {
  const { data: bookings, isLoading, isError, error } = useAssignedParcels();
  const { mutate: updateStatus } = useUpdateStatus();
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
      <AssignedBookings
        bookings={bookings}
        onStatusChange={(id, status) => updateStatus({ id, status })}
      />
    </div>
  );
}
