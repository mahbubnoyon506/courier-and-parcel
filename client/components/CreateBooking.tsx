"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCreateBooking } from "@/lib/myBookings";
import { Modal } from "./ui/Modal";
import { SelectInput, TextInput } from "./ui/FormFields";
import { useState } from "react";
import { BookingFormValues, bookingSchema } from "@/lib/schemas";
import { Package, MapPin, Scale, CreditCard, Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";

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
    // Ensure weight is treated as a number
    const formattedValues = {
      ...values,
      weight: Number(values.weight),
    };

    mutate(formattedValues, {
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

      <Modal open={open} onOpenChange={setOpen} title="New Shipment Booking">
        <div className="px-1 pb-4 text-sm text-muted-foreground">
          Fill in the details below to schedule your parcel pickup.
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-y-scroll max-h-96"
          >
            {/* Section: Route Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                Route Information
              </div>
              <div className="grid grid-cols-1 gap-4">
                <TextInput
                  control={form.control}
                  name="pickupAddress"
                  label="Pickup Address"
                  placeholder="Street, City, Zip Code"
                />
                <TextInput
                  control={form.control}
                  name="deliveryAddress"
                  label="Delivery Address"
                  placeholder="Receiver's Street, City, Zip Code"
                />
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Section: Parcel details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Package className="w-4 h-4" />
                Parcel Specifications
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
                  placeholder="e.g. 1.5"
                  type="number"
                />
              </div>
            </div>

            {/* Section: Payment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <CreditCard className="w-4 h-4" />
                Payment Method
              </div>
              <SelectInput
                control={form.control}
                name="paymentMethod"
                label="Select Method"
                options={[
                  { label: "Cash on Delivery (COD)", value: "COD" },
                  { label: "Online Prepaid", value: "Prepaid" },
                ]}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm & Book Shipment"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
}
