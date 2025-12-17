// components/customer/CustomersGrid.tsx
"use client";

import UserCard from "@/components/UserCard";
import { useAllUsers } from "@/lib/users";
import { User } from "@/types/types";

export default function AllUsers() {
  const { data: customers, isLoading } = useAllUsers();

  if (isLoading) return <p>Loading customers...</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers?.map((customer: User) => (
        <UserCard key={customer._id} customer={customer} />
      ))}
    </div>
  );
}
