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
    href: "/customer/doctors",
  },
  {
    title: "Medicines",
    href: "/customer/medicines",
  },
];