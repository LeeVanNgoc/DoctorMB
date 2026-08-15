import { DashboardChart } from "@/features/admin/shared/components/dashboard-chart";
import { DashboardHeader } from "@/features/admin/shared/components/dashboard-header";
import { RecentActivities } from "@/features/admin/shared/components/recent-activities";
import { RecentAppointments } from "@/features/admin/shared/components/recent-appointments";
import { StatsGrid } from "@/features/admin/shared/components/stats-grid";

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