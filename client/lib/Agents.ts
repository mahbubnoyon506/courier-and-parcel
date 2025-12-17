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
