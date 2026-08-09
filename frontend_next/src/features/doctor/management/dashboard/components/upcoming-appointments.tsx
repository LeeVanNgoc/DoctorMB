import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { UPCOMING_APPOINTMENTS } from "../constants/upcoming-appointments";

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Upcoming Appointments
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {UPCOMING_APPOINTMENTS.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">
                {appointment.patientName}
              </p>

              <p className="text-sm text-muted-foreground">
                {appointment.type}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">
                {appointment.time}
              </p>

              <p className="text-xs text-muted-foreground">
                {appointment.status}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}