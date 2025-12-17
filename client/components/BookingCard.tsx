import { useDeleteBooking } from "@/lib/myBookings";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Edit, Locate, Package, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getStatusVariant } from "@/lib/helper";
import { Badge } from "./ui/badge";
import { Booking } from "@/types/types";
import UpdateBooking from "./UpdateBooking";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();

  const isModifiable = booking.status === "Pending";

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete the booking for ${booking.parcelType}?`
      )
    ) {
      deleteBooking(booking._id);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            {booking.parcelType}
          </CardTitle>
          <Badge
            variant={getStatusVariant(booking.status)}
            className="text-sm font-semibold"
          >
            {booking.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-4">
          <div className="flex items-start gap-3">
            <Locate className="w-4 h-4 mt-1 text-muted-foreground" />
            <div>
              <CardDescription>Pickup Address</CardDescription>
              <p className="font-medium text-sm">{booking.pickupAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Locate className="w-4 h-4 mt-1 text-muted-foreground" />
            <div>
              <CardDescription>Delivery Address</CardDescription>
              <p className="font-medium text-sm">{booking.deliveryAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            <div>
              <span className="font-semibold">Weight:</span> {booking.weight} kg
            </div>
            <div>
              <span className="font-semibold">Payment:</span>{" "}
              {booking.paymentMethod}
            </div>
            <div>
              <span className="font-semibold">Booked On:</span>{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          {isModifiable && (
            <UpdateBooking
              booking={booking}
              trigger={
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Parcel
                </Button>
              }
            />
          )}

          {isModifiable && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                "Deleting..."
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          )}

          {!isModifiable && (
            <span className="text-sm text-yellow-600 dark:text-yellow-400">
              Cannot modify in {booking.status} status.
            </span>
          )}
        </CardFooter>
      </Card>

      {/* Placeholder for the Update Modal */}
      {/* <UpdateBookingModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        booking={booking}
      /> 
      */}
    </>
  );
}
