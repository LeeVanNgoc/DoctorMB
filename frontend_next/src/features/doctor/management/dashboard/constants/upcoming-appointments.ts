import { DoctorAppointment } from "../types/appointment";

export const UPCOMING_APPOINTMENTS: DoctorAppointment[] = [
  {
    id: "1",
    patientName: "Nguyen Van A",
    time: "09:00 AM",
    type: "General Checkup",
    status: "upcoming",
  },
  {
    id: "2",
    patientName: "Tran Thi B",
    time: "10:30 AM",
    type: "Follow-up",
    status: "upcoming",
  },
  {
    id: "3",
    patientName: "Le Van C",
    time: "02:00 PM",
    type: "Medical Consultation",
    status: "upcoming",
  },
];