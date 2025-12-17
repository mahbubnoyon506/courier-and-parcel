// hooks/useBookings.ts (Simplified)

import { deleteBooking, updateBooking } from "@/app/api/userBookings";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { BookingFormValues } from "./schemas";

const BOOKINGS_QUERY_KEY = ["bookings"];

export function useMyBookings() {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/history");
      return res.data;
    },
    retry: false,
  });
}
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBookingData: BookingFormValues) => {
      try {
        const res = await api.post("/book-parcel", newBookingData);
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to create booking";
        throw new Error(errorMessage);
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

// --- DELETE Hook ---
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Deletion failed:", error.message);
    },
  });
};

// --- UPDATE Hook ---
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BookingFormValues }) =>
      updateBooking(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
    },
  });
};
