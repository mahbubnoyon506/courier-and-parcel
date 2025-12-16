"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "agent" | "customer">;
};

export default function AuthGuard({ children, allowedRoles }: Props) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.role) {
      if (user.role) {
        router.replace("/login");
        return;
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, []);

  return <>{children}</>;
}
