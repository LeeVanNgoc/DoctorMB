import {
  Calendar,
  LayoutDashboard,
  Pill,
  Settings,
  Stethoscope,
  User,
  Users,
  LogOut,
} from "lucide-react";

export const sidebarMenus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Doctors",
    href: "/dashboard/doctors",
    icon: Stethoscope,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Medicines",
    href: "/dashboard/medicines",
    icon: Pill,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];