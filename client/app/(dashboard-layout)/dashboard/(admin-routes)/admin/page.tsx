// app/(dashboard)/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

      {/* 4-Column Responsive Grid for Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* ... other Stat Cards (Users, Sales, Active Now) */}
      </div>

      {/* 2-Column Responsive Grid for Main Charts/Tables */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {/* Placeholder for your chart component (e.g., Recharts) */}
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Sales Data Visualization
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a shadcn/ui Table or List component */}
            <p className="text-sm text-muted-foreground">
              Top 5 recent transactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
