import type User from "@/types/user";

import Image from "next/image";

import Option from "./option";

import {
  IconLayout,
  IconDeviceMobile
} from "@tabler/icons-react";

interface Props {
  user: User
}

export default function Sidebar(props: Props) {
  return (
    <aside
    className="w-64 flex flex-col items-center justify-start py-5 gap-1 h-full bg-orange-600">
      <Image
      src="/large_white.svg"
      alt="Logo"
      width={454}
      height={94}
      loading="eager"
      preload
      className="h-6 mb-5" />

      <Option
      link="/admin/dashboard">
        <IconLayout
        size={20} />
        Panel
      </Option>
      <Option
      link="/admin/dashboard">
        <IconDeviceMobile
        size={20} />
        Crear producto
      </Option>

      <p
      className="mt-auto w-full text-center text-sm text-zinc-50">
        {process.env.NEXT_PUBLIC_CURRENT_VERSION ?? "En desarollo"}
      </p>
    </aside>
  )
}