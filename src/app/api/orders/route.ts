import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import {
  createOrder,
  getOrders,
} from "@/code/modules/api/order.module";

export async function POST(req: NextRequest) {
  try {
    return await createOrder({ req });
  } catch (e) {
    return catchError(e);
  }
}

export async function GET() {
  try {
    return await getOrders();
  } catch (e) {
    return catchError(e);
  }
}
