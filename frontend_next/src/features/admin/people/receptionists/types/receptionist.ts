export type ReceptionistStatus =
  | "active"
  | "inactive";

export interface Receptionist {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  employeeCode: string;

  status: ReceptionistStatus;
}