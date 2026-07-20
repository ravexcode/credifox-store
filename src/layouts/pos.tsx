"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  IconLayoutDashboard,
  IconClipboardList,
  IconPackage,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const navItems = [
  { href: "/pos", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/pos/register", label: "Registro", icon: IconClipboardList },
  { href: "/pos/products", label: "Productos", icon: IconPackage },
  { href: "/pos/settings", label: "Configuración", icon: IconSettings },
];

export default function PosLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-neutral-900 text-white flex flex-col p-4 gap-2 sticky top-0 h-screen">
        <div className="flex justify-center mb-4">
          <Image
            src="/expanded_white.svg"
            alt="Credifox"
            width={160}
            height={60}
            className="w-32"
          />
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = item.href === "/pos" ? pathname === "/pos" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-orange-600 text-white"
                    : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors mt-auto"
        >
          <IconLogout size={18} />
          Salir
        </Link>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
