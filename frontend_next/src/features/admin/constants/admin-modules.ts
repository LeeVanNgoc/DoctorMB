import { PortalModule } from "@/shared/types/portal-module";
import { ChartColumn, Pill, Users } from "lucide-react";


export const ADMIN_MODULES: PortalModule[] = [
  {
    title: "People",
    description: "Manage users, doctors, patients and receptionists.",
    href: "/admin/people",
    coming: "Coming soon",
    icon: Users,
    enabled: true,
  },
  {
    title: "Medicines",
    description: "Manage medicines, inventory and categories.",
    href: "/admin/medicines",
    coming: "Coming soon",
    icon: Pill,
    enabled: true,
  },
  {
    title: "Reports",
    description: "View analytics and business reports.",
    href: "/admin/reports",
    coming: "Coming soon",
    icon: ChartColumn,
    enabled: true,
  },
];