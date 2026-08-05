export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "doctor" | "patient" | "receptionist";
  status: "active" | "inactive";
}