import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { EmptyState } from "@/shared/components/common/empty-state";

import { MOCK_DOCTORS } from "../constants/mock-doctor";
import { DoctorRowActions } from "./doctor-row-actions";
import { DoctorStatusBadge } from "./doctor-status-badge";
import { DataPagination } from "@/shared/components/common/data-pagination";

export function DoctorTable() {
  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Specialty</TableHead>

            <TableHead>Phone</TableHead>

            <TableHead>Experience</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-24 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_DOCTORS.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  title="No doctors found"
                  description="There are no doctors to display."
                />
              </TableCell>
            </TableRow>
          ) : (
            MOCK_DOCTORS.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  {doctor.fullName}
                </TableCell>

                <TableCell>
                  {doctor.email}
                </TableCell>

                <TableCell>
                  {doctor.specialty}
                </TableCell>

                <TableCell>
                  {doctor.phone}
                </TableCell>

                <TableCell>
                  {doctor.yearsOfExperience} years
                </TableCell>

                <TableCell>
                  <DoctorStatusBadge
                    status={doctor.status}
                  />
                </TableCell>

                <TableCell className="text-right">
                  <DoctorRowActions doctor={doctor} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DataPagination
        currentPage={1}
        pageSize={10}
        totalItems={MOCK_DOCTORS.length}
        resourceName="users"
      />
    </div>
  );
}