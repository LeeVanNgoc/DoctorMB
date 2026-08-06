import { CalendarDays, Clock3, FileText, LayoutDashboard, Stethoscope, Users } from "lucide-react";

export const MANAGEMENT_NAVIGATION = [
  {
    title: "Dashboard",
    href: "/doctor/management",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/doctor/management/appointments",
    icon: CalendarDays,
  },
  {
    title: "Patients",
    href: "/doctor/management/patients",
    icon: Users,
  },
  {
    title: "Consultations",
    href: "/doctor/management/consultations",
    icon: Stethoscope,
  },
  {
    title: "Prescriptions",
    href: "/doctor/management/prescriptions",
    icon: FileText,
  },
  {
    title: "Schedule",
    href: "/doctor/management/schedule",
    icon: Clock3,
  },
];