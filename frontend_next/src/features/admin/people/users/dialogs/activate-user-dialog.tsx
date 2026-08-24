"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { useUpdateUserStatus } from "../hooks/use-users";

import type { User } from "../types";

interface ActivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function ActivateUserDialog({
  open,
  onOpenChange,
  user,
}: ActivateUserDialogProps) {
  const { mutate: updateUserStatus, isPending } =
    useUpdateUserStatus();

  const isActive = user.status === "active";

  const action = isActive
    ? "Deactivate"
    : "Activate";

  const nextStatus = isActive
    ? "inactive"
    : "active";

  const handleStatusChange = () => {
    updateUserStatus(
      {
        id: user._id,
        status: nextStatus,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`${action} User`}
      description={`This will ${action.toLowerCase()} the user's account.`}
    >
      <p className="py-4 text-sm text-muted-foreground">
        Are you sure you want to{" "}
        <span className="font-medium text-foreground">
          {action.toLowerCase()}
        </span>{" "}
        user{" "}
        <span className="font-semibold text-foreground">
          {user.fullName}
        </span>
        ?
      </p>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          variant={isActive ? "destructive" : "default"}
          onClick={handleStatusChange}
          disabled={isPending}
        >
          {isPending ? `${action}ing...` : action}
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}