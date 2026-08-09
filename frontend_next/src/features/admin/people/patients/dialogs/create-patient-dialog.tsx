"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { PatientDialogLayout } from "../components/patient-dialog-layout";
import { PatientForm } from "../forms/patient-form";

interface CreatePatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePatientDialog({
  open,
  onOpenChange,
}: CreatePatientDialogProps) {
  return (
    <PatientDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Create Patient"
      description="Add a new patient to the system."
    >
      <PatientForm mode="create" />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button>Create</Button>
      </DialogFooter>
    </PatientDialogLayout>
  );
}