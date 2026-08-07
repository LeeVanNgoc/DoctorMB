export function CustomerFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          DoctorM
        </p>

        <p>
          Healthcare platform for appointments and medicines.
        </p>

        <p>
          © {new Date().getFullYear()} DoctorM. All rights reserved.
        </p>
      </div>
    </footer>
  );
}