'use client';
import { useState } from "react";

import {
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { Patient } from "../types/patient";
import { DeletePatientDialog } from "../dialogs/delete-patient-dialog";
import { EditPatientDialog } from "../dialogs/edit-patient-dialog";
import { ViewPatientDialog } from "../dialogs/view-patient-dialog";

interface PatientRowActionsProps {
  patient: Patient;
}

export function PatientRowActions({
  patient,
}: PatientRowActionsProps) {
  const [openViewDialog, setOpenViewDialog] =
    useState(false);

  const [openEditDialog, setOpenEditDialog] =
    useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

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
          <DropdownMenuItem
            onClick={() =>
              setOpenViewDialog(true)
            }
          >
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              setOpenEditDialog(true)
            }
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() =>
              setOpenDeleteDialog(true)
            }
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewPatientDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        patient={patient}
      />

      <EditPatientDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        patient={patient}
      />

      <DeletePatientDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        patient={patient}
      />
    </>
  );
}