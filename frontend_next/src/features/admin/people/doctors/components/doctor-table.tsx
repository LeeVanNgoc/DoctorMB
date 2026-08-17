"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { EmptyState } from "@/shared/components/common/empty-state";
import { DataPagination } from "@/shared/components/common/data-pagination";

import { useAdminDoctors } from "../hooks/use-admin-doctors";

import { DoctorRowActions } from "./doctor-row-actions";
import { DoctorStatusBadge } from "./doctor-status-badge";
import { DoctorFilter } from "../types";

interface DoctorTableProps {
  filters: DoctorFilter;
  onFiltersChange: (filters: DoctorFilter) => void;
}

export function DoctorTable({ filters, onFiltersChange }: DoctorTableProps) {
  const {
  doctors,
  pagination,
  isLoading,
  error,
  refetch,
} = useAdminDoctors(filters);

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6">
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg border bg-background p-6">{error}</div>;
  }

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

            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  title="No doctors found"
                  description="There are no doctors to display."
                />
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.userId.fullName}</TableCell>

                <TableCell>{doctor.userId.email}</TableCell>

                <TableCell>
                  {doctor.specialty?.name ?? "Not assigned"}
                </TableCell>

                <TableCell>{doctor.userId.phone}</TableCell>

                <TableCell>{doctor.experience} years</TableCell>

                <TableCell>
                  <DoctorStatusBadge status={doctor.userId.status} />
                </TableCell>

                <TableCell className="text-right">
                  <DoctorRowActions
  doctor={doctor}
  onDoctorStatusChanged={refetch}
/>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DataPagination
        currentPage={pagination.page}
        pageSize={pagination.limit}
        totalItems={pagination.total}
        resourceName="doctors"
        onPageChange={(page) =>
          onFiltersChange({
            ...filters,
            page,
          })
        }
        onPageSizeChange={(size) =>
          onFiltersChange({
            ...filters,
            page: 1,
            limit: size,
          })
        }
      />
    </div>
  );
}
