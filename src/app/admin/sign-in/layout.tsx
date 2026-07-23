import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credifox - Inicia sesion"
}

export default function Layout(
  { children }:
  { children: React.ReactNode }
) {
  return children;
}