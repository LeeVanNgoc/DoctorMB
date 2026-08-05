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
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="size-4" />
        </Button>
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