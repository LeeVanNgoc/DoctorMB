"use client";

import { Button } from "@/shared/components/ui/button";
import {
  DialogFooter,
} from "@/shared/components/ui/dialog";

import { ReceptionistDialogLayout } from "../components/receptionist-dialog-layout";

import { Receptionist } from "../types/receptionist";

interface DeleteReceptionistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receptionist?: Receptionist;
}

export function DeleteReceptionistDialog({
  open,
  onOpenChange,
  receptionist,
}: DeleteReceptionistDialogProps) {
  return (
    <ReceptionistDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Receptionist"
      description="This action cannot be undone."
    >
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="font-medium text-foreground">
          {receptionist?.fullName}
        </span>
        ?
      </p>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() =>
            onOpenChange(false)
          }
        >
          Cancel
        </Button>

        <Button variant="destructive">
          Delete
        </Button>
      </DialogFooter>
    </ReceptionistDialogLayout>
  );
}