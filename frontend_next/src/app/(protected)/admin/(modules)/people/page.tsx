import { PeopleStatCard } from "@/features/people/components/people-stat-card";
import { RecentActivity } from "@/features/people/components/recent-activity";
import { PEOPLE_STATISTICS } from "@/features/people/constants/people-dashboard";

export default function PeopleDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          People Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage users, doctors, patients and receptionists.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PEOPLE_STATISTICS.map((item) => (
          <PeopleStatCard
            key={item.title}
            statistic={item}
          />
        ))}
      </div>

      <RecentActivity />
    </div>
  );
}