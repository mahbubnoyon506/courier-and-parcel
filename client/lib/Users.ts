import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { handleApiError } from "./helper";

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
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to update role"));
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
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to delete user"));
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
