"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/types";
import { useState } from "react";
import { useDeleteUser } from "@/lib/Users";
import { Button } from "./ui/button";
import { Trash2, Mail, MapPin, Shield } from "lucide-react";
import { ConfirmDelete } from "./ConfirmDelete";
import { UpdateRole } from "./UpdateRole";
import { useAuth } from "@/context/AuthContext";

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user: authedUser } = useAuth();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  // Logic: Prevent user from deleting themselves
  const isSelf = authedUser?._id === user._id;

  // Role Color Logic
  const roleColors: Record<string, string> = {
    admin: "bg-red-100 text-red-700 border-red-200",
    agent: "bg-blue-100 text-blue-700 border-blue-200",
    customer: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const handleDelete = () => {
    deleteUser(user._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-md transition-all group border-muted-foreground/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          {/* Avatar / Initials */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border-2 border-primary/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-base truncate leading-tight">
              {user.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Mail className="w-3 h-3" />
              <p className="text-xs truncate">{user.email}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          {/* Address Section */}
          <div className="space-y-1.5 min-h-10">
            {user.addressLine1 ? (
              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
                <p className="text-muted-foreground leading-tight">
                  {user.addressLine1}, {user.city}
                </p>
              </div>
            ) : (
              <p className="text-[10px] italic text-muted-foreground opacity-50">
                No address provided
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={`capitalize font-bold text-[10px] px-2 py-0 ${
                roleColors[user.role] || ""
              }`}
            >
              {user.role}
            </Badge>
            {user?.role === "admin" && (
              <Shield className="w-4 h-4 text-red-600 opacity-50" />
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t bg-muted/20 gap-2">
          <div className="flex-1">
            <UpdateRole user={user} />
          </div>

          <Button
            disabled={isSelf} // Changed from role comparison to ID comparison
            variant="ghost"
            size="icon"
            className={`h-9 w-9 hover:bg-destructive/10 hover:text-destructive ${
              isSelf ? "opacity-0 pointer-events-none" : ""
            }`}
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
        title="Delete User?"
        description={`Permanently remove ${user?.name}'s account. This user will lose all access immediately.`}
      />
    </>
  );
}
