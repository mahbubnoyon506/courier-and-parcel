import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { handleApiError } from "./helper";

const DASHBOARD_QUERY_KEY = ["dashboard-data"];

export function useDashboardData() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get("/metrics");
      return res.data;
    },
    retry: false,
  });
}

export const useExportReport = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.get("/reports/bookings", {
        responseType: "blob",
      });
      return res.data;
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        `bookings_report_${new Date().toLocaleDateString()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      throw new Error(handleApiError(error, "Failed to delete booking"));
    },
  });
};
