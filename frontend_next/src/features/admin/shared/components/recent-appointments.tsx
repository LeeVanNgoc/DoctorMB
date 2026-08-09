import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

const appointments = [
  {
    id: 1,
    patient: "John Smith",
    doctor: "Dr. Wilson",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Emma Johnson",
    doctor: "Dr. Brown",
    time: "10:30 AM",
    status: "Waiting",
  },
  {
    id: 3,
    patient: "Michael Lee",
    doctor: "Dr. Taylor",
    time: "01:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Sophia Davis",
    doctor: "Dr. White",
    time: "03:00 PM",
    status: "Confirmed",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";

    case "Waiting":
      return "bg-yellow-100 text-yellow-700";

    case "Completed":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function RecentAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-medium">
                  {appointment.patient}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {appointment.doctor}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {appointment.time}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}