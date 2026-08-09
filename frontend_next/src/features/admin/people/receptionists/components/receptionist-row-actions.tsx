"use client";

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

import { Receptionist } from "../types/receptionist";

import { ViewReceptionistDialog } from "../dialogs/view-receptionist-dialog";
import { EditReceptionistDialog } from "../dialogs/edit-receptionist-dialog";
import { DeleteReceptionistDialog } from "../dialogs/delete-receptionist-dialog";

interface ReceptionistRowActionsProps {
  receptionist: Receptionist;
}

export function ReceptionistRowActions({
  receptionist,
}: ReceptionistRowActionsProps) {
  const [openView, setOpenView] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
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
              setOpenView(true)
            }
          >
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              setOpenEdit(true)
            }
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() =>
              setOpenDelete(true)
            }
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewReceptionistDialog
        open={openView}
        onOpenChange={setOpenView}
        receptionist={receptionist}
      />

      <EditReceptionistDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        receptionist={receptionist}
      />

      <DeleteReceptionistDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        receptionist={receptionist}
      />
    </>
  );
}