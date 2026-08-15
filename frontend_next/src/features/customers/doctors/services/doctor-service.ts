import { api } from "@/shared/services/api";

import type { Doctor, DoctorsResponse } from "../types/doctor";

import type { DoctorFilter } from "../types/doctor-filter";

export async function getDoctors(
  params?: DoctorFilter,
): Promise<DoctorsResponse> {
  const response = await api.get<DoctorsResponse>("/api/doctors", {
    params,
  });

  return response.data;
}

export async function getDoctorById(id: string): Promise<Doctor> {
  const response = await api.get<Doctor>(`/api/doctors/${id}`);

  return response.data;
}
