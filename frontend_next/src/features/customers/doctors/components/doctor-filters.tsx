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
  experience: string;
  specialtyOptions: FilterOption[];
  experienceOptions: FilterOption[];
  onSpecialtyChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
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
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <Select
        value={specialty}
        onValueChange={(value) => {
          onSpecialtyChange(value ?? "");
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select specialty" />
        </SelectTrigger>

        <SelectContent>
          {specialtyOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={experience}
        onValueChange={(value) => {
          onExperienceChange(value ?? "");
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select experience" />
        </SelectTrigger>

        <SelectContent>
          {experienceOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}