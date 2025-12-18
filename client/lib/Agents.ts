import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

const AGENTS_QUERY_KEY = ["all-agents"];

export function useAllAgents() {
  return useQuery({
    queryKey: AGENTS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/agents");
      return res.data;
    },
    retry: false,
  });
}

export const useDeleteAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api.delete(`/agents/${id}`);
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete Agent";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENTS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Agent deletion failed:", error.message);
    },
  });
};
