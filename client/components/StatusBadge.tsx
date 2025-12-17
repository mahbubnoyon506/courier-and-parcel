import { Badge } from "@/components/ui/badge";

const statusColor = {
  Pending: "bg-yellow-500/10 text-yellow-500",
  Assigned: "bg-blue-500/10 text-blue-500",
  "In-Transit": "bg-purple-500/10 text-purple-500",
  Delivered: "bg-green-500/10 text-green-500",
  Failed: "bg-red-500/10 text-green-500",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={statusColor[status as keyof typeof statusColor]}>
      {status}
    </Badge>
  );
}
