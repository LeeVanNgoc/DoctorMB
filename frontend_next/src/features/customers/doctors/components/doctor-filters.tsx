"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import type { FilterOption } from "../types/doctor-filter";

interface DoctorFiltersProps {
  specialty: string;
  experience: number | undefined;
  specialtyOptions: FilterOption[];
  experienceOptions: FilterOption[];
  onSpecialtyChange: (value: string) => void;
  onExperienceChange: (value: number | undefined) => void;
}

export function DoctorFilters({
  specialty,
  experience,
  specialtyOptions,
  experienceOptions,
  onSpecialtyChange,
  onExperienceChange,
}: DoctorFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select
        value={specialty}
        onValueChange={(value) => {
          onSpecialtyChange(value ?? "");
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All</SelectItem>
          {specialtyOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={experience !== undefined ? String(experience) : ""}
        onValueChange={(value) => {
          onExperienceChange(value ? Number(value) : undefined);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Experience" />
        </SelectTrigger>

        <SelectContent>
          {experienceOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
