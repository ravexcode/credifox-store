type CreateData = {
  product: ProductBasic;
  token: string;
}

import { verifyAuth } from "@repository/api/auth";
import { type ProductBasic, uploadProduct } from "@repository/api/products";

export async function createProductController(data: CreateData): Promise<{
  message: string;
  product?: ProductBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const product = await uploadProduct(data.product);

  return {
    message: "Product created",
    product,
    status: 201
  }
}