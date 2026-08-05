"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { CreateDoctorDialog } from "../dialogs/create-doctor-dialog";
import { DOCTOR_STATUS_OPTIONS } from "../constants/doctor-filters";
import { FilterSelect } from "@/shared/components/common/filter-select";

export function DoctorToolbar() {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);
  
  const [status, setStatus] = useState("all");

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Search doctors..."
            className="sm:max-w-sm"
          />

          <FilterSelect
            value={status}
            options={DOCTOR_STATUS_OPTIONS}
            onValueChange={setStatus}
          />
        </div>

        <Button
          onClick={() =>
            setOpenCreateDialog(true)
          }
        >
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