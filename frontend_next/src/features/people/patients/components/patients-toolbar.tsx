"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { FilterSelect } from "@/shared/components/common/filter-select";

import {
  PATIENT_GENDER_OPTIONS,
  PATIENT_STATUS_OPTIONS,
} from "../constants/patient-filters";

import { CreatePatientDialog } from "../dialogs/create-patient-dialog";

export function PatientToolbar() {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);

  const [gender, setGender] =
    useState("all");

  const [status, setStatus] =
    useState("all");

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Search patients..."
            className="sm:max-w-sm"
          />

          <FilterSelect
            value={gender}
            onValueChange={(value) =>
              setGender(value ?? "all")
            }
            options={
              PATIENT_GENDER_OPTIONS
            }
            className="w-full sm:w-44"
          />

          <FilterSelect
            value={status}
            onValueChange={(value) =>
              setStatus(value ?? "all")
            }
            options={
              PATIENT_STATUS_OPTIONS
            }
            className="w-full sm:w-44"
          />
        </div>

        <Button
          onClick={() =>
            setOpenCreateDialog(true)
          }
        >
          <Plus className="mr-2 size-4" />
          Add Patient
        </Button>
      </div>

      <CreatePatientDialog
        open={openCreateDialog}
        onOpenChange={
          setOpenCreateDialog
        }
      />
    </>
  );
}