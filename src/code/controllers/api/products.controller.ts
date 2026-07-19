type CreateData = {
  product: ProductBasic;
  token: string;
}

type GetByIdData = {
  id: string;
  token: string;
}

type UpdateData = {
  id: string;
  product: Partial<ProductBasic>;
  token: string;
}

type DeleteData = {
  id: string;
  token: string;
}

import { verifyAuth } from "@/code/repository/api/auth";
import { type ProductBasic, uploadProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "@/code/repository/api/products";

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

export async function getProductsController(): Promise<{
  message: string;
  products?: any[];
  error?: string;
  status: number;
}> {
  const products = await getAllProducts();

  return {
    message: "Products retrieved",
    products,
    status: 200
  }
}

export async function getProductByIdController(data: GetByIdData): Promise<{
  message: string;
  product?: ProductBasic | null;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const product = await getProductById(data.id);

  if(!product) {
    return {
      message: "Product not found",
      error: "Not found",
      status: 404
    }
  }

  return {
    message: "Product retrieved",
    product,
    status: 200
  }
}

export async function updateProductController(data: UpdateData): Promise<{
  message: string;
  product?: ProductBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const product = await updateProduct(data.id, data.product);

  return {
    message: "Product updated",
    product,
    status: 200
  }
}

export async function deleteProductController(data: DeleteData): Promise<{
  message: string;
  product?: ProductBasic;
  error?: string;
  status: number;
}> {
  const verify = await verifyAuth(data.token);

  if(verify.status >= 205) return verify;

  const product = await deleteProduct(data.id);

  return {
    message: "Product deleted",
    product,
    status: 200
  }
}