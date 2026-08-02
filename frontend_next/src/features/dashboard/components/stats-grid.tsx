import {
  CalendarDays,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

import { StatsCard } from "./stats-card";

const statistics = [
  {
    title: "Doctors",
    value: 18,
    description: "+2 this month",
    icon: Stethoscope,
  },
  {
    title: "Patients",
    value: 142,
    description: "+18 today",
    icon: Users,
  },
  {
    title: "Appointments",
    value: 32,
    description: "Today",
    icon: CalendarDays,
  },
  {
    title: "Revenue",
    value: "$8,540",
    description: "This month",
    icon: Wallet,
  },
];

export function StatsGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </section>
  );
}