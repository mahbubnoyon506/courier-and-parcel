import { ParcelStatus } from "@/types/types";
export const getStatusVariant = (status: ParcelStatus) => {
  switch (status) {
    case "Pending":
      return "secondary";
    case "Picked Up":
      return "secondary";
    case "In Transit":
      return "default";
    case "Delivered":
      return "success";
    case "Failed":
      return "destructive";
    default:
      return "default";
  }
};
