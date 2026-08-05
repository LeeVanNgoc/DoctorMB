"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { UserForm } from "../forms/user-form";
import { User } from "../types";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function EditUserDialog({
  open,
  onOpenChange,
  user,
}: EditUserDialogProps) {
  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit User"
      description="Update the selected user's information."
    >
      <UserForm
        mode="edit"
        user={user}
      />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button>
          Save Changes
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}