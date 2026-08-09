"use client";

import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { User } from "../types";
import { useDeleteUser } from "../hooks/use-users";

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  user,
}: DeleteUserDialogProps) {
  const {
    mutateAsync: deleteUser,
    isPending,
  } = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      toast.success("User deleted successfully.");

      onOpenChange(false);
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };
  
  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete User"
      description="This action cannot be undone."
    >
      <div className="flex items-start gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <AlertTriangle className="mt-0.5 size-5 text-destructive" />

        <div className="space-y-1">
          <p className="font-medium">
            Are you sure you want to delete this user?
          </p>

          <p className="text-sm text-muted-foreground">
            The user account and all related information will be permanently
            removed from the system.
          </p>
        </div>
      </div>

      <div className="rounded-md border p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">
            Full Name
          </p>

          <p className="font-medium">
            {user.fullName}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Email
          </p>

          <p className="font-medium">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Role
          </p>

          <p className="font-medium uppercase">
            {user.role}
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete User"}
        </Button>

      </DialogFooter>
    </UserDialog>
  );
}