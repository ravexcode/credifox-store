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