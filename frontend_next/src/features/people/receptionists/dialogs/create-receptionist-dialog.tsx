"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { ReceptionistDialogLayout } from "../components/receptionist-dialog-layout";
import { ReceptionistForm } from "../forms/receptionist-form";

interface CreateReceptionistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateReceptionistDialog({
  open,
  onOpenChange,
}: CreateReceptionistDialogProps) {
  return (
    <ReceptionistDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Create Receptionist"
      description="Add a new receptionist to the system."
    >
      <ReceptionistForm mode="create" />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() =>
            onOpenChange(false)
          }
        >
          Cancel
        </Button>

        <Button>
          Create
        </Button>
      </DialogFooter>
    </ReceptionistDialogLayout>
  );
}