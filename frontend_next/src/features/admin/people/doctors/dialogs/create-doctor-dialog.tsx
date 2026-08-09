"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { DoctorForm } from "../forms/doctor-form";

interface CreateDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDoctorDialog({
  open,
  onOpenChange,
}: CreateDoctorDialogProps) {
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Create Doctor"
      description="Add a new doctor to the system."
    >
      <DoctorForm mode="create" />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button>Create</Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}