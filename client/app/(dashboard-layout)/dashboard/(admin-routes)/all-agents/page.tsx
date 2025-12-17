// components/agent/AgentsGrid.tsx
"use client";

import AgentCard from "@/components/AgentCard";
import { useAllAgents } from "@/lib/Agents";

import { Agent } from "@/types/types";

export default function AgentsGrid() {
  const { data: agents, isLoading } = useAllAgents();

  if (isLoading) return <p>Loading agents...</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents?.map((agent: Agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
}
