import { Badge } from "@/shared/components/ui/badge";

import { DoctorStatus } from "../types";

interface DoctorStatusBadgeProps {
  status: DoctorStatus;
}

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
      {status}
    </Badge>
  );
}