"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { UserForm } from "../forms/user-form";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create User"
      description="Create a new user account in the system."
    >
      <UserForm mode="create" />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button>
          Create User
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}