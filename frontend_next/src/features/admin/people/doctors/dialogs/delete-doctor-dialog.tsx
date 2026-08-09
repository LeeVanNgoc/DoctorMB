"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { Doctor } from "../types";

interface DeleteDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
}

export function DeleteDoctorDialog({
  open,
  onOpenChange,
  doctor,
}: DeleteDoctorDialogProps) {
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Doctor"
      description="This action cannot be undone."
    >
      <p className="py-4 text-sm text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-foreground">
          {doctor.fullName}
        </span>
        ?
      </p>

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
    </DoctorDialogLayout>
  );
}