export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";


export interface DoctorAppointment {
  id: string;

  patientName: string;

  patientId: string;

  date: string;

  time: string;

  reason: string;

  status: AppointmentStatus;
}