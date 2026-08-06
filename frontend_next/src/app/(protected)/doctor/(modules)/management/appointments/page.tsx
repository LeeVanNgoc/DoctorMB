"use client";
import { AppointmentsContent } from "@/features/doctor/management/appointments/components/appointments-content";
export default function AppointmentsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          Appointments
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your upcoming and previous appointments.
        </p>
      </div>


      <AppointmentsContent />

    </div>
  );
}