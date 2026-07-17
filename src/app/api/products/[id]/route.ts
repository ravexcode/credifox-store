import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import Response from "@/utils/responses";

import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "@modules/api/product.module";

type Params = { params: Promise<{ id: string }> }

export async function GET(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    if(id) {
      return await getProductById({ id });
    }

    return await getProducts();
  } catch (e) {
    return catchError(e);
  }
}

export async function PUT(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    if(!id) {
      return new Response().badRequest();
    }

    return await updateProduct({ req, id });
  } catch (e) {
    return catchError(e);
  }
}

export async function DELETE(
  req: NextRequest,
  { params } : Params
){
  try {
    const { id } = await params;

    if(!id) {
      return new Response().badRequest();
    }

    return await deleteProduct({ id });
  } catch (e) {
    return catchError(e);
  }
}