export function CustomerHome() {
  return (
    <div className="space-y-12">
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Your Health, Our Priority
          </h1>

          <p className="text-lg text-muted-foreground">
            Find doctors, book appointments, and buy medicines
            easily with DoctorM.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Find Doctor
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Search doctors and book your appointment.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Buy Medicine
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse medicines and place your order.
          </p>
        </div>
      </section>
    </div>
  );
}