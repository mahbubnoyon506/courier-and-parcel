"use client";

import { Modal } from "./ui/Modal"; // Adjust path accordingly
import {
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Phone,
  User,
  Clock,
} from "lucide-react";
import { format } from "date-fns"; // Optional: npm install date-fns

interface TrackingModalProps {
  data: any; // Ideally use your Tracking interface
  open: boolean;
  onClose: () => void;
}

export default function TrackingModal({
  data,
  open,
  onClose,
}: TrackingModalProps) {
  if (!data) return null;

  // Define the order of statuses for the stepper
  const steps = ["Pending", "Picked Up", "In Transit", "Delivered"];
  const currentStepIndex = steps.indexOf(data.status);

  return (
    <Modal open={open} onOpenChange={onClose} title="Live Tracking">
      <div className="space-y-6">
        {/* 1. Header: Tracking ID & Last Update */}
        <div className="flex justify-between items-start bg-muted/50 p-3 rounded-lg border">
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              Tracking ID
            </p>
            <p className="text-sm font-mono font-medium">{data.trackingId}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> Last Update
            </p>
            <p className="text-xs">
              {format(new Date(data.lastUpdate), "MMM dd, hh:mm a")}
            </p>
          </div>
        </div>

        {/* 2. Visual Stepper */}
        <div className="relative flex justify-between w-full px-2 py-4">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />

          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : "bg-background border-muted text-muted-foreground"
                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                >
                  {index === 0 && <Package className="w-4 h-4" />}
                  {index === 1 && <Truck className="w-4 h-4" />}
                  {index === 2 && <Truck className="w-4 h-4" />}
                  {index === 3 && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    isCompleted ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* 3. Address Section */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
              <div className="w-0.5 h-10 bg-muted-foreground/20 my-1" />
              <MapPin className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Pickup From
                </p>
                <p className="text-sm">{data.pickupAddress}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Delivery To
                </p>
                <p className="text-sm">{data.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Agent Info Card */}
        {data.agent && (
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Assigned Agent
                </p>
                <p className="text-sm font-bold">{data.agent.name}</p>
              </div>
            </div>
            <a
              href={`tel:${data.agent.phone}`}
              className="flex items-center gap-2 bg-white border px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call Agent
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
