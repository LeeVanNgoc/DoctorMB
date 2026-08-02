export function DashboardHeader() {
  return (
    <section className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your clinic today.
        </p>
      </div>
    </section>
  );
}