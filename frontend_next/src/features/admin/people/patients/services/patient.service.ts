import { api } from "@/shared/services/api";

import type {
  CreatePatientRequest,
  UpdatePatientRequest,
  Patient,
} from "../types";
import { UserListResponse } from "../../users/services/user.service";

export interface PatientListResponse {
  patients: Patient[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const patientService = {
  getPatients(params?: { page?: number; limit?: number; search?: string }) {
    return api.get<PatientListResponse>("/api/patients", {
      params,
    });
  },

  getPatientById(id: string) {
    return api.get<{ patient: Patient }>(`/api/patients/${id}`);
  },

  createPatient(data: CreatePatientRequest) {
    return api.post<{
      message: string;
      patient: Patient;
    }>("/api/patients", data);
  },

  updatePatient(id: string, data: UpdatePatientRequest) {
    return api.patch<{
      message: string;
      patient: Patient;
    }>(`/api/patients/${id}`, data);
  },

  deletePatient(id: string) {
    return api.delete<{
      message: string;
    }>(`/api/patients/${id}`);
  },

  getPatientUsers(params?: { search?: string; page?: number; limit?: number }) {
    return api.get<UserListResponse>("/api/users", {
      params: {
        ...params,
        role: "patient",
      },
    });
  },
};
