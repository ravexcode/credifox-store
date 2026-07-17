import { NextRequest } from "next/server"
import { headers } from "next/headers"

import Response from "@/utils/responses";

import { createProductService } from "@services/api/product.service";

type CreateData = {
  req: NextRequest;
}

export async function createProduct(data: CreateData) {
  const token = (await headers()).get("Authorization")?.replace(" Bearer", " ");

  if(!token) return new Response().notProvided();

  return await createProductService({
    token,
    req: data.req
  });
}