"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDashboardData, useExportReport } from "@/lib/dashboardData";

import {
  Package,
  Users,
  CalendarDays,
  AlertCircle,
  Wallet,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  AlertCircleIcon,
  DownloadIcon,
  Download,
} from "lucide-react";

export default function DashboardPage() {
  const { data: metrics, isLoading } = useDashboardData();
  const { mutate: exportReport, isPending } = useExportReport();

  if (isLoading)
    return (
      <div className="p-8 text-center animate-pulse">Loading analytics...</div>
    );

  const stats = [
    {
      title: "Total Parcels",
      value: metrics.totalParcels,
      icon: Package,
      description: "Lifetime shipments",
      color: "text-blue-600",
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate}%`,
      icon: TrendingUp,
      description: "Delivery efficiency",
      color: "text-emerald-600",
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers,
      icon: Users,
      description: "Active senders",
      color: "text-violet-600",
    },
    {
      title: "Daily Bookings",
      value: metrics.dailyBookings,
      icon: CalendarDays,
      description: "Booked today",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Logistics Overview
          </h2>
          <p className="text-muted-foreground">
            Real-time delivery performance and metrics.
          </p>
        </div>
        <Button
          className="max-w-min"
          variant="outline"
          onClick={() => exportReport()}
          disabled={isPending}
        >
          <DownloadIcon className=" h-4 w-4" />
          {isPending ? "Generating..." : "Download CSV"}
        </Button>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Logistics Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Delivered"
          value={metrics.deliveredCount}
          icon={CheckCircle2}
          sub="Successfully dropped off"
          accent="bg-emerald-500"
        />
        <MetricCard
          title="Agents"
          value={metrics.totalAgents}
          icon={UserCheck}
          sub="Active on field"
          accent="bg-blue-500"
        />
        <MetricCard
          title="Pending COD"
          value={`$${metrics.totalPendingCOD}`}
          icon={Wallet}
          sub="Uncollected cash"
          accent="bg-orange-500"
        />
        <MetricCard
          title="Failed"
          value={metrics.failedDeliveries}
          icon={AlertCircleIcon}
          sub="Needs attention"
          accent="bg-red-500"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-75 flex items-center justify-center border-2 border-dashed rounded-xl m-4">
            <div className="text-center">
              <Package className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart: Visualizing {metrics.totalParcels} parcels
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Success Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Delivery Completion</span>
                <span className="text-sm font-bold">
                  {metrics.successRate}%
                </span>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{ width: `${metrics.successRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground italic">
                * Based on {metrics.deliveredCount} successful out of{" "}
                {metrics.totalParcels} total.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper component for small metric cards
function MetricCard({ title, value, icon: Icon, sub, accent }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-sm">
      <div className={`p-2 rounded-lg ${accent} bg-opacity-10`}>
        <Icon className={`h-5 w-5 text-white`} />
      </div>
      <div>
        <p className="text-sm font-medium leading-none mb-1">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {sub}
        </p>
      </div>
    </div>
  );
}
