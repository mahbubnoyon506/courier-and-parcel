"use client";
import {
  Home,
  BarChart,
  Settings,
  Users,
  HatGlasses,
  ListTodo,
} from "lucide-react";
import NavItem from "./NavItem";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

const adminItems = [
  {
    name: "Admin Dashboard",
    icon: <Home />,
    href: "admin",
  },
  {
    name: "Bookings",
    icon: <ListTodo />,
    href: "bookings",
  },
  {
    name: "Customers",
    icon: <Users />,
    href: "all-users",
  },
  {
    name: "Agents",
    icon: <HatGlasses />,
    href: "all-agents",
  },
];
const agentItems = [
  {
    name: "Agent Dashboard",
    icon: <Home />,
    href: "agent",
  },
];
const userItems = [
  {
    name: "User Dashboard",
    icon: <Home />,
    href: "user",
  },
  {
    name: "Analytics",
    icon: <BarChart />,
    href: "analytics",
  },
  {
    name: "user Dashboard",
    icon: <Settings />,
    href: "settings",
  },
];
const sidebarNav = (role = "customer") => {
  switch (role) {
    case "admin":
      return adminItems;
    case "agent":
      return agentItems;
    case "customer":
      return userItems;
    default:
      return [];
  }
};

export default function Sidebar() {
  const { user } = useAuth();
  const navItems = sidebarNav(user?.role);

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center h-16 p-4">
        <h1 className="text-xl font-bold capitalize">MyApp {user?.role}</h1>
      </div>
      <Separator />
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, i) => (
          <NavItem
            key={i}
            href={`/dashboard/${item.href}`}
            icon={item.icon}
            label={item.name}
          />
        ))}
      </nav>
    </div>
  );
}
