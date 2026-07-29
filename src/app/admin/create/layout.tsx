import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credifox - Crear Producto"
}

export default function Layout(
  { children }:
  { children: React.ReactNode }
) {
  return children;
}
