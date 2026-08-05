"use client";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  Doctor,
  DoctorFormMode,
} from "../types";

interface DoctorFormProps {
  mode: DoctorFormMode;
  doctor?: Doctor;
}

export function DoctorForm({
  mode,
  doctor,
}: DoctorFormProps) {
  const readOnly = mode === "view";

  return (
    <div className="grid gap-5 py-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">
          Full Name
        </Label>

        <Input
          id="fullName"
          defaultValue={doctor?.fullName}
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
          defaultValue={doctor?.email}
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
          defaultValue={doctor?.phone}
          placeholder="Enter phone number"
          disabled={readOnly}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="specialty">
          Specialty
        </Label>

        <Input
          id="specialty"
          defaultValue={doctor?.specialty}
          placeholder="Enter specialty"
          disabled={readOnly}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="licenseNumber">
            License Number
          </Label>

          <Input
            id="licenseNumber"
            defaultValue={doctor?.licenseNumber}
            placeholder="Enter license number"
            disabled={readOnly}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yearsOfExperience">
            Years of Experience
          </Label>

          <Input
            id="yearsOfExperience"
            type="number"
            defaultValue={doctor?.yearsOfExperience}
            placeholder="Years"
            disabled={readOnly}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>
          Status
        </Label>

        <Select
          defaultValue={doctor?.status}
          disabled={readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="active">
              Active
            </SelectItem>

            <SelectItem value="inactive">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}