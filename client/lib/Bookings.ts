import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { ParcelStatus } from "@/types/types";

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
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to update status";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARCEL_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Status update failed:", error.message);
    },
  });
};

export const useAssignAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      parcelId,
      agentId,
    }: {
      parcelId: string;
      agentId: ParcelStatus;
    }) => {
      try {
        const res = await api.put(`/parcels/${parcelId}/assign`, { agentId });
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to assign parcel";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Assign parcel failed:", error.message);
    },
  });
};
