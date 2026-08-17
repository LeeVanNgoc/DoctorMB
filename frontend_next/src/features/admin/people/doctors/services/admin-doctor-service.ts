import { api } from "@/shared/services/api";

import type {
  Doctor,
  DoctorAccount,
  DoctorFilter,
  DoctorsResponse,
  DoctorStatusResponse,
  UpdateDoctorData,
} from "../types";

export async function getAdminDoctors(
  params?: DoctorFilter,
): Promise<DoctorsResponse> {
  const response = await api.get<DoctorsResponse>("/api/doctors/admin", {
    params,
  });

  return response.data;
}

export async function getAdminDoctorById(id: string): Promise<Doctor> {
  const response = await api.get<Doctor>(`/api/doctors/${id}`);

  return response.data;
}

export async function createAdminDoctor(data: DoctorAccount): Promise<Doctor> {
  const response = await api.post<Doctor>("/api/doctors/account", data);

  return response.data;
}

export async function updateAdminDoctor(
  id: string,
  data: UpdateDoctorData,
): Promise<Doctor> {
  const response = await api.patch<Doctor>(`/api/doctors/${id}`, data);

  return response.data;
}

export async function activateDoctor(
  id: string,
): Promise<DoctorStatusResponse> {
  const response = await api.patch<DoctorStatusResponse>(
    `/api/doctors/${id}/activate`,
  );

  return response.data;
}

export async function deactivateDoctor(
  id: string,
): Promise<DoctorStatusResponse> {
  const response = await api.patch<DoctorStatusResponse>(
    `/api/doctors/${id}/deactivate`,
  );

  return response.data;
}
