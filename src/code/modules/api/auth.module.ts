import { signInService } from "@/code/services/api/auth.service";
import { NextRequest } from "next/server";

export async function signIn(req: NextRequest) {
  return await signInService(req);
}