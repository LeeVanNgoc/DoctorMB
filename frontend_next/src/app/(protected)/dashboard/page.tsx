import { DashboardChart } from "@/components/dashboard/dashboard-chart";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { RecentAppointments } from "@/components/dashboard/recent-appointments";
import { StatsGrid } from "@/components/dashboard/stats-grid";

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