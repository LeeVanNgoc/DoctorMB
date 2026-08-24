"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { DialogFooter } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { UserDialog } from "../components/user-dialog-layout";
import { useCreateUser } from "../hooks/use-users";

import { USER_ROLE, USER_STATUS } from "../constants/user-filters";

import type { CreateUserRequest, UserRole, UserStatus } from "../types";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM_DATA: CreateUserRequest = {
  fullName: "",
  email: "",
  phone: "",
  avatar: "",
  password: "",
  role: "patient",
  status: "active",
};

export function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  const [formData, setFormData] =
    useState<CreateUserRequest>(INITIAL_FORM_DATA);

  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: createUser, isPending } = useCreateUser();

  const handleChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setShowPassword(false);
  };

  const handleCreate = async () => {
    try {
      await createUser(formData);

      toast.success("User added successfully.");

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Add user failed:", error);

      toast.error("Failed to add user.");
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const avatarInitial = formData.fullName
    ? formData.fullName.charAt(0).toUpperCase()
    : "U";

  const selectedRoleLabel = USER_ROLE.find(
    (option) => option.value === formData.role,
  )?.label;

  const selectedStatusLabel = USER_STATUS.find(
    (option) => option.value === formData.status,
  )?.label;

  return (
    <UserDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add User"
      description="Add a new user account to the system."
    >
      <div className="space-y-6">
        {/* User Profile */}
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="shrink-0 space-y-3">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt={formData.fullName || "User avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-primary">
                  {avatarInitial}
                </span>
              )}
            </div>

            <Input
              value={formData.avatar}
              onChange={(event) => handleChange("avatar", event.target.value)}
              placeholder="Avatar URL"
              className="w-28"
            />
          </div>

          {/* Basic Information */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>

              <Input
                value={formData.fullName}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>

              <Input
                type="email"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>

              <Input
                value={formData.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Enter password"
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Role + Status */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <label className="shrink-0 text-sm font-medium">Role:</label>

            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  role: value as UserRole,
                }))
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue>{selectedRoleLabel}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {USER_ROLE.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label className="shrink-0 text-sm font-medium">Status:</label>

            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value as UserStatus,
                }))
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue>{selectedStatusLabel}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {USER_STATUS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleCancel} disabled={isPending}>
          Cancel
        </Button>

        <Button onClick={handleCreate} disabled={isPending}>
          {isPending ? "Adding..." : "Add User"}
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}
