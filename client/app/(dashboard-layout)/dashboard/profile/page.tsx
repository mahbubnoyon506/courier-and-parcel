"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Camera,
  Edit2,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { logoutAction } from "@/app/actions/auth";
import { Spinner } from "@/components/ui/spinner";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Spinner className="w-8 h-8 text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Loading your delivery queue...
        </p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-muted-foreground animate-pulse">
          Something is wrong to find information.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and account preferences.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Edit2 className="w-4 h-4" /> Edit Profile
          </Button>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => {
              logoutAction();
              localStorage.removeItem("token");
            }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-t-4 border-t-primary">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center">
                {/* Dummy Profile Picture with Edit Overlay */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-background shadow-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-4xl font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
                <Badge className="mt-2 px-4 py-1 capitalize bg-primary/10 text-primary border-primary/20">
                  <ShieldCheck className="w-3 h-3 mr-1.5" />
                  {user?.role}
                </Badge>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Integrity Stats (Optional UI element) */}
          <Card className="bg-muted/30">
            <CardContent className="p-4 flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground uppercase tracking-wider">
                Account Status
              </span>
              <span className="text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                Verified
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  label="Full Name"
                  value={user?.name}
                  icon={<User className="w-4 h-4" />}
                />
                <InfoItem
                  label="Email Address"
                  value={user?.email}
                  icon={<Mail className="w-4 h-4" />}
                />
                <InfoItem
                  label="Contact Number"
                  value={user?.phone}
                  icon={<Phone className="w-4 h-4" />}
                />
                <InfoItem
                  label="System UID"
                  value={user?._id}
                  icon={<Calendar className="w-4 h-4" />}
                  isMono
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Security Level</h4>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-orange-900">
                      Admin Privileges Enabled
                    </p>
                    <p className="text-xs text-orange-700 mt-1">
                      Your account has full access to the management dashboard,
                      user control, and fleet logistics. Keep your credentials
                      secure.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:bg-muted/20 transition-colors cursor-pointer border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 bg-background rounded-full border shadow-sm text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold">Two-Factor Auth</p>
                <p className="text-xs text-muted-foreground">
                  Setup 2FA for extra security
                </p>
              </CardContent>
            </Card>
            <Card className="hover:bg-muted/20 transition-colors cursor-pointer border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 bg-background rounded-full border shadow-sm text-muted-foreground">
                  <Edit2 className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold">Update Password</p>
                <p className="text-xs text-muted-foreground">
                  Change your current password
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component
function InfoItem({
  label,
  value,
  icon,
  isMono,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  isMono?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p
        className={`text-sm font-bold ${
          isMono ? "font-mono uppercase text-[12px]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// Mock icon for the placeholder
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
