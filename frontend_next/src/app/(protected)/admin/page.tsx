import { ADMIN_MODULES } from "@/features/admin/constants/admin-modules";
import { ModuleCard } from "@/shared/components/common/module-card";

export default function AdminPortalPage() {
  return (
    <main className="container mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          DoctorM
        </h1>

        <h2 className="mt-3 text-2xl font-semibold">
          Admin Portal
        </h2>

        <p className="mt-2 text-muted-foreground">
          Select a module to manage the system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ADMIN_MODULES.map((module) => (
          <ModuleCard
            key={module.href}
            module={module}
          />
        ))}
      </div>
    </main>
  );
}