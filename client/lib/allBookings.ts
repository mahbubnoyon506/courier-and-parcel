import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

const BOOKINGS_QUERY_KEY = ["customer's-bookings"];

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
