"use client";

import { Button } from "@/shared/components/ui/button";
import {
  DialogFooter,
  DialogDescription,
} from "@/shared/components/ui/dialog";

import { PatientDialogLayout } from "../components/patient-dialog-layout";
import { Patient } from "../types/patient";

interface DeletePatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
}

export function DeletePatientDialog({
  open,
  onOpenChange,
  patient,
}: DeletePatientDialogProps) {
  return (
    <PatientDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Patient"
      description="This action cannot be undone."
    >
      <DialogDescription>
        Are you sure you want to delete{" "}
        <strong>{patient.fullName}</strong>?
      </DialogDescription>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button variant="destructive">
          Delete
        </Button>
      </DialogFooter>
    </PatientDialogLayout>
  );
}