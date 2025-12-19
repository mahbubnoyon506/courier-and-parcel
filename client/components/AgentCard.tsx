"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/types";
import { useState } from "react";
import { useDeleteAgent } from "@/lib/Agents";
import { Button } from "./ui/button";
import { Trash2, Phone, Mail, MapPin, MoreHorizontal } from "lucide-react";
import { ConfirmDelete } from "./ConfirmDelete";
import { Separator } from "./ui/separator";

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: deleteAgent, isPending } = useDeleteAgent();

  const handleDelete = () => {
    deleteAgent(agent._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };

  return (
    <>
      <Card className="group flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted-foreground/15">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            {/* Status Avatar */}
            <div
              className={`relative p-1 rounded-full border-2 ${
                agent.isAvailable ? "border-green-500" : "border-slate-300"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg overflow-hidden">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              {/* Status Dot */}
              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                  agent.isAvailable ? "bg-green-500" : "bg-slate-400"
                }`}
              />
            </div>

            <Badge
              variant="outline"
              className={`text-[10px] uppercase font-bold tracking-tight px-2 py-0.5 ${
                agent.isAvailable
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              {agent.isAvailable ? "On Duty" : "Off Duty"}
            </Badge>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-none">
              {agent.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
              <Mail className="w-3.5 h-3.5" />
              <p className="text-xs truncate font-medium">{agent.email}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <Separator className="opacity-50" />
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Phone className="w-3.5 h-3.5 text-primary" />
              </div>
              {agent.phone || "No phone listed"}
            </div>
            {/* Added a placeholder for branch/area if your data supports it */}
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="p-1.5 bg-muted rounded-md">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs">Primary Service Area</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-4 gap-2 bg-muted/20">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs h-9"
            asChild
          >
            <a href={`tel:${agent.phone}`}>Call Agent</a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>

      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Remove Agent?"
        description={`This will remove ${agent?.name} from the active fleet. They will no longer be able to accept new deliveries.`}
      />
    </>
  );
}
