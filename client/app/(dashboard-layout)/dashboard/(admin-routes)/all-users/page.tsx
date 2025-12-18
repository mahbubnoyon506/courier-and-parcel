"use client";

import UserCard from "@/components/UserCard";
import { useAllUsers } from "@/lib/users";
import { User } from "@/types/types";

export default function AllUsers() {
  const { data: users, isLoading } = useAllUsers();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users?.map((user: User) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
