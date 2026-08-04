import { LucideIcon } from "lucide-react";

export interface AdminModule {
  title: string;
  description: string;
  href: string;
  coming: string;
  icon: LucideIcon;
  enabled: boolean;
}