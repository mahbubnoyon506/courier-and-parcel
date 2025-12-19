"use client";

import EmptyState from "@/components/EmptyState";
import UserCard from "@/components/UserCard";
import { useAllUsers } from "@/lib/Users";
import { User } from "@/types/types";
import { Users, ShieldCheck } from "lucide-react";

export default function AllUsers() {
  const { data: users, isLoading } = useAllUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage roles and account access for all platform members.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">
            {users?.length} Total Users
          </span>
        </div>
      </div>

      {users.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user: User) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <EmptyState context="user" />
      )}
    </div>
  );
}
