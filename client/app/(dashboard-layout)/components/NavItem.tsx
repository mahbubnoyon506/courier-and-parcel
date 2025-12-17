// components/dashboard/NavItem.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactElement<LucideIcon>;
}

export default function NavItem({ href, label, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary",
        {
          "bg-gray-100 dark:bg-gray-800 text-primary font-semibold": isActive,
          "text-muted-foreground": !isActive,
        }
      )}
    >
      {Icon}
      {label}
    </Link>
  );
}
