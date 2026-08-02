import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import {
  getStoraged,
  createStoraged,
} from "@/code/modules/api/storaged.module";

export async function POST(req: NextRequest){
  try {
    return await createStoraged({ req });
  } catch (e) {
    return catchError(e);
  }
}

export async function GET(req: NextRequest) {
  try {
    return await getStoraged();
  } catch (e) {
    return catchError(e);
  }
}
