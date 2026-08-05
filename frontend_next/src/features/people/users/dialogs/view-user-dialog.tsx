"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { UserForm } from "../forms/user-form";
import { User } from "../types";

interface ViewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
   user: User;
}

export function ViewUserDialog({
  open,
  onOpenChange,
  user,
}: ViewUserDialogProps) {
  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="User Details"
      description="View user information."
    >
      <UserForm
        mode="view"
        user={user}
      />

      <DialogFooter>
        <Button
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}