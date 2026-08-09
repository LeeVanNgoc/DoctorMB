import { PEOPLE_NAVIGATION } from "@/features/admin/people/dashboard/constants/people-navigation";
import { MEDICINES_NAVIGATION } from "@/features/admin/medicines/medicines-navigation";
import { REPORTS_NAVIGATION } from "@/features/admin/reports/reports-navigation";

export const SIDEBAR_NAVIGATION = {
  people: PEOPLE_NAVIGATION,
  medicines: MEDICINES_NAVIGATION,
  reports: REPORTS_NAVIGATION,
} as const;

export type SidebarModule = keyof typeof SIDEBAR_NAVIGATION;