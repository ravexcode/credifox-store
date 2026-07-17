import { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import { signIn } from "@/code/modules/api/auth.module";

export async function POST(req: NextRequest) {
  try {
    return await signIn(req);
  } catch(e) {
    return catchError(e)
  }
}