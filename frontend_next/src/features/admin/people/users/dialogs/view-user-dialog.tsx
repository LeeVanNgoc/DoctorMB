"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";

import type { User } from "../types";

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
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="User Details"
      description="View user information."
    >
      <div className="space-y-6">
        {/* Profile */}
        <div className="flex gap-6 rounded-lg border bg-muted/30 p-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-primary">
                  {getInitial(user.fullName)}
                </span>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="min-w-0 flex-1 space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Full Name
              </p>

              <p className="mt-1 text-lg font-semibold">{user.fullName}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>

              <p className="mt-1 break-all text-sm">{user.email}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Phone
              </p>

              <p className="mt-1 text-sm">{user.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Role
            </p>

            <p className="mt-2 text-sm font-medium capitalize">{user.role}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Status
            </p>

            <p className="mt-2 text-sm font-medium capitalize">{user.status}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Created At
            </p>

            <p className="mt-2 text-sm font-medium">
              {formatDate(user.createdAt)}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Updated At
            </p>

            <p className="mt-2 text-sm font-medium">
              {formatDate(user.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogFooter>
    </UserDialog>
  );
}
