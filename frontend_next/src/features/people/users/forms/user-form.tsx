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
import { UserStatusBadge } from "../components/user-status-badge";

export interface UserFormValues {
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}

interface UserFormProps {
  mode: UserFormMode;
  values: UserFormValues;

  onChange: (
    field: keyof UserFormValues,
    value: string
  ) => void;
}

export function UserForm({
  mode,
  values,
  onChange
}: UserFormProps) {
  const readOnly = mode === "view";

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          value={values.fullName}
          placeholder="Enter full name"
          disabled={readOnly}
          onChange={(e)=>
            onChange(
              "fullName",
              e.target.value
            )
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          value={values.email}
          placeholder="Enter email"
          disabled={readOnly}
          onChange={(e)=>
            onChange(
              "email",
              e.target.value
            )
          }
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
            value={values.password ?? ""}
            placeholder="Enter password"
            onChange={(e)=>
              onChange(
                "password",
                e.target.value
              )
            }
          />
        </div>
      )}

      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>
            Role
          </Label>
          {mode === "view" ? (
            <p className="text-sm uppercase">
              {values.role}
            </p>
          ) : (
            <FormSelect
              value={values.role}
              placeholder="Select role"
              options={
                USER_ROLE.filter(
                  (option) =>
                    option.value !== "all"
                )
              }
              disabled={readOnly}
              onValueChange={(value)=>
                onChange(
                  "role",
                  value ?? "patient"
                )
              }
                />
          )}
        </div>

        <div className="grid gap-2">
          <Label>
            Status
          </Label>
          {mode === "view" ? (
            <UserStatusBadge status={values.status} />
          ) : (
            <FormSelect
              value={values.status}
              placeholder="Select status"
              options={USER_STATUS.filter(
                option =>
                  option.value !== "all"
              )}
              onValueChange={(value) =>
                onChange(
                  "status",
                  value ?? "active"
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}