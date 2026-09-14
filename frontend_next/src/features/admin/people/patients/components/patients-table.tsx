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

import { PatientStatusBadge } from "./patient-status-badge";
import { PatientRowActions } from "./patient-row-actions";

import { usePatients } from "../hooks/use-patients";
import type { Patient } from "../types";

interface PatientsTableProps {
  page: number;
  limit: number;

  search: string;

  onPageChange: (page: number) => void;

  onPageSizeChange: (size: number) => void;
}

export function PatientsTable({
  page,
  limit,
  search,
  onPageChange,
  onPageSizeChange,
}: PatientsTableProps) {
  const { data, isLoading, isError } = usePatients({
    page,
    limit,
    search,
  });

  const patients = data?.patients ?? [];

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6">
        Loading patients...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border bg-background p-6">
        Failed to load patients.
      </div>
    );
  }
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  };

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Phone</TableHead>

            <TableHead>Gender</TableHead>

            <TableHead>Date of Birth</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  title="No patients found"
                  description="There are no patient profiles to display."
                />
              </TableCell>
            </TableRow>
          ) : (
            patients.map((patient: Patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.userId?.fullName}</TableCell>

                <TableCell>{patient.userId.email}</TableCell>

                <TableCell>{patient.userId.phone}</TableCell>

                <TableCell>{patient.gender}</TableCell>

                <TableCell>{formatDate(patient.dateOfBirth)}</TableCell>

                <TableCell>
                  <PatientStatusBadge
                    status={patient.isActive ? "active" : "inactive"}
                  />
                </TableCell>

                <TableCell className="text-right">
                  <PatientRowActions patient={patient} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DataPagination
        currentPage={data?.page ?? page}
        pageSize={data?.limit ?? limit}
        totalItems={data?.total ?? 0}
        resourceName="patients"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
