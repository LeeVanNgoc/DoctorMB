"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import {
  PATIENT_GENDER,
  PATIENT_STATUS,
} from "../constants/patient-filters";

import {
  Patient,
  PatientFormMode,
} from "../types";
import { FormSelect } from "@/shared/components/common/form-select";

interface PatientFormProps {
  mode: PatientFormMode;
  patient?: Patient;
}

export function PatientForm({
  mode,
  patient,
}: PatientFormProps) {
  const readOnly = mode === "view";

  const [gender, setGender] = useState(
  patient?.gender ?? ""
  );

  const [status, setStatus] = useState(
    patient?.status ?? "active"
  );

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="patientCode">
          Patient Code
        </Label>

        <Input
          id="patientCode"
          defaultValue={patient?.patientCode}
          placeholder="Enter patient code"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          defaultValue={patient?.fullName}
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
          defaultValue={patient?.email}
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
          defaultValue={patient?.phone}
          placeholder="Enter phone number"
          disabled={readOnly}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>
            Gender
          </Label>

          <FormSelect
            value={gender}
            placeholder="Select gender"
            options={PATIENT_GENDER}
            disabled={readOnly}
            onValueChange={(value) =>
              setGender(
                (value ?? "male") as
                  | "male"
                  | "female"
              )
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth
          </Label>

          <Input
            id="dateOfBirth"
            type="date"
            defaultValue={patient?.dateOfBirth}
            disabled={readOnly}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>
          Status
        </Label>

        <FormSelect
          value={status}
          placeholder="Select status"
          options={PATIENT_STATUS}
          disabled={readOnly}
          onValueChange={(value) =>
            setStatus(
              (value ?? "active") as
                | "active"
                | "inactive"
            )
          }
        />
      </div>
    </div>
  );
}