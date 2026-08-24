"use client";

import { useState } from "react";

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
import { useUpdateUser } from "../hooks/use-users";
import { USER_ROLE, USER_STATUS } from "../constants/user-filters";

import type { User, UserRole, UserStatus } from "../types";

interface UpdateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function UpdateUserDialog({
  open,
  onOpenChange,
  user,
}: UpdateUserDialogProps) {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [avatar, setAvatar] = useState(user.avatar ?? "");
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleUpdate = () => {
    updateUser(
      {
        id: user._id,
        data: {
          fullName,
          email,
          phone,
          avatar,
          role,
          status,
        },
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
      title="Update User"
      description="Update user information."
    >
      <div className="space-y-6">
        {/* Profile */}
        <div className="flex gap-6 rounded-lg border bg-muted/30 p-6">
          {/* Avatar */}
          <div className="w-28 shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {avatar ? (
                <img
                  src={avatar}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-primary">
                  {getInitial(fullName)}
                </span>
              )}
            </div>

            <Input
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
              placeholder="Avatar URL"
              className="mt-3"
            />
          </div>

          {/* User Information */}
          <div className="min-w-0 flex-1 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>

              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>

              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>

              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <label className="w-16 shrink-0 text-sm font-medium">Role:</label>

            <Select
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue>
                  {USER_ROLE.find((option) => option.value === role)?.label}
                </SelectValue>
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
            <label className="w-16 shrink-0 text-sm font-medium">Status:</label>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value as UserStatus)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue>
                  {USER_STATUS.find((option) => option.value === status)?.label}
                </SelectValue>
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
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button onClick={handleUpdate} disabled={isPending}>
          {isPending ? "Updating..." : "Update User"}
        </Button>
      </DialogFooter>
    </UserDialog>
  );
}
