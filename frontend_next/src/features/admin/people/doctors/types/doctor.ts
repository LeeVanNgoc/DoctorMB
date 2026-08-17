export type DoctorStatus = "active" | "inactive";

export type DoctorProfileStatus = "complete" | "incomplete";

export interface DoctorUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: DoctorStatus;
}

export interface DoctorSpecialty {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Doctor {
  _id: string;

  userId: DoctorUser;

  specialty: DoctorSpecialty | null;

  degree: string;
  experience: number;
  clinicAddress: string;
  consultationFee: number;
  description: string;

  rating: number;
  totalReviews: number;

  profileStatus: DoctorProfileStatus;

  createdAt: string;
  updatedAt: string;
}

export interface DoctorAccount {
  fullName: string;
  email: string;
  phone: string;
}

export interface DoctorPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DoctorsResponse {
  data: Doctor[];
  pagination: DoctorPagination;
}

export interface DoctorFilter {
  search?: string;
  specialty?: string;
  status?: DoctorStatus;
  page?: number;
  limit?: number;
}

export interface UpdateDoctorData {
  fullName?: string;
  email?: string;
  phone?: string;

  specialty?: string;
  degree?: string;
  experience?: number;
  clinicAddress?: string;
  consultationFee?: number;
  description?: string;
}

export interface DoctorStatusResponse {
  message: string;
  doctorId: string;
  userId: string;
}
