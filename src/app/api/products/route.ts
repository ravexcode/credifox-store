import type { NextRequest } from "next/server";

import { catchError } from "@/utils/catch-error";

import { 
  getProducts,
  createProduct,
} from "@/code/modules/api/product.module";

export async function POST(req: NextRequest){
  try {
    return await createProduct({ req });
  } catch (e) {
    return catchError(e);
  }
}

export async function GET(req: NextRequest) {
  try {
    return await getProducts();
  } catch (e) {
    return catchError(e);
  }
}