import { CustomerFooter } from "@/features/customers/shared/components/customer-footer";
import { CustomerHeader } from "@/features/customers/shared/components/customer-header";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-full flex-col">
      <CustomerHeader />

      <main className="flex-1">
        {children}
      </main>

      <CustomerFooter />
    </div>
  );
}