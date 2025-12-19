import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { handleApiError } from "./helper";
import { toast } from "sonner";

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
      } catch (error) {
        throw new Error(handleApiError(error, "Failed to delete Agent"));
      }
    },
    onMutate: () => {
      toast.loading("Removing agent from system...", { id: "delete-agent" });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Agent removed successfully", {
        id: "delete-agent",
      });
      queryClient.invalidateQueries({ queryKey: AGENTS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message, { id: "delete-agent" });
      console.error("Agent deletion failed:", error.message);
    },
  });
};
