import { User } from "../types/user";

export const USER_ROLE_OPTIONS = [
  {
    value: "all",
    label: "All Roles",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "doctor",
    label: "Doctor",
  },
  {
    value: "patient",
    label: "Patient",
  },
  {
    value: "receptionist",
    label: "Receptionist",
  },
];

export const USER_STATUS_OPTIONS = [
  {
    value: "all",
    label: "All Status",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];