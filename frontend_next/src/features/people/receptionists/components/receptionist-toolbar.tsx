"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { FormSelect } from "@/shared/components/common/form-select";

import { RECEPTIONIST_STATUS_OPTIONS } from "../constants/receptionist-filters";

import { CreateReceptionistDialog } from "../dialogs/create-receptionist-dialog";

export function ReceptionistToolbar() {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);

  const [status, setStatus] =
    useState("all");

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search receptionists..."
              className="pl-9"
            />
          </div>

          <FormSelect
            value={status}
            placeholder="Status"
            options={RECEPTIONIST_STATUS_OPTIONS}
            className="w-40"
            onValueChange={(value) =>
              setStatus(value ?? "all")
            }
          />
        </div>

        <Button
          onClick={() =>
            setOpenCreateDialog(true)
          }
        >
          <Plus className="mr-2 size-4" />
          Add Receptionist
        </Button>
      </div>

      <CreateReceptionistDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}