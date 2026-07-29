import type { NextRequest } from "next/server";

import { getToken } from "@/utils/get-token";
import { getUserService } from "@/code/services/api/user.service";
import Response from "@/utils/responses";

export async function getUser(_req: NextRequest) {
  const token = await getToken();

  if (!token) return new Response().notProvided();

  return await getUserService(token);
}
