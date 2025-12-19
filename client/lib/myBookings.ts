import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { BookingFormValues } from "./schemas";
import { handleApiError } from "./helper";
import { toast } from "sonner";

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
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBookingData: BookingFormValues) => {
      const promise = api.post("/book-parcel", newBookingData);

      toast.promise(promise, {
        loading: "Creating your booking...",
        success: (res) => res.data.message || "Parcel booked successfully!",
        error: (err) => handleApiError(err, "Failed to create booking"),
      });

      const res = await promise;
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
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
      try {
        const res = await api.put(`/all-bookings/${id}`, data);
        return res.data;
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to update booking"));
      }
    },
    onMutate: () => {
      toast.loading("Updating booking details...", { id: "update-booking" });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Booking updated successfully", {
        id: "update-booking",
      });
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "update-booking" });
    },
  });
}

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
    onMutate: () => {
      toast.loading("Cancelling booking...", { id: "delete-booking" });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Booking cancelled successfully", {
        id: "delete-booking",
      });
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "delete-booking" });
    },
  });
};
