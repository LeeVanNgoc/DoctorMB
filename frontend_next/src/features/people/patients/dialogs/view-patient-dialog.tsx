"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { PatientDialogLayout } from "../components/patient-dialog-layout";
import { PatientForm } from "../forms/patient-form";
import { Patient } from "../types/patient";

interface ViewPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
}

export function ViewPatientDialog({
  open,
  onOpenChange,
  patient,
}: ViewPatientDialogProps) {
  return (
    <PatientDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Patient Details"
      description="View patient information."
    >
      <PatientForm
        mode="view"
        patient={patient}
      />

      <DialogFooter>
        <Button
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogFooter>
    </PatientDialogLayout>
  );
}