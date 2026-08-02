import { NextRequest } from "next/server"

import { SessionCacheManager } from "@/code/services/session.service";

import Response from "@/utils/responses";

import {
  createOrderService,
  getOrdersService,
  getOrderByIdService
} from "@services/api/order.service";

type CreateData = {
  req: NextRequest;
}

type GetByIdData = {
  id: string;
}

export async function createOrder(data: CreateData) {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await createOrderService({
    token,
    req: data.req
  });
}

export async function getOrders() {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await getOrdersService(token);
}

export async function getOrderById(data: GetByIdData) {
  const token = await SessionCacheManager.get();

  if(!token) return new Response().notProvided();

  return await getOrderByIdService({
    token,
    id: data.id
  });
}
