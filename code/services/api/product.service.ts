import { 
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController
} from "@controllers/api/products.controller";

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

type UpdateData = {
  token: string;
  req: NextRequest;
  id: string;
}

type DeleteData = {
  token: string;
  id: string;
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

export async function getProductsService(data: { token: string }) {
  const res = await getProductsController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.products);
}

export async function getProductByIdService(data: GetByIdData) {
  const res = await getProductByIdController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  if(res.status === 404) {
    return new Response(res.message, res.error, res.status).notFound();
  }

  return new Response(res.message, undefined, res.status).created(res.product);
}

export async function updateProductService(data: UpdateData) {
  const product = await data.req.json();

  const schema = z.object({
    name: z.string().min(5).max(50).optional(),
    type: z.string().min(5).max(30).optional(),
    variations: z.array(z.string()).min(1).optional(),
    cost: z.number().optional(),
    values: z.any().optional(),
    images_url: z.array(z.string()).min(1).optional(),
  });

  const valid = schema.parse(product);

  if(!valid) return new Response().badRequest();

  const res = await updateProductController({
    id: data.id,
    product,
    token: data.token
  });

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.product);
}

export async function deleteProductService(data: DeleteData) {
  const res = await deleteProductController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.product);
}