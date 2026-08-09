import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { RECENT_ACTIVITIES } from "../constants/recent-activities";

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {RECENT_ACTIVITIES.map((activity) => (
          <div
            key={activity.id}
            className="border-b pb-4 last:border-none"
          >
            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {activity.time}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}