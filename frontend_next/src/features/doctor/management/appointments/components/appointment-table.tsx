import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { AppointmentStatusBadge } from "./appointment-status-badge";
import { AppointmentRowActions } from "./appointment-row-actions";
import { AppointmentStatus, DoctorAppointment } from "../types/appointment";

interface AppointmentTableProps {
  appointments: DoctorAppointment[];
  
  onView: (
    appointment: DoctorAppointment
  ) => void;

  onUpdateStatus: (
    appointment: DoctorAppointment,
    status: AppointmentStatus
  ) => void;
}

export function AppointmentTable({
  appointments,
  onView,
  onUpdateStatus,
}: AppointmentTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
                <TableHead>
                  Patient
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead>
                  Time
                </TableHead>

                <TableHead>
                  Reason
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="text-right">
                  Action
                </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                {appointment.patientName}
              </TableCell>

              <TableCell>
                {appointment.date}
              </TableCell>

              <TableCell>
                {appointment.time}
              </TableCell>

              <TableCell>
                {appointment.reason}
              </TableCell>

              <TableCell>
                <AppointmentStatusBadge
                  status={appointment.status}
                />
              </TableCell>

              <TableCell className="text-right">
                <AppointmentRowActions
                  appointment={appointment}
                  onView={onView}
                  onUpdateStatus={onUpdateStatus}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}