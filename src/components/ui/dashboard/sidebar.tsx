"use client";

import type User from "@/types/user";

import Image from "next/image";
import { usePathname } from "next/navigation";

import Option from "./option";

import {
  IconLayout,
  IconDeviceMobile,
  IconDeviceMobileCog
} from "@tabler/icons-react";

interface Props {
  user: User
}

const NAV_ITEMS = [
  { link: "/admin/dashboard", label: "Panel", icon: IconLayout },
  { link: "/admin/create", label: "Crear producto", icon: IconDeviceMobile },
  { link: "/admin/edit", label: "Editar productos", icon: IconDeviceMobileCog },
];

export default function Sidebar(props: Props) {
  const pathname = usePathname();

  const initials = props.user?.name?.slice(0, 2).toUpperCase() ?? "CF";

  return (
    <aside
    className="flex h-screen w-64 shrink-0 flex-col border-r border-zinc-200/80 bg-white px-4 py-6">
      <Image
      src="/large.svg"
      alt="Credifox"
      width={454}
      height={94}
      priority
      className="h-6 w-auto px-1" />

      <nav
      className="mt-10 flex flex-col gap-1">
        <p
        className="mb-2 px-3 text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
          Menú
        </p>
        {NAV_ITEMS.map((item) => (
          <Option
          key={item.link}
          link={item.link}
          active={pathname === item.link}>
            <item.icon
            size={18}
            stroke={1.75} />
            {item.label}
          </Option>
        ))}
      </nav>

      <div
      className="mt-auto flex flex-col gap-3">
        <div
        className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3">
          <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
            {initials}
          </span>
          <div
          className="min-w-0">
            <p
            className="truncate text-sm font-medium text-zinc-800">
              {props.user?.name}
            </p>
            <p
            className="truncate text-xs text-zinc-400">
              {props.user?.tag}
            </p>
          </div>
        </div>

        <p
        className="px-2 text-center text-[11px] text-zinc-400">
          Versión {process.env.NEXT_PUBLIC_CURRENT_VERSION ?? "en desarrollo"}
        </p>
      </div>
    </aside>
  )
}
