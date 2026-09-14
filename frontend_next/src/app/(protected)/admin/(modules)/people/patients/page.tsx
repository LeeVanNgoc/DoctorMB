"use client";

import { useState } from "react";

import { PatientsTable } from "@/features/admin/people/patients/components/patients-table";
import { PatientToolbar } from "@/features/admin/people/patients/components/patients-toolbar";

export default function PatientsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>

        <p className="text-muted-foreground">
          Manage patient profiles in the system.
        </p>
      </div>

      <PatientToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <PatientsTable
        page={page}
        limit={limit}
        search={search}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setLimit(size);
          setPage(1);
        }}
      />
    </div>
  );
}
