// components/agent/AgentCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/types";

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  return (
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
      </CardContent>
    </Card>
  );
}
