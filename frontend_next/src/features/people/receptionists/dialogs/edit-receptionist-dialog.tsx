"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { ReceptionistDialogLayout } from "../components/receptionist-dialog-layout";
import { ReceptionistForm } from "../forms/receptionist-form";

import { Receptionist } from "../types/receptionist";

interface EditReceptionistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receptionist?: Receptionist;
}

export function EditReceptionistDialog({
  open,
  onOpenChange,
  receptionist,
}: EditReceptionistDialogProps) {
  return (
    <ReceptionistDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Receptionist"
      description="Update receptionist information."
    >
      <ReceptionistForm
        mode="edit"
        receptionist={receptionist}
      />

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
          Save Changes
        </Button>
      </DialogFooter>
    </ReceptionistDialogLayout>
  );
}