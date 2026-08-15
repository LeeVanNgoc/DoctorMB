export interface DoctorUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
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
  specialty: DoctorSpecialty;

  degree: string;
  experience: number;
  clinicAddress: string;
  consultationFee: number;
  description: string;

  avatar: string;
  rating: number;
  totalReviews: number;

  createdAt: string;
  updatedAt: string;
}

export interface DoctorsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DoctorsResponse {
  data: Doctor[];
  pagination: DoctorsPagination;
}
