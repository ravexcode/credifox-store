import { NextRequest } from "next/server"
import { headers } from "next/headers"

import Response from "@/utils/responses";

import { 
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "@services/api/product.service";

type CreateData = {
  req: NextRequest;
}

type GetByIdData = {
  id: string;
}

type UpdateData = {
  req: NextRequest;
  id: string;
}

type DeleteData = {
  id: string;
}

export async function createProduct(data: CreateData) {
  const token = (await headers()).get("Authorization")?.replace(" Bearer", " ");

  if(!token) return new Response().notProvided();

  return await createProductService({
    token,
    req: data.req
  });
}

export async function getProducts() {
  const data =  await getProductsService();

  return data
}

export async function getProductById(data: GetByIdData) {
  return await getProductByIdService({
    id: data.id
  });
}

export async function updateProduct(data: UpdateData) {
  const token = (await headers()).get("Authorization")?.replace(" Bearer", " ");

  if(!token) return new Response().notProvided();

  return await updateProductService({
    token,
    req: data.req,
    id: data.id
  });
}

export async function deleteProduct(data: DeleteData) {
  const token = (await headers()).get("Authorization")?.replace(" Bearer", " ");

  if(!token) return new Response().notProvided();

  return await deleteProductService({
    token,
    id: data.id
  });
}