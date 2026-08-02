import { DashboardChart } from "@/features/dashboard/components/dashboard-chart";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";
import { RecentAppointments } from "@/features/dashboard/components/recent-appointments";
import { StatsGrid } from "@/features/dashboard/components/stats-grid";

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <DashboardHeader />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>

        <RecentActivities />
      </div>

      <RecentAppointments />
    </main>
  );
}