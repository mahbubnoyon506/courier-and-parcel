import { api } from "./api";
import { Parcel } from "@/types/parcel";

export const createParcel = (data: Partial<Parcel>) =>
  api("/parcels", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getParcels = () => api("/parcels");

export const updateParcelStatus = (id: string, status: string) =>
  api(`/parcels/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const assignAgent = (id: string, agentId: string) =>
  api(`/parcels/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify({ agentId }),
  });
