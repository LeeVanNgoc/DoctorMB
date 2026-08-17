"use client";

import { useState } from "react";

import { Eye, MoreHorizontal, Pencil, Power } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { Doctor } from "../types";
import { ViewDoctorDialog } from "../dialogs/view-doctor-dialog";
import { ActivateDoctorDialog } from "../dialogs/activate-doctor-dialog";
import { UpdateDoctorDialog } from "../dialogs/update-doctor-dialog";
import {
  activateDoctor,
  deactivateDoctor,
} from "../services/admin-doctor-service";

interface DoctorRowActionsProps {
  doctor: Doctor;
  onDoctorStatusChanged: () => Promise<void>;
}

export function DoctorRowActions({
  doctor,
  onDoctorStatusChanged,
}: DoctorRowActionsProps) {
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const [openActivateDialog, setOpenActivateDialog] = useState(false);

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async () => {
    try {
      setIsUpdatingStatus(true);

      if (doctor.userId.status === "active") {
        await deactivateDoctor(doctor._id);
      } else {
        await activateDoctor(doctor._id);
      }

      await onDoctorStatusChanged();

      setOpenActivateDialog(false);
    } catch (error) {
      console.error("Failed to update doctor status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            transition-colors
            hover:bg-accent
            hover:text-accent-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
          "
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenViewDialog(true)}>
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenUpdateDialog(true)}>
            <Pencil className="mr-2 size-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className={
              doctor.userId.status === "active"
                ? "text-destructive focus:text-destructive"
                : ""
            }
            onClick={() => setOpenActivateDialog(true)}
          >
            <Power className="mr-2 size-4" />

            {doctor.userId.status === "active" ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewDoctorDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        doctor={doctor}
      />

      <UpdateDoctorDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        doctor={doctor}
      />

      <ActivateDoctorDialog
        open={openActivateDialog}
        onOpenChange={setOpenActivateDialog}
        doctor={doctor}
        action={doctor.userId.status === "active" ? "deactivate" : "activate"}
        onConfirm={handleStatusChange}
        isLoading={isUpdatingStatus}
      />
    </>
  );
}
