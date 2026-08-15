export interface FilterOption {
  label: string;
  value: string;
}

export interface DoctorFilter {
  search?: string;
  specialty?: string;
  experience?: number;
  page?: number;
  limit?: number;
}
