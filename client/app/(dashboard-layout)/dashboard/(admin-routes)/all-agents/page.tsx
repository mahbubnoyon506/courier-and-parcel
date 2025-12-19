"use client";

import AgentCard from "@/components/AgentCard";
import { useAllAgents } from "@/lib/Agents";
import { Agent } from "@/types/types";
import { Truck, UserCheck, UserMinus } from "lucide-react";

export default function AgentsGrid() {
  const { data: agents, isLoading } = useAllAgents();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse font-medium">
          Syncing agent statuses...
        </p>
      </div>
    );
  }

  const activeCount = agents?.filter((a: Agent) => a.isAvailable).length || 0;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Truck className="w-8 h-8 text-primary" />
            Delivery Agents
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage your active delivery fleet.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-semibold">
            <UserCheck className="w-4 h-4" />
            {activeCount} Online
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-full text-sm font-semibold">
            <UserMinus className="w-4 h-4" />
            {(agents?.length || 0) - activeCount} Offline
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents?.map((agent: Agent) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
