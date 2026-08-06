"use client";

import { useState } from "react";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { FormSelect } from "@/shared/components/common/form-select";

import {
  USER_ROLE,
  USER_STATUS,
} from "../constants/user-filters";

import {
  User,
  UserFormMode,
  UserRole,
  UserStatus,
} from "../types";

interface UserFormProps {
  mode: UserFormMode;
  user?: User;
}

export function UserForm({
  mode,
  user,
}: UserFormProps) {
  const readOnly = mode === "view";

  const [role, setRole] =
    useState<UserRole>(
      user?.role ?? "patient"
    );

  const [status, setStatus] =
    useState<UserStatus>(
      user?.status ?? "active"
    );

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          defaultValue={user?.fullName}
          placeholder="Enter full name"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          defaultValue={user?.email}
          placeholder="Enter email"
          disabled={readOnly}
        />
      </div>

      {mode === "create" && (
        <div className="grid gap-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>
            Role
          </Label>

          <FormSelect
            value={role}
            placeholder="Select role"
            options={
              USER_ROLE.filter(
                (option) =>
                  option.value !== "all"
              )
            }
            disabled={readOnly}
            onValueChange={(value) =>
              setRole(
                (value ?? "patient") as UserRole
              )
            }
          />
        </div>

        <div className="grid gap-2">
          <Label>
            Status
          </Label>

          <FormSelect
            value={status}
            placeholder="Select status"
            options={
              USER_STATUS.filter(
                (option) =>
                  option.value !== "all"
              )
            }
            disabled={readOnly}
            onValueChange={(value) =>
              setStatus(
                (value ?? "active") as UserStatus
              )
            }
          />
        </div>
      </div>
    </div>
  );
}