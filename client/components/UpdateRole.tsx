import {
  ShieldCheck,
  User as UserIcon,
  Truck,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUpdateRole } from "@/lib/Users";
import { User } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

export function UpdateRole({ user }: { user: User }) {
  const { mutate, isPending } = useUpdateRole();
  const { user: authedUser } = useAuth();

  const roles = [
    {
      label: "Admin",
      value: "admin",
      icon: ShieldCheck,
      color: "text-red-600",
    },
    { label: "Agent", value: "agent", icon: Truck, color: "text-blue-600" },
    {
      label: "Customer",
      value: "customer",
      icon: UserIcon,
      color: "text-gray-600",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="capitalize"
          disabled={isPending || authedUser?.role === user?.role}
        >
          {user.role} <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {roles.map((role) => (
          <DropdownMenuItem
            key={role.value}
            disabled={user.role === role.value}
            onClick={() => mutate({ id: user._id, value: role.value })}
            className="flex items-center gap-2 cursor-pointer"
          >
            <role.icon className={`h-4 w-4 ${role.color}`} />
            <span>{role.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
