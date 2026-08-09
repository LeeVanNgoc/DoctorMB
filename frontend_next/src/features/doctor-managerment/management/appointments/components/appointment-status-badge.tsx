import { Badge } from "@/shared/components/ui/badge";

import { AppointmentStatus } from "../types/appointment";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800",
  },

  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800",
  },

  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800",
  },
};

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      className={config.className}
    >
      {config.label}
    </Badge>
  );
}