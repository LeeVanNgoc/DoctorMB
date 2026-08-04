import { AdminLayout } from "@/layouts/admin/admin-layout";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout module="medicines">
      {children}
    </AdminLayout>
  );
}