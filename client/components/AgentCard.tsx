// components/agent/AgentCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/types";
import { useState } from "react";
import { useDeleteAgent } from "@/lib/agents";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmDelete } from "./ConfirmDelete";

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: deleteBooking, isPending } = useDeleteAgent();
  const handleDelete = () => {
    deleteBooking(agent._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };
  return (
    <>
      <Card className="transition">
        <CardHeader className="space-y-1">
          <h3 className="font-semibold text-lg">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.email}</p>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="text-sm">📞 {agent.phone}</div>

          <Badge
            variant={agent.isAvailable ? "default" : "secondary"}
            className={
              agent.isAvailable
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }
          >
            {agent.isAvailable ? "Available" : "Unavailable"}
          </Badge>
          <Button variant="ghost" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="w-5 h-5 text-red-700" />
          </Button>
        </CardContent>
      </Card>
      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Delete Agent?"
        description={`Are you sure you want to delete the agent for ${agent?.name}? This cannot be undone.`}
      />
    </>
  );
}
