import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Parcel Delivery System</h1>
        <p className="text-gray-400">
          Fast, secure & role-based parcel management
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-black rounded-md font-medium"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-gray-700 rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
