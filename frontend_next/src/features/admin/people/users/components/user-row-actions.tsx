"use client";
import { useState } from "react";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { EditUserDialog } from "../dialogs/edit-user-dialog";
import { DeleteUserDialog } from "../dialogs/delete-user-dialog";
import { ViewUserDialog } from "../dialogs/view-user-dialog";
import { User } from "../types";

interface UserRowActionsProps {
  user: User;
}

export function UserRowActions({
  user,
}: UserRowActionsProps) {
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
          onClick={() => setOpenViewDialog(true)}
        >
          <Eye className="mr-2 size-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setOpenEditDialog(true)}
        >
          <Pencil className="mr-2 size-4" />
          Update
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
      <ViewUserDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        user={user}
      />
      <EditUserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        user={user}
      />

      <DeleteUserDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        user={user}
      />
    </>
  );
}