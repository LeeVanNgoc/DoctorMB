import { CustomerFooter } from "@/features/customers/components/customer-footer";
import { CustomerHeader } from "@/features/customers/components/customer-header";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({
  children,
}: CustomerLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomerHeader />

      <main className="flex-1">
        {children}
      </main>

      <CustomerFooter />
    </div>
  );
}