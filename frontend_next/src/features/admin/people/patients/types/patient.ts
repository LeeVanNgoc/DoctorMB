export type PatientStatus = "active" | "inactive";

export type PatientGender = "Male" | "Female" | "Other";

export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PatientUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: PatientStatus;
  role: "patient";
}

export interface Patient {
  _id: string;

  userId: PatientUser;

  gender: PatientGender;
  dateOfBirth: string;

  address?: string;

  bloodType?: BloodType;

  allergies: string[];

  insuranceNumber?: string;

  emergencyContact?: EmergencyContact;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  userId?: string;

  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;

  gender: PatientGender;
  dateOfBirth: string;

  address?: string;
  bloodType?: BloodType;
  allergies?: string[];
  insuranceNumber?: string;
  emergencyContact?: EmergencyContact;
}

export interface UpdatePatientRequest {
  gender?: PatientGender;
  dateOfBirth?: string;
  address?: string;
  bloodType?: BloodType;
  allergies?: string[];
  insuranceNumber?: string;
  emergencyContact?: EmergencyContact;
  isActive?: boolean;
}
