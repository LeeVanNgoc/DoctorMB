import {
  Clock3,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";

export const WHY_CHOOSE_ITEMS = [
  {
    id: "1",
    title: "Experienced Doctors",
    description:
      "Consult with qualified and experienced healthcare professionals.",
    icon: Stethoscope,
  },
  {
    id: "2",
    title: "Easy Online Booking",
    description:
      "Book appointments anytime, anywhere in just a few clicks.",
    icon: Clock3,
  },
  {
    id: "3",
    title: "Trusted Medicines",
    description:
      "Purchase genuine medicines from reliable pharmacy partners.",
    icon: ShieldCheck,
  },
  {
    id: "4",
    title: "Fast Delivery",
    description:
      "Receive your medicines quickly and safely at your doorstep.",
    icon: Truck,
  },
] as const;