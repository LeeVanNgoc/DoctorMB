export interface CustomerNavigationItem {
  title: string;
  href: string;
}

export const CUSTOMER_NAVIGATION: CustomerNavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Find Doctor",
    href: "/doctors",
  },
  {
    title: "Medicines",
    href: "/medicines",
  },
];