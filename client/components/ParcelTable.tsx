"use client";

import { Parcel } from "@/types/parcel";

type Props = {
  parcels: Parcel[];
  role: "admin" | "agent" | "user";
};

export default function ParcelTable({ parcels, role }: Props) {
  return (
    <table className="w-full border border-gray-800">
      <thead>
        <tr className="bg-gray-900 text-left">
          <th className="p-3">Tracking</th>
          <th>Status</th>
          <th>Receiver</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {parcels.map((p) => (
          <tr key={p._id} className="border-t border-gray-800">
            <td className="p-3">{p.trackingId}</td>
            <td>{p.status}</td>
            <td>{p.receiverName}</td>
            <td className="space-x-2">
              {role === "agent" && (
                <button className="text-blue-400">Update Status</button>
              )}
              {role === "admin" && (
                <button className="text-green-400">Assign Agent</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
