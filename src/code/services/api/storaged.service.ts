import {
  createStoragedController,
  getStoragedController,
  getStoragedByIdController,
  updateStoragedController,
  deleteStoragedController
} from "@/code/controllers/api/storaged.controller";

import z from "zod";

import type { NextRequest } from "next/server";

import Response from "@/utils/responses";

type CreateData = {
  token: string;
  req: NextRequest;
}

type GetByIdData = {
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

export async function createStoragedService(data: CreateData) {
  const storaged = await data.req.json();

  const schema = z.object({
    name: z.string().min(1).max(100),
    price: z.number(),
    stock: z.number().int().min(0).nullable().optional(),
    image_url: z.string().url().nullable().optional(),
  });

  const valid = schema.parse(storaged);

  if(!valid) return new Response().badRequest();

  const res = await createStoragedController({
    storaged,
    token: data.token
  });

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.storaged);
}

export async function getStoragedService() {
  const res = await getStoragedController();

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.storaged);
}

export async function getStoragedByIdService(data: GetByIdData) {
  const res = await getStoragedByIdController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  if(res.status === 404) {
    return new Response(res.message, res.error, res.status).notFound();
  }

  return new Response(res.message, undefined, res.status).created(res.storaged);
}

export async function updateStoragedService(data: UpdateData) {
  const storaged = await data.req.json();

  const schema = z.object({
    name: z.string().min(1).max(100).optional(),
    price: z.number().optional(),
    stock: z.number().int().min(0).nullable().optional(),
    image_url: z.string().url().nullable().optional(),
  });

  const valid = schema.parse(storaged);

  if(!valid) return new Response().badRequest();

  const res = await updateStoragedController({
    id: data.id,
    storaged,
    token: data.token
  });

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.storaged);
}

export async function deleteStoragedService(data: DeleteData) {
  const res = await deleteStoragedController(data);

  if(res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).created(res.storaged);
}
