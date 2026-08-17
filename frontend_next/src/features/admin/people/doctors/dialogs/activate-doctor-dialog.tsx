"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { Doctor } from "../types";

interface ActivateDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
  action: "activate" | "deactivate";
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ActivateDoctorDialog({
  open,
  onOpenChange,
  doctor,
  action,
  onConfirm,
  isLoading,
}: ActivateDoctorDialogProps) {
  const actionLabel = action === "activate" ? "Activate" : "Deactivate";
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title={`${action} Doctor`}
      description={`This will ${action.toLowerCase()} the doctor's account.`}
    >
      <p className="py-4 text-sm text-muted-foreground">
        Are you sure you want to{" "}
        <span className="font-semibold text-foreground">
          {action.toLowerCase()}
        </span>{" "}
        <span className="font-semibold text-foreground">
          {doctor.userId.fullName}
        </span>
        ?
      </p>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>

        <Button
          variant={action === "deactivate" ? "destructive" : "default"}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : actionLabel}
        </Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}
