import {
  MOCK_RECEPTIONISTS,
} from "@/features/people/receptionists/constants/mock-receptionist";

import {
  ReceptionistToolbar,
} from "@/features/people/receptionists/components/receptionist-toolbar";

import {
  ReceptionistTable,
} from "@/features/people/receptionists/components/receptionist-table";

export default function ReceptionistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Receptionists
        </h1>

        <p className="text-muted-foreground">
          Manage receptionist accounts and information.
        </p>
      </div>

      <ReceptionistToolbar />

      <ReceptionistTable
        data={MOCK_RECEPTIONISTS}
      />
    </div>
  );
}