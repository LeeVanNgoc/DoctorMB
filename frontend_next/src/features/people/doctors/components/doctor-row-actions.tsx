"use client";

import { useState } from "react";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { Doctor } from "../types";
import { ViewDoctorDialog } from "../dialogs/view-doctor-dialog";
import { DeleteDoctorDialog } from "../dialogs/delete-doctor-dialog";
import { EditDoctorDialog } from "../dialogs/edit-doctor-dialog";

interface DoctorRowActionsProps {
  doctor: Doctor;
}

export function DoctorRowActions({
  doctor,
}: DoctorRowActionsProps) {
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
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            hover:bg-accent
          "
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpenViewDialog(true)}
          >
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpenEditDialog(true)}
          >
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewDoctorDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        doctor={doctor}
      />

      <EditDoctorDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        doctor={doctor}
      />

      <DeleteDoctorDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        doctor={doctor}
      />
    </>
  );
}