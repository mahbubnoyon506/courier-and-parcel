"use client";

import { useForm } from "react-hook-form";
import { Agent, Booking } from "@/types/types";
import { Modal } from "./ui/Modal";
import { useAllAgents } from "@/lib/agents";
import { SelectInput } from "./ui/FormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useAssignAgent } from "@/lib/bookings";

type ModalProps = {
  booking: Booking;
  onClose: () => void;
};

export default function AssignAgentModal({ booking, onClose }: ModalProps) {
  const { data: agents, isLoading } = useAllAgents();
  const { mutate, isPending } = useAssignAgent();

  const form = useForm({
    defaultValues: {
      agentId: booking.assignedAgentId?._id || "",
    },
  });

  const agentOptions =
    agents?.map((item: Agent) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const onSubmit = (values: { agentId: string }) => {
    console.log(values);

    mutate(
      { parcelId: booking._id, agentId: values.agentId },
      {
        onSuccess: () => {
          toast.success("Agent assigned successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to assign agent");
        },
      }
    );
  };

  if (!booking) return null;

  return (
    <Modal open={!!booking} onOpenChange={onClose} title="Assign to agent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <SelectInput
            control={form.control}
            name="agentId"
            label="Agent list"
            options={agentOptions}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isLoading}>
              {isPending ? "Assigning..." : "Confirm Assignment"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
