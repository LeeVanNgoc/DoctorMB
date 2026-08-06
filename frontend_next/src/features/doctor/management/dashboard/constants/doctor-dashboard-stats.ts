import {
  CalendarCheck,
  Clock,
  FileText,
  Users,
} from "lucide-react";

import { DoctorDashboardStat } from "../types/doctor-dashboard-stat";

export const DOCTOR_DASHBOARD_STATS: DoctorDashboardStat[] = [
  {
    title: "Today's Appointments",
    value: 12,
    description: "Scheduled for today",
    icon: CalendarCheck,
  },
  {
    title: "Waiting Patients",
    value: 5,
    description: "Currently waiting",
    icon: Clock,
  },
  {
    title: "Completed Consultations",
    value: 8,
    description: "Completed today",
    icon: FileText,
  },
  {
    title: "Total Patients",
    value: 250,
    description: "Under your care",
    icon: Users,
  },
];