import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credifox - Punto de Venta"
}

export default function Layout(
  { children }:
  { children: React.ReactNode }
) {
  return children;
}
