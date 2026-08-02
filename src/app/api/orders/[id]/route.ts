import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import Response from "@/utils/responses";

import { getOrderById } from "@/code/modules/api/order.module";

type Params = { params: Promise<{ id: string }> }

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    if(!id) {
      return new Response().badRequest();
    }

    return await getOrderById({ id });
  } catch (e) {
    return catchError(e);
  }
}
