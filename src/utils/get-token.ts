import { headers } from "next/headers";

export async function getToken(): Promise<string | null> {
  const h = await headers();
  const auth = h.get("Authorization");
  if (!auth) return null;
  return auth.trim();
}
