import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { DataPagination } from "@/shared/components/common/data-pagination";

import { MOCK_PATIENTS } from "../constants/mock-patients";
import { PatientRowActions } from "./patient-row-actions";
import { PatientStatusBadge } from "./patient-status-badge";

export function PatientTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_PATIENTS.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.patientCode}</TableCell>

              <TableCell>{patient.fullName}</TableCell>

              <TableCell>{patient.email}</TableCell>

              <TableCell>{patient.phone}</TableCell>

              <TableCell className="capitalize">
                {patient.gender}
              </TableCell>

              <TableCell>
                <PatientStatusBadge
                  status={patient.status}
                />
              </TableCell>

              <TableCell className="text-right">
                <PatientRowActions patient={patient} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DataPagination
        resourceName="patients"
        currentPage={1}
        pageSize={1}
        totalItems={MOCK_PATIENTS.length}
      />
    </>
  );
}