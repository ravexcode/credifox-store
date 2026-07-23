import { signInController } from "@/code/controllers/api/auth.controller";

import Response from "@/utils/responses";

import { NextRequest } from "next/server";

import { z } from "zod";

export async function signInService(req: NextRequest) {
  const content = await req.json();

  const schema = z.object({
    tag: z.string().min(5).max(20),
    password: z.string().min(8).max(30)
  });

  const valid = schema.parse(content);

  if(!valid) return new Response().badRequest();

  const res = await signInController(content);

  if(res.status >= 205) return new Response(res.message, res.error, res.status).errorRes();

  return new Response(res.message, undefined, res.status).ok(res.data);
}