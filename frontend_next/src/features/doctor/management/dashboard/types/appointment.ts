export interface DoctorAppointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
}