import type { LucideIcon } from "lucide-react";

export interface DoctorDashboardStat {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}