// components/booking/AssignAgentModal.tsx
"use client";

import { Booking } from "@/types/types";
import { Modal } from "./ui/Modal";
type ModalProps = {
  booking: Booking;
  onClose: () => void;
};

export default function AssignAgentModal({ booking, onClose }: ModalProps) {
  if (!booking) return null;
  return (
    <Modal open={!!booking} onOpenChange={onClose} title="Assign to agent">
      Assign agent to {booking.parcelType}
    </Modal>
  );
}
