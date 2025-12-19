import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Parcel Management System",
  description: "MERN Parcel Delivery Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
