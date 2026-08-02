import type User from "@/types/user";

import Image from "next/image";

import Option from "./option";

import {
  IconLayout,
  IconDeviceMobile,
  IconDeviceMobileCog,
  IconUserCircle
} from "@tabler/icons-react";

interface Props {
  user: User
}

export default function Sidebar(props: Props) {
  return (
    <aside
    className="w-64 flex flex-col items-center justify-start pt-5 pb-2 gap-1 h-screen bg-linear-to-b from-orange-600 to-red-800">
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
      link="/admin/create">
        <IconDeviceMobile
        size={20} />
        Crear producto
      </Option>
      <Option
      link="/admin/edit">
        <IconDeviceMobileCog
        size={20} />
        Editar productos
      </Option>
      
      <Option
      link="/admin/profile"
      className="mt-auto mb-2">
        <IconUserCircle
        size={20} />
        Mi perfil
      </Option>
      <p
      className="w-full text-center text-sm text-zinc-50">
        Version: {process.env.NEXT_PUBLIC_CURRENT_VERSION ?? "En desarollo"}
      </p>
    </aside>
  )
}