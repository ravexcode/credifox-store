import { redirect } from "next/navigation";

import { SessionCacheManager } from "@/code/services/session.service";

export default async function Products() {
  const token = SessionCacheManager.get();

  if(!token) return redirect("/admin/login");

  redirect("/admin/dashboard");
}