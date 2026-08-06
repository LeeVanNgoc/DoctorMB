"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { AppointmentStatusBadge } from "../components/appointment-status-badge";
import { DoctorAppointment } from "../types/appointment";


interface ViewAppointmentDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  appointment: DoctorAppointment | null;
}


export function ViewAppointmentDialog({
  open,
  onOpenChange,
  appointment,
}: ViewAppointmentDialogProps) {

  if (!appointment) {
    return null;
  }


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Appointment Details
          </DialogTitle>
        </DialogHeader>


        <div className="space-y-5">

          <div>
            <p className="text-sm text-muted-foreground">
              Patient
            </p>

            <p className="font-medium">
              {appointment.patientName}
            </p>
          </div>


          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-muted-foreground">
                Date
              </p>

              <p className="font-medium">
                {appointment.date}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Time
              </p>

              <p className="font-medium">
                {appointment.time}
              </p>
            </div>

          </div>


          <div>
            <p className="text-sm text-muted-foreground">
              Reason
            </p>

            <p className="font-medium">
              {appointment.reason}
            </p>
          </div>


          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Status
            </p>

            <AppointmentStatusBadge
              status={appointment.status}
            />
          </div>


        </div>

      </DialogContent>

    </Dialog>
  );
}