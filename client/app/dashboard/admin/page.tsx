import AuthGuard from "@/components/AuthGuard";

export default function AdminDashboard() {
  return (
    // <AuthGuard allowedRoles={["admin"]}>
    <h1 className="p-10 text-2xl">Admin Dashboard</h1>
    // </AuthGuard>
  );
}
