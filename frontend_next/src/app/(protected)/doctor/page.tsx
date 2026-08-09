import { ModuleCard } from "@/shared/components/common/module-card";

import { DOCTOR_MODULES } from "@/features/doctor/constants/doctor-modules";

export default function DoctorPortalPage() {
  return (
    <main className="container mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-primary">
          DoctorM
        </span>

        <h2 className="mt-3 text-2xl font-semibold">
          Doctor Portal
        </h2>

        <p className="mt-2 text-muted-foreground">
          Select a module to begin your work.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {DOCTOR_MODULES.map((module) => (
          <ModuleCard
            key={module.href}
            module={module}
          />
        ))}
      </div>
    </main>
  );
}