import { Badge } from "@/shared/components/ui/badge";

import type { DoctorProfileStatus } from "../types";

interface DoctorProfileStatusBadgeProps {
  status: DoctorProfileStatus;
}

const PROFILE_STATUS_LABELS: Record<
  DoctorProfileStatus,
  string
> = {
  complete: "Complete",
  incomplete: "Incomplete",
};

export function DoctorProfileStatusBadge({
  status,
}: DoctorProfileStatusBadgeProps) {
  return (
    <Badge       variant={
        status === "complete"
          ? "default"
          : "secondary"
      }>
      {PROFILE_STATUS_LABELS[status]}
    </Badge>
  );
}