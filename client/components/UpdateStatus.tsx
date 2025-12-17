"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ParcelStatus } from "@/types/types";

const statuses: ParcelStatus[] = [
  "Pending",
  "Picked Up",
  "In Transit",
  "Delivered",
  "Failed",
];

type Props = {
  onChange: (status: ParcelStatus) => void;
};

export default function UpdateStatus({ onChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          Change Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {statuses.map((status) => (
          <DropdownMenuItem key={status} onClick={() => onChange(status)}>
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
