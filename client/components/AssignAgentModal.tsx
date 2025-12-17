// components/booking/AssignAgentModal.tsx
"use client";

import { Booking } from "@/types/types";
import { Modal } from "./ui/Modal";
import { useState } from "react";
type ModalProps = {
  booking: Booking;
  open: boolean;
  onClose: () => void;
};

export default function AssignAgentModal({
  booking,
  onClose,
  open,
}: ModalProps) {
  //   const [open, setOpen] = useState(false)
  return (
    <Modal open={open} onOpenChange={onClose} title="Assign to agent">
      Assign agent to {booking.parcelType}
    </Modal>
  );
}
