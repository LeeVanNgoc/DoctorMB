import { PatientTable } from "@/features/people/patients/components/patients-table";
import { PatientToolbar } from "@/features/people/patients/components/patients-toolbar";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Patients
        </h1>

        <p className="text-muted-foreground">
          Manage patients in the system.
        </p>
      </div>

      <PatientToolbar />

      <PatientTable />
    </div>
  );
}
