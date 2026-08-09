import { BriefcaseMedical, FileBadge2 } from "lucide-react";

import { PortalModule } from "@/shared/types/portal-module";

export const DOCTOR_MODULES: PortalModule[] = [
  {
    title: "Management",
    description: "Manage appointments, consultations, prescriptions and schedules.",
    href: "/doctor/management",
    coming: "Coming soon",
    icon: BriefcaseMedical,
    enabled: true,
  },
  {
    title: "Doctor's Resume",
    description: "Manage your professional profile and qualifications.",
    href: "/doctor/resume",
    coming: "Coming soon",
    icon: FileBadge2,
    enabled: true,
  },
];