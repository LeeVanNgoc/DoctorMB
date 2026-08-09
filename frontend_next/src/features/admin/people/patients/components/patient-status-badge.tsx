import { Badge } from "@/shared/components/ui/badge";

import { PatientStatus } from "../types/patient";

interface PatientStatusBadgeProps {
  status: PatientStatus;
}

export function PatientStatusBadge({
  status,
}: PatientStatusBadgeProps) {
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