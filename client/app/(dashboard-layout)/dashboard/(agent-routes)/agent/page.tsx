"use client";
import AssignedBookings from "@/components/AssignedBookings";
import { Spinner } from "@/components/ui/spinner";
import { useAssignedParcels, useUpdateStatus } from "@/lib/Bookings";
import { Booking } from "@/types/types";
import { Truck, Clock } from "lucide-react";

export default function AgentDashboard() {
  const { data: bookings, isLoading, isError, error } = useAssignedParcels();
  const { mutate: updateStatus } = useUpdateStatus();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Spinner className="w-8 h-8 text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Loading your delivery queue...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 border border-destructive/20 bg-destructive/5 rounded-xl text-center">
        <p className="text-destructive font-semibold">Error loading bookings</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // Calculate stats for the header
  const total = bookings?.length || 0;
  const pending =
    bookings?.filter((b: Booking) => b.status === "Picked Up").length || 0;

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Dashboard Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Delivery Tasks</h1>
          <p className="text-muted-foreground">
            Manage your assigned parcels and update their delivery status.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-primary/5 border px-4 py-2 rounded-lg flex items-center gap-3">
            <Truck className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                Assigned
              </p>
              <p className="text-xl font-bold leading-none">{total}</p>
            </div>
          </div>
          <div className="bg-orange-500/5 border px-4 py-2 rounded-lg flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                In Hand
              </p>
              <p className="text-xl font-bold leading-none">{pending}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <AssignedBookings
          bookings={bookings}
          onStatusChange={(id, status) => updateStatus({ id, status })}
        />
      </div>
    </div>
  );
}
