import { createProductController } from "@controllers/api/products.controller";

import z from "zod";

import type { NextRequest } from "next/server";

import Response from "@/utils/responses";

type CreateData = {
  token: string;
  req: NextRequest;
}

export async function createProductService(data: CreateData) {
  const product = await data.req.json();

  const schema = z.object({
    name: z.string().min(5).max(50),
    type: z.string().min(5).max(30),
    variations: z.array(z.string()).min(1),
    cost: z.number(),
    values: z.any().optional(),
    images_url: z.array(z.string()).min(1),
  });

  const valid = schema.parse(product);

  if(!valid) return new Response().badRequest();

  const res = await createProductController({
    product,
    token: data.token
  });

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.product);
}