"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useCreateBooking } from "@/lib/myBookings";
import { Modal } from "./ui/Modal";
import { SelectInput, TextInput } from "./ui/FormFields";
import { useState } from "react";
import { BookingFormValues, bookingSchema } from "@/lib/schemas";

interface Props {
  trigger: React.ReactNode;
}

export function CreateBooking({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      parcelType: "Small Box",
      paymentMethod: "COD",
      weight: 0.1,
    },
  });

  const { mutate, isPending } = useCreateBooking();

  const onSubmit = (values: BookingFormValues) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <>
      <div className="inline-block" onClick={() => setOpen(true)}>
        {trigger}
      </div>
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
              {isPending ? "Creating..." : "Create Parcel"}
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
}
