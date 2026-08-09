import Link from "next/link";

import { CUSTOMER_NAVIGATION } from "../constants/navigation";

export function CustomerNavigation() {
  return (
    <nav className="flex items-center gap-6">
      {CUSTOMER_NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}