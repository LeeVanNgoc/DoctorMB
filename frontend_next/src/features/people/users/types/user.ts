export type UserRole =
  | "admin"
  | "doctor"
  | "patient"
  | "receptionist";

export type UserStatus =
  | "active"
  | "inactive";
  
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "doctor" | "patient" | "receptionist";
  status: "active" | "inactive";
}