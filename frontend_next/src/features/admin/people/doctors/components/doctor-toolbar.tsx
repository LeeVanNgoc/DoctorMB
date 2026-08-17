"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FilterSelect } from "@/shared/components/common/filter-select";

import { CreateDoctorDialog } from "../dialogs/create-doctor-dialog";
import { DOCTOR_STATUS_OPTIONS } from "../constants/doctor-filters";

import type { DoctorFilter, DoctorStatus } from "../types";
import { useSpecialties } from "@/features/specialties/hooks/use-specialties";

interface DoctorToolbarProps {
  filters: DoctorFilter;
  onFiltersChange: (filters: DoctorFilter) => void;
}

export function DoctorToolbar({
  filters,
  onFiltersChange,
}: DoctorToolbarProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === "all" ? undefined : (value as DoctorStatus),
      page: 1,
    });
  };

  const { specialties, isLoading: isLoadingSpecialties } = useSpecialties();

  const specialtyOptions = [
    { label: "All specialties", value: "all" },
    ...specialties.map((specialty) => ({
      label: specialty.name,
      value: specialty.slug,
    })),
  ];

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <Input
            value={filters.search ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                search: event.target.value,
                page: 1,
              })
            }
            placeholder="Search doctors..."
            className="sm:max-w-sm"
          />

          <FilterSelect
            value={filters.specialty ?? "all"}
            options={specialtyOptions}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                specialty: value === "all" ? undefined : value,
                page: 1,
              })
            }
          />

          <FilterSelect
            value={filters.status ?? "all"}
            options={DOCTOR_STATUS_OPTIONS}
            onValueChange={handleStatusChange}
          />
        </div>

        <Button onClick={() => setOpenCreateDialog(true)}>
          <Plus className="mr-2 size-4" />
          Add Doctor
        </Button>
      </div>

      <CreateDoctorDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}
