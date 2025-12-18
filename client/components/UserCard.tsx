import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/types";
import { useState } from "react";
import { useDeleteUser } from "@/lib/users";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmDelete } from "./ConfirmDelete";
import { UpdateRole } from "./UpdateRole";
import { useAuth } from "@/context/AuthContext";

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user: authedUser } = useAuth();
  const { mutate: deleteBooking, isPending } = useDeleteUser();
  const handleDelete = () => {
    deleteBooking(user._id, {
      onSuccess: () => setShowDeleteConfirm(false),
    });
  };

  return (
    <>
      <Card className="transition">
        <CardHeader className="space-y-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {user.addressLine1 && <p> {user.addressLine1}</p>}
          {(user.city || user.country) && (
            <p className="text-muted-foreground">
              {user.city}, {user.country}
            </p>
          )}

          <Badge variant="secondary">{user.role}</Badge>

          <UpdateRole user={user} />
          <Button
            disabled={authedUser?.role === user?.role}
            variant="ghost"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-5 h-5 text-red-700" />
          </Button>
        </CardContent>
      </Card>
      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Delete User?"
        description={`Are you sure you want to delete the user for ${user?.name}? This cannot be undone.`}
      />
    </>
  );
}
