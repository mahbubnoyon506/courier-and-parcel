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

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      try {
        const res = await api.put(`/users/${id}`, { newRole: value });
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to update role";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Role updation failed:", error.message);
    },
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.delete(`/users/${id}`);
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete user";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("User deletion failed:", error.message);
    },
  });
};
