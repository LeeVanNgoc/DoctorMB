import type { LucideIcon } from "lucide-react";

export interface FeaturedDoctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  href: string;
  icon: LucideIcon;
}