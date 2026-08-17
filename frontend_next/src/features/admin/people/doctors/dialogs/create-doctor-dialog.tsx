"use client";

import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { CreateDoctorForm } from "../forms/doctor-create-form";
import { createAdminDoctor } from "../services/admin-doctor-service";

import type { DoctorAccount } from "../types";

interface CreateDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDoctorDialog({
  open,
  onOpenChange,
}: CreateDoctorDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: DoctorAccount) => {
    try {
      setIsSubmitting(true);

      await createAdminDoctor(data);

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create doctor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Create Doctor"
      description="Create a simple doctor account. The doctor can complete their profile later."
    >
      <CreateDoctorForm onSubmit={handleSubmit} />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="create-doctor-account-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}
