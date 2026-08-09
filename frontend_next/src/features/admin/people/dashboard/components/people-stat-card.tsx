import { Card, CardContent } from "@/shared/components/ui/card";

import { PeopleStatistic } from "../constants/people-dashboard";

interface PeopleStatCardProps {
  statistic: PeopleStatistic;
}

export function PeopleStatCard({
  statistic,
}: PeopleStatCardProps) {
  const Icon = statistic.icon;

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {statistic.title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {statistic.value}
          </p>
        </div>

        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );
}