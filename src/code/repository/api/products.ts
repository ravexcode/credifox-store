export type ProductBasic = {
  name: string;
  type: string;
  variations: string [];
  cost: number;
  values: any;
  images_url?: string [];
}

import prisma from "@/lib/prisma";

export async function uploadProduct(data: ProductBasic) {
  const uploaded = await prisma.product.create({
    data
  });

  return uploaded;
}

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  return product;
}

export async function updateProduct(id: string, data: Partial<ProductBasic>) {
  const updated = await prisma.product.update({
    where: { id },
    data
  });
  return updated;
}

export async function deleteProduct(id: string) {
  const deleted = await prisma.product.delete({
    where: { id }
  });
  return deleted;
}