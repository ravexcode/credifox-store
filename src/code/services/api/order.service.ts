import {
  createOrderController,
  getOrdersController,
  getOrderByIdController
} from "@/code/controllers/api/order.controller";

import z from "zod";

import type { NextRequest } from "next/server";

import Response from "@/utils/responses";

type CreateData = {
  token: string;
  req: NextRequest;
}

type GetByIdData = {
  token: string;
  id: string;
}

const itemSchema = z.object({
  product_id: z.string().min(1),
  name: z.string().min(1).max(200),
  price: z.number().int().min(0),
  qty: z.number().int().min(1).max(100),
  variation: z.string().max(100).nullable().optional(),
  image_url: z.string().url().nullable().optional(),
});

export async function createOrderService(data: CreateData) {
  const body = await data.req.json();

  const schema = z.object({
    items: z.array(itemSchema).min(1),
  });

  const valid = schema.parse(body);

  if(!valid) return new Response().badRequest();

  const res = await createOrderController({
    token: data.token,
    items: valid.items
  });

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.order);
}

export async function getOrdersService(token: string) {
  const res = await getOrdersController(token);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).ok(res.orders);
}

export async function getOrderByIdService(data: GetByIdData) {
  const res = await getOrderByIdController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  if(res.status === 404) {
    return new Response(res.message, res.error, res.status).notFound();
  }

  return new Response(res.message, undefined, res.status).ok(res.order);
}
