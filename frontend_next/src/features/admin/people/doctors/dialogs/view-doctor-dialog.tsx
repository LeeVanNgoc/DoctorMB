"use client";

import { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { DoctorDialogLayout } from "../components/doctor-dialog-layout";
  import { getAdminDoctorById } from "../services/admin-doctor-service";

import type { Doctor } from "../types";
import { DoctorView } from "../forms/doctor-view-form";

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
  const [doctorDetail, setDoctorDetail] = useState<Doctor>(doctor);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchDoctor = async () => {
      try {
        setIsLoading(true);

        const data = await getAdminDoctorById(doctor._id);

        setDoctorDetail(data);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [open, doctor._id]);

  return (
    <DoctorDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Doctor Details"
      description="View doctor information."
    >
      <DoctorView doctor={doctorDetail} />

      <DialogFooter>
        <Button onClick={() => onOpenChange(false)} disabled={isLoading}>
          Close
        </Button>
      </DialogFooter>
    </DoctorDialogLayout>
  );
}
