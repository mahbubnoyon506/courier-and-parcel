"use client";
import { Home, Users, HatGlasses, ListTodo } from "lucide-react";
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
    name: "Users",
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
    <div className=" md:flex flex-col w-20 md:w-64 bg-white border-r dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center h-16 p-3">
        <h1 className="text-sm md:text-xl font-semibold md:font-bold capitalize">
          MyApp {user?.role}
        </h1>
      </div>
      <Separator />
      <nav className={`flex-1 p-3 space-y-2`}>
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
