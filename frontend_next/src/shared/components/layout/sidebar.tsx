"use client";

import Link from "next/link";
import { sidebarMenus } from "./sidebar-menu";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={isOpen ? "w-64 border-r px-6 py-6" : "hidden"}>
      <h2>DoctorM</h2>

      <nav>
        <ul className="space-y-2">
          {sidebarMenus.map((menu) => {
            const Icon = menu.icon;

            return (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  <Icon size={18} />
                  <span>{menu.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}