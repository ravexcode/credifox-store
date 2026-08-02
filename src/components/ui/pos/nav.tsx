"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/pos", label: "Dashboard" },
  { href: "/admin/pos/register", label: "Registro" },
  { href: "/admin/pos/products", label: "Productos" },
  { href: "/admin/pos/sales", label: "Ventas" },
  { href: "/admin/pos/settings", label: "Configuración" },
];

export default function PosNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {NAV_ITEMS.map(item => {
        const active = item.href === "/admin/pos"
          ? pathname === "/admin/pos"
          : pathname.startsWith(item.href);

        return (
          <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 rounded-sm text-sm font-medium duration-200",
            active
              ? "bg-orange-500 text-white"
              : "border border-neutral-200/80 text-neutral-600 hover:border-orange-500 hover:text-orange-600"
          )}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
