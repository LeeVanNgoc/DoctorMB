import { DoctorStatsGrid }
  from "@/features/doctor/management/dashboard/components/doctor-stats-grid";
import { UpcomingAppointments } from "@/features/doctor/management/dashboard/components/upcoming-appointments";
import { RecentActivities } from "@/features/doctor/management/dashboard/components/recent-activities";
import { PatientGrowthChart } from "@/features/doctor/management/dashboard/components/patient-growth-chart";
import { MonthlyAppointmentsChart } from "@/features/doctor/management/dashboard/components/monthly-appointments-chart";

export default function ManagementDashboardPage() {
  return (
    <div className="space-y-6">
      <DoctorStatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingAppointments />
        <RecentActivities />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PatientGrowthChart />

        <MonthlyAppointmentsChart />
      </div>
    </div>
  );
}