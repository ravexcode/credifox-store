import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import { getUser } from "@/code/modules/api/user.module";

export async function GET(req: NextRequest) {
  try {
    return await getUser(req);
  } catch (e) {

    console.error(e);
    return catchError(e);
  }
}
