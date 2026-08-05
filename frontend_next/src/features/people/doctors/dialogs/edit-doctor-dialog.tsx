"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { DoctorForm } from "../forms/doctor-form";
import { Doctor } from "../types";

interface EditDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
}

export function EditDoctorDialog({
  open,
  onOpenChange,
  doctor,
}: EditDoctorDialogProps) {
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Doctor"
      description="Update doctor information."
    >
      <DoctorForm
        mode="edit"
        doctor={doctor}
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
    </DoctorDialogLayout>
  );
}