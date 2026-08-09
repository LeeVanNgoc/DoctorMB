import {
  LayoutDashboard,
  Stethoscope,
  UserCog,
  UserRound,
  Users,
} from "lucide-react";

import { SidebarNavigationItem } from "@/layouts/admin/types/sidebar-navigation-item";

export const PEOPLE_NAVIGATION: SidebarNavigationItem[] = [
  {
    title: "Dashboard",
    href: "/admin/people",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/people/users",
    icon: Users,
  },
  {
    title: "Doctors",
    href: "/admin/people/doctors",
    icon: Stethoscope,
  },
  {
    title: "Patients",
    href: "/admin/people/patients",
    icon: UserRound,
  },
  {
    title: "Receptionists",
    href: "/admin/people/receptionists",
    icon: UserCog,
  },
];