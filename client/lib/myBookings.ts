import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { BookingFormValues } from "./schemas";

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

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      updatedData: BookingFormValues;
    }) => {
      console.log(data);

      try {
        const res = await api.put(`/all-bookings/${id}`, data);
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
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete booking";
        throw new Error(errorMessage);
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
