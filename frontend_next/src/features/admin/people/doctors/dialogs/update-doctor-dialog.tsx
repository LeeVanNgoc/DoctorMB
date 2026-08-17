"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
import { DoctorUpdateForm } from "../forms/doctor-update-form";
import { Doctor, UpdateDoctorData } from "../types";
import { updateAdminDoctor } from "../services/admin-doctor-service";

interface UpdateDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
}

export function UpdateDoctorDialog({
  open,
  onOpenChange,
  doctor,
}: UpdateDoctorDialogProps) {
  const handleUpdate = async (data: UpdateDoctorData) => {
    console.log("Update doctor data:", data);
    await updateAdminDoctor(doctor._id, data);

    onOpenChange(false);
  };
  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Update Doctor"
      description="Update doctor information."
    >
      <DoctorUpdateForm doctor={doctor} onSubmit={handleUpdate} />

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>

        <Button type="submit" form="doctor-update-form">
          Update
        </Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}
