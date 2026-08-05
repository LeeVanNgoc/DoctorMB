"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { DoctorForm } from "../forms/doctor-form";
import { Doctor } from "../types";

interface ViewDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
}

export function ViewDoctorDialog({
  open,
  onOpenChange,
  doctor,
}: ViewDoctorDialogProps) {
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Doctor Details"
      description="View doctor information."
    >
      <DoctorForm
        mode="view"
        doctor={doctor}
      />

      <DialogFooter>
        <Button
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}