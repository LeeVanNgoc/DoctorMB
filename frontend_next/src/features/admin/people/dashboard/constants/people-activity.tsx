import {
  UserPlus,
  UserRoundCog,
  Stethoscope,
} from "lucide-react";

import { PeopleActivity } from "../types/people-activity";

export const PEOPLE_ACTIVITIES: PeopleActivity[] = [
  {
    title: "New patient registered",
    description: "Nguyen Van A created a new patient profile.",
    time: "10 minutes ago",
    icon: UserPlus,
  },
  {
    title: "Doctor profile updated",
    description: "Dr. Tran updated personal information.",
    time: "1 hour ago",
    icon: Stethoscope,
  },
  {
    title: "New receptionist created",
    description: "Le Van B joined the receptionist team.",
    time: "Yesterday",
    icon: UserRoundCog,
  },
];