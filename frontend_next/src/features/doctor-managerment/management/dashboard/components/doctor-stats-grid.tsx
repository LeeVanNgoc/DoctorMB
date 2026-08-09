import { DoctorStatCard } from "./doctor-stat-card";

import { DOCTOR_DASHBOARD_STATS } from "../constants/doctor-dashboard-stats";

export function DoctorStatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {DOCTOR_DASHBOARD_STATS.map((stat) => (
        <DoctorStatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
}