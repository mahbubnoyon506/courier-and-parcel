"use client";
import BookingsTable from "@/components/BookingsTable";
import EmptyState from "@/components/EmptyState";
import { Spinner } from "@/components/ui/spinner";
import { useAllBookings } from "@/lib/Bookings";
import { Booking } from "@/types/types";
import { LayoutDashboard, Package, Clock, CheckCircle2 } from "lucide-react";
import React from "react";

const AllBookings = () => {
  const { data: bookings, isLoading, isError, error } = useAllBookings();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Spinner className="w-8 h-8 text-primary" />
        <p className="text-muted-foreground animate-pulse font-medium">
          Loading system data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 p-8 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 text-center">
        <h3 className="text-destructive font-bold text-lg">System Error</h3>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // Admin Stats logic
  const stats = [
    {
      label: "Total Bookings",
      value: bookings?.length || 0,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value:
        bookings?.filter((b: Booking) => b.status === "Pending").length || 0,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Delivered",
      value:
        bookings?.filter((b: Booking) => b.status === "Delivered").length || 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            All Bookings
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all parcel shipments across the platform.
          </p>
        </div>
      </div>

      {/* Admin Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex items-center p-4 bg-card border rounded-xl shadow-sm gap-4"
          >
            <div className={`p-3 rounded-lg ${item.bg}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        {bookings.length ? (
          <BookingsTable bookings={bookings} />
        ) : (
          <EmptyState context="bookings" />
        )}
      </div>
    </div>
  );
};

export default AllBookings;
