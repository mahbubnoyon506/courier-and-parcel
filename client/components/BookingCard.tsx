"use client";

import { useState } from "react";
import { useDeleteMyBooking, useTrackMyBookings } from "@/lib/myBookings";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Edit,
  Package,
  Trash2,
  MapPin,
  Calendar,
  Weight,
  CreditCard,
  ChevronRight,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { Booking } from "@/types/types";
import UpdateBooking from "./UpdateBooking";
import { StatusBadge } from "./StatusBadge";
import { ConfirmDelete } from "./ConfirmDelete";
import TrackingModal from "./TrackMyParcel";
import { Separator } from "./ui/separator";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [openTracing, setOpenTracing] = useState(false);

  const { mutate: deleteBooking, isPending } = useDeleteMyBooking();
  const {
    data: trackingData,
    isLoading,
    isError,
  } = useTrackMyBookings(booking._id, openTracing);

  const isModifiable = booking.status === "Pending";

  const handleDelete = () => {
    deleteBooking(booking._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };

  return (
    <>
      <Card className="group overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold leading-none capitalize">
                {booking.parcelType}
              </CardTitle>
              <p className="text-[10px] text-muted-foreground font-mono mt-1">
                ID: {booking._id.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative space-y-4">
            <div className="absolute left-1.75 top-2.5 bottom-2.5 w-0.5 bg-muted-foreground/20" />

            <div className="flex gap-4 relative">
              <div className="w-4 h-4 rounded-full border-2 border-primary bg-background mt-1" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Pickup
                </p>
                <p className="text-sm font-medium line-clamp-1">
                  {booking.pickupAddress}
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <MapPin className="w-4 h-4 text-destructive mt-1" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Delivery
                </p>
                <p className="text-sm font-medium line-clamp-1">
                  {booking.deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-muted/50" />

          {/* Details Grid */}
          <div className="flex flex-wrap gap-y-3 gap-x-5 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Weight className="w-3.5 h-3.5" />
              <span className="font-medium text-foreground">
                {booking.weight} kg
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="w-3.5 h-3.5" />
              <span className="font-medium text-foreground">
                {booking.paymentMethod}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium text-foreground">
                Booked:{" "}
                {new Date(booking.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 flex items-center justify-between gap-2 p-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 gap-1.5"
              onClick={() => setOpenTracing(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isError ? (
                <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              Track
            </Button>
          </div>

          <div className="flex gap-2">
            {isModifiable ? (
              <>
                <UpdateBooking
                  booking={booking}
                  trigger={
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 hover:bg-background"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </>
            ) : (
              <p className="text-[10px] font-medium text-muted-foreground italic">
                Locked
              </p>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Modals remain the same */}
      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Delete Booking?"
        description={`This will permanently remove the parcel booking for ${booking.parcelType}.`}
      />

      <TrackingModal
        data={trackingData}
        open={openTracing}
        onClose={() => setOpenTracing(false)}
      />
    </>
  );
}
