import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { ParcelStatus } from "@/types/types";
import { handleApiError } from "./helper";
import { toast } from "sonner";

const BOOKINGS_QUERY_KEY = ["customer's-bookings"];
const PARCEL_QUERY_KEY = ["agent's-bookings"];

export function useAllBookings() {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/bookings");
      return res.data;
    },
    retry: false,
  });
}

// --- DELETE BOOKING ---
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.delete(`/bookings/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to delete booking"));
      }
    },
    onMutate: () => {
      toast.loading("Deleting booking...", { id: "delete-booking" });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Booking deleted successfully", {
        id: "delete-booking",
      });
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "delete-booking" });
    },
  });
};

export function useAssignedParcels() {
  return useQuery({
    queryKey: PARCEL_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/parcels/assigned");
      return res.data;
    },
    retry: false,
  });
}

// --- UPDATE STATUS ---
export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: ParcelStatus;
    }) => {
      try {
        const res = await api.put(`/parcels/${id}/status`, { status });
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to update status"));
      }
    },
    onMutate: () => {
      toast.loading("Updating parcel status...", { id: "update-status" });
    },
    onSuccess: (data) => {
      toast.success(
        data.message || `Status updated to ${data.status || "new state"}`,
        { id: "update-status" }
      );
      queryClient.invalidateQueries({ queryKey: PARCEL_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "update-status" });
    },
  });
};

// --- ASSIGN AGENT ---
export const useAssignAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      parcelId,
      agentId,
    }: {
      parcelId: string;
      agentId: string;
    }) => {
      try {
        const res = await api.put(`/parcels/${parcelId}/assign`, { agentId });
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to assign parcel"));
      }
    },
    onMutate: () => {
      toast.loading("Assigning agent to parcel...", { id: "assign-agent" });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Agent assigned successfully", {
        id: "assign-agent",
      });
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "assign-agent" });
    },
  });
};
