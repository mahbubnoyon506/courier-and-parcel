import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { BookingFormValues } from "./schemas";
import { handleApiError } from "./helper";

const BOOKINGS_QUERY_KEY = ["bookings"];

export function useMyBookings() {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/all-bookings");
      return res.data;
    },
    retry: false,
  });
}
export function useTrackMyBookings(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [BOOKINGS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await api.get(`/${id}/track`);
      return res.data;
    },
    enabled: enabled, // Only fires when this is true
    staleTime: 1000 * 60 * 5,
  });
}
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBookingData: BookingFormValues) => {
      try {
        const res = await api.post("/book-parcel", newBookingData);
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to create booking"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Booking creation failed:", error.message);
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: BookingFormValues;
    }) => {
      console.log(data);

      try {
        const res = await api.put(`/all-bookings/${id}`, data);
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to create booking"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Booking updation failed:", error.message);
    },
  });
}

// --- DELETE  ---
export const useDeleteMyBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.delete(`/all-bookings/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to delete booking"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Booking deletion failed:", error.message);
    },
  });
};
