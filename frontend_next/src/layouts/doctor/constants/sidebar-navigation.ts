import { MANAGEMENT_NAVIGATION } from "@/features/doctor/management/constants/management-navigation";

export const DOCTOR_NAVIGATION = {
  management: MANAGEMENT_NAVIGATION,
} as const;

export type SidebarModule = keyof typeof DOCTOR_NAVIGATION;