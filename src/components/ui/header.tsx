import Image from "next/image";
import Link from "next/link";

import { memo } from "react";

function Header() {
  const linkClass = "text-sm hover:text-orange-600 duration-200 hover:underline";

  return (
    <header
    className="w-full p-2 md:p-3 sticky top-0 flex justify-between items-center bg-zinc-50 border-b border-neutral-200/80 z-10">
      <Link
      href="/">
        <Image
        src="/large.svg"
        alt="Credifox logo"
        width={1200}
        height={500}
        loading="eager"
        preload
        className="w-30 cursor-pointer hover:scale-105 duration-200 animate-fade-in-down animate-duration-300" />
      </Link>

      <div className="hidden md:flex items-center justify-center gap-5">
        <Link
        href="/#telefonos"
        className={linkClass}>
          Telefonos
        </Link>

        <Link
        href="/#ofertas"
        className={linkClass}>
          Ofertas
        </Link>

        <Link
        href="/#ubicacion"
        className={linkClass}>
          Ubicacion
        </Link>
      </div>
    </header>
  )
}

export default memo(Header)