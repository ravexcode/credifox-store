import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const linkClass = "hover:text-orange-500 duration-200 hover:underline";
  const topClass = "font-medium mb-1";
  const containerClass = "flex flex-col gap-1 md:text-start text-zinc-50 text-xs md:w-max w-full text-center"

  return (
    <footer
    className="w-full bg-neutral-950 p-3 pb-5 flex flex-col items-center justify-center gap-5 animate-fade-in animate-duration-300">
      <p
      className="w-full text-center text-xs text-neutral-300">
        Credifox - Productos a buena calidad con buen precio
      </p>

      <div
      className="w-full flex flex-col md:flex-row gap-5 md:gap-10 flex-wrap tracking-wide items-center md:items-start justify-center cursor-default px-10 md:px-20">

        <Image
        src="/large_white.svg"
        alt="Credifox white logo"
        width={1200}
        height={500}
        loading="lazy"
        className="w-25 md:mr-auto" />

        <div
        className={containerClass}>
          <p
          className={topClass}>
            Nosotros
          </p>
          <Link
          href="/#ubicacion"
          className={linkClass}>
            Encuentranos
          </Link>
          <Link
          href="/acerca-de/#nosotros"
          className={linkClass}>
            Conocenos
          </Link>
        </div>

        <div
        className={containerClass}>
          <p
          className={topClass}>
            Productos
          </p>
          <Link
          href="/#ofertas"
          className={linkClass}>
            En oferta
          </Link>
          <Link
          href="/#telefonos"
          className={linkClass}>
            Dispositivos moviles
          </Link>
        </div>

        <div
        className={containerClass}>
          <p
          className={topClass}>
            Creditos
          </p>
          <Link
          href="/creditos"
          className={linkClass}>
            Acerca de
          </Link>
          <Link
          href="/creditos/#requisitos"
          className={linkClass}>
            Requisitos
          </Link>
          <Link
          href="/creditos/#proveedores"
          className={linkClass}>
            Proveedores
          </Link>
        </div>

      </div>
    </footer>
  )
}