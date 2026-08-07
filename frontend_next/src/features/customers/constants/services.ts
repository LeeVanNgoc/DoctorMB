import {
  CalendarDays,
  Pill,
  Stethoscope,
} from "lucide-react";

export const SERVICES = [
  {
    title: "Find Doctors",
    description:
      "Browse experienced doctors by specialty and find the right one for your healthcare needs.",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Book Appointments",
    description:
      "Schedule appointments online quickly and conveniently.",
    href: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Buy Medicines",
    description:
      "Order medicines safely through DoctorM Pharmacy.",
    href: "/medicines",
    icon: Pill,
  },
] as const;