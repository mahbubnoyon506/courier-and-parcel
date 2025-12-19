// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/types";
import { BookingFormValues, bookingSchema } from "@/lib/schemas";
import { Modal } from "./ui/Modal";
import { SelectInput, TextInput } from "./ui/FormFields";
import { useState } from "react";
import { useUpdateBooking } from "@/lib/myBookings";
import {
  Edit3,
  MapPin,
  Package,
  CreditCard,
  Loader2,
  Info,
} from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  booking: Booking;
  trigger: React.ReactNode;
};

export default function UpdateBooking({ booking, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: updateBooking, isPending } = useUpdateBooking();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupAddress: booking.pickupAddress,
      deliveryAddress: booking.deliveryAddress,
      parcelType: booking.parcelType,
      weight: booking.weight,
      paymentMethod: booking.paymentMethod,
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    const formattedData = { ...values, weight: Number(values.weight) };

    updateBooking(
      { id: booking._id, data: formattedData },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {trigger}
      </div>

      <Modal open={open} onOpenChange={setOpen} title="Edit Shipment Details">
        {/* Info Banner for Reference */}
        <div className="mb-6 flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <Info className="w-4 h-4 text-primary" />
          <div className="text-xs">
            <p className="font-semibold text-primary">Editing Parcel ID:</p>
            <p className="font-mono text-muted-foreground uppercase">
              {booking._id}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-y-scroll max-h-96"
          >
            {/* Route Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Change Route
              </div>
              <div className="grid gap-4">
                <TextInput
                  control={form.control}
                  name="pickupAddress"
                  label="Pickup Address"
                />
                <TextInput
                  control={form.control}
                  name="deliveryAddress"
                  label="Delivery Address"
                />
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Parcel Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Package className="w-4 h-4 text-primary" />
                Update Specifications
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectInput
                  control={form.control}
                  name="parcelType"
                  label="Type"
                  options={[
                    { label: "Small Box", value: "Small Box" },
                    { label: "Medium Box", value: "Medium Box" },
                    { label: "Large Box", value: "Large Box" },
                  ]}
                />
                <TextInput
                  control={form.control}
                  name="weight"
                  label="Weight (kg)"
                  type="number"
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CreditCard className="w-4 h-4 text-primary" />
                Billing Preference
              </div>
              <SelectInput
                control={form.control}
                name="paymentMethod"
                label="Payment Method"
                options={[
                  { label: "Cash on Delivery", value: "COD" },
                  { label: "Prepaid", value: "Prepaid" },
                ]}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-2 font-bold shadow-lg shadow-primary/20"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Update Details
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
}
