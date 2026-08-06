"use client";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { ReceptionistDialogLayout } from "../components/receptionist-dialog-layout";
import { ReceptionistForm } from "../forms/receptionist-form";

import { Receptionist } from "../types/receptionist";

interface ViewReceptionistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receptionist?: Receptionist;
}

export function ViewReceptionistDialog({
  open,
  onOpenChange,
  receptionist,
}: ViewReceptionistDialogProps) {
  return (
    <ReceptionistDialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title="Receptionist Details"
      description="View receptionist information."
    >
      <ReceptionistForm
        mode="view"
        receptionist={receptionist}
      />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() =>
            onOpenChange(false)
          }
        >
          Close
        </Button>
      </DialogFooter>
    </ReceptionistDialogLayout>
  );
}