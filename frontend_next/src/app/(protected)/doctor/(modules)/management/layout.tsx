import type { ReactNode } from "react";

import { DoctorLayout } from "@/layouts/doctor/doctor-layout";

interface ManagementLayoutProps {
  children: ReactNode;
}

export default function ManagementLayout({
  children,
}: ManagementLayoutProps) {
  return (
    <DoctorLayout>
      {children}
    </DoctorLayout>
  );
}