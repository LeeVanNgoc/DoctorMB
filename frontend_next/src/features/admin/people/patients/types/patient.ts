export type PatientStatus =
  | "active"
  | "inactive";

export interface Patient {
  id: string;

  patientCode: string;

  fullName: string;

  email: string;

  phone: string;

  gender: "male" | "female";

  dateOfBirth: string;

  status: PatientStatus;
}