import type { FilterOption } from "../types/doctor-filter";

export const SPECIALTY_OPTIONS: FilterOption[] = [
  { label: "All Specialties", value: "" },
  { label: "Cardiology", value: "cardiology" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Neurology", value: "neurology" },
  { label: "Pediatrics", value: "pediatrics" },
];

export const EXPERIENCE_OPTIONS: FilterOption[] = [
  { label: "Any Experience", value: "" },
  { label: "1+ Years", value: "1" },
  { label: "5+ Years", value: "5" },
  { label: "10+ Years", value: "10" },
];