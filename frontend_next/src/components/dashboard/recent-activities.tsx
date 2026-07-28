import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  "New patient registered",
  "Appointment completed",
  "Doctor updated profile",
  "Prescription created",
  "Payment received",
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-blue-500" />

              <p className="text-sm">
                {activity}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}