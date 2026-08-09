export type DoctorStatus =
  | "active"
  | "inactive";

export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  yearsOfExperience: number;
  status: DoctorStatus;
}