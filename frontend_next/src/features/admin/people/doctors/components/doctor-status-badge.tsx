import { Badge } from "@/shared/components/ui/badge";

import { DoctorStatus } from "../types";

interface DoctorStatusBadgeProps {
  status: DoctorStatus;
}

const STATUS_LABELS: Record<DoctorStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};

export function DoctorStatusBadge({
  status,
}: DoctorStatusBadgeProps) {
  return (
    <Badge
      variant={
        status === "active"
          ? "default"
          : "secondary"
      }
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}