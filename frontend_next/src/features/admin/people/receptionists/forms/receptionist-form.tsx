"use client";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { FormSelect } from "@/shared/components/common/form-select";

import {
  RECEPTIONIST_STATUS_OPTIONS,
} from "../constants/receptionist-filters";

import {
  Receptionist,
  ReceptionistStatus,
} from "../types/receptionist";

interface ReceptionistFormProps {
  mode: "create" | "edit" | "view";
  receptionist?: Receptionist;
}

export function ReceptionistForm({
  mode,
  receptionist,
}: ReceptionistFormProps) {
  const readOnly = mode === "view";

  const [status, setStatus] = useState(
    receptionist?.status ?? "active"
  );

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          defaultValue={receptionist?.fullName}
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
          defaultValue={receptionist?.email}
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

      <div className="grid gap-2">
        <Label htmlFor="phone">
          Phone
        </Label>

        <Input
          id="phone"
          defaultValue={receptionist?.phone}
          placeholder="Enter phone number"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="employeeCode">
          Employee Code
        </Label>

        <Input
          id="employeeCode"
          defaultValue={
            receptionist?.employeeCode
          }
          placeholder="Enter employee code"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Status
        </Label>

        <FormSelect
          value={status}
          placeholder="Select status"
          options={RECEPTIONIST_STATUS_OPTIONS.filter(
            (option) => option.value !== "all"
          )}
          disabled={readOnly}
          onValueChange={(value) =>
            setStatus(
              (value ?? "active") as ReceptionistStatus
            )
          }
        />
      </div>
    </div>
  );
}