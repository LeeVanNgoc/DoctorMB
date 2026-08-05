import {
  Users,
  Stethoscope,
  UserRound,
  UserCog,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface PeopleStatistic {
  title: string;
  value: string;
  icon: LucideIcon;
}

export const PEOPLE_STATISTICS: PeopleStatistic[] = [
  {
    title: "Total Users",
    value: "520",
    icon: Users,
  },
  {
    title: "Doctors",
    value: "45",
    icon: Stethoscope,
  },
  {
    title: "Patients",
    value: "1200",
    icon: UserRound,
  },
  {
    title: "Receptionists",
    value: "12",
    icon: UserCog,
  },
];