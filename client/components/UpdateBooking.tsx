"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Booking } from "@/types/types";
import { BookingFormValues, bookingSchema } from "@/lib/schemas";
import { Modal } from "./ui/Modal";
import { SelectInput, TextInput } from "./ui/FormFields";
import { Form } from "./ui/form";
import { useState } from "react";
import { useUpdateBooking } from "@/lib/myBookings";

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
    updateBooking(
      { id: booking._id, data: values },
      { onSuccess: setOpen(false) }
    );
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Modal open={open} onOpenChange={setOpen} title="Create Booking">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              control={form.control}
              name="pickupAddress"
              label="Pickup Address"
              placeholder="Enter pickup location"
            />

            <TextInput
              control={form.control}
              name="deliveryAddress"
              label="Delivery Address"
              placeholder="Enter delivery location"
            />

            <SelectInput
              control={form.control}
              name="parcelType"
              label="Parcel Type"
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
              placeholder="Enter weight"
            />

            <SelectInput
              control={form.control}
              name="paymentMethod"
              label="Payment Method"
              options={[
                { label: "Cash on Delivery", value: "COD" },
                { label: "Prepaid", value: "Prepaid" },
              ]}
            />

            <Button type="submit" size="lg" className="w-full">
              {isPending ? "Updating..." : "Update Parcel"}
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
}
