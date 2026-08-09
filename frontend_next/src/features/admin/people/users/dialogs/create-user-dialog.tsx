/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { UserForm } from "../forms/user-form";
import type { CreateUserRequest } from "../types";
import { useCreateUser } from "../hooks/use-users";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM_DATA: CreateUserRequest = {
  fullName: "",
  email: "",
  password: "",
  role: "patient",
  status: "active",
};

export function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  const [formData, setFormData] =
    useState<CreateUserRequest>(
      INITIAL_FORM_DATA
    );

  const {
    mutateAsync: createUser,
    isPending,
  } = useCreateUser();

  const handleChange = (
    field: keyof CreateUserRequest,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const handleCreate = async () => {
    try {
      console.log(
        "CREATE USER DATA:",
        formData
      );

      await createUser(formData);
      toast.success("User updated successfully.");

      resetForm();

      onOpenChange(false);

    } catch (error: any) {
        console.error(
          "Create user failed:",
          error.response?.data
        );
      }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create User"
      description="Create a new user account in the system."
    >
      <UserForm
        mode="create"
        values={formData}
        onChange={handleChange}
      />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          onClick={handleCreate}
          disabled={isPending}
        >
          {isPending
            ? "Creating..."
            : "Create User"}
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}