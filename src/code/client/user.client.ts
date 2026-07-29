import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { SessionManagerClient } from "../services/client.service";

export async function getUser(router: AppRouterInstance) {
  const token = SessionManagerClient.get();

  if(!token || token.length < 1) router.push("/admin/sign-in");

  console.log(token);
  console.log(typeof token);  

  const res = await fetch("/api/users/get", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token as string
    },
  });

  const data = await res.json();

  return data;
}
