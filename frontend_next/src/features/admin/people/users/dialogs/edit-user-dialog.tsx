/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";

import { UserDialog } from "../components/user-dialog-layout";
import { UserForm } from "../forms/user-form";

import { useUpdateUser } from "../hooks/use-users";

import type {
  UserFormValues ,
  User,
} from "../types";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function EditUserDialog({
  open,
  onOpenChange,
  user,
}: EditUserDialogProps) {
  const [formData, setFormData] =
    useState<UserFormValues >({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });

  const handleChange = (
    field: keyof UserFormValues ,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    mutateAsync: updateUser,
    isPending,
  } = useUpdateUser();

  const handleSave = async () => {
    try {
      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };

      await updateUser({
        id: user._id,
        data: updateData,
      });

      toast.success("User updated successfully.");

      onOpenChange(false);
    } catch (error: any) {
      console.error(
          "Create user failed:",
          error.response?.data
        );
    }
  };

  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit User"
      description="Update the selected user's information."
    >
      <UserForm
        mode="edit"
        values={formData}
        onChange={handleChange}
      />

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}