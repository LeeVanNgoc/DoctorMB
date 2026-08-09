import { Pill } from "lucide-react";

export const FEATURED_MEDICINES = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: "$5.99",
    href: "/medicines/1",
    icon: Pill,
  },
  {
    id: "2",
    name: "Vitamin C",
    category: "Supplements",
    price: "$12.50",
    href: "/medicines/2",
    icon: Pill,
  },
  {
    id: "3",
    name: "Omega 3",
    category: "Supplements",
    price: "$18.00",
    href: "/medicines/3",
    icon: Pill,
  },
] as const;