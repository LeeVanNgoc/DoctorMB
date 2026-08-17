"use client";

import { useState } from "react";

import { DoctorTable } from "@/features/admin/people/doctors/components/doctor-table";
import { DoctorToolbar } from "@/features/admin/people/doctors/components/doctor-toolbar";

import type { DoctorFilter } from "@/features/admin/people/doctors/types";

export default function Doctors() {
  const [filters, setFilters] = useState<DoctorFilter>({
    page: 1,
    limit: 10,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Doctors Management</h1>

        <p className="mt-2 text-muted-foreground">Manage doctors.</p>
      </div>

      <DoctorToolbar filters={filters} onFiltersChange={setFilters} />

      <DoctorTable filters={filters} onFiltersChange={setFilters} />
    </div>
  );
}
