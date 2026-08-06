"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { PatientDialogLayout } from "../components/patient-dialog-layout";
import { PatientForm } from "../forms/patient-form";
import { Patient } from "../types/patient";

interface EditPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
}

export function EditPatientDialog({
  open,
  onOpenChange,
  patient,
}: EditPatientDialogProps) {
  return (
    <PatientDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Patient"
      description={`Update information for ${patient.fullName}.`}
    >
      <PatientForm
        mode="edit"
        patient={patient}
      />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button>Save Changes</Button>
      </DialogFooter>
    </PatientDialogLayout>
  );
}