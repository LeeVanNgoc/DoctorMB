import { DoctorTable } from "@/features/admin/people/doctors/components/doctor-table";
import { DoctorToolbar } from "@/features/admin/people/doctors/components/doctor-toolbar";

export default function Doctors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Doctors Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage doctors.
          </p>
      </div>

      <DoctorToolbar />
      <DoctorTable />
    </div>
  );
}