import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

const USERS_QUERY_KEY = ["all-users"];

export function useAllUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
    retry: false,
  });
}
