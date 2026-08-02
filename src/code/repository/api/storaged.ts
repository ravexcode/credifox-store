export type StoragedBasic = {
  name: string;
  price: number;
  stock?: number | null;
  image_url?: string | null;
}

import prisma from "@/lib/prisma";

export async function createStoraged(data: StoragedBasic) {
  return await prisma.storaged.create({
    data
  });
}

export async function getAllStoraged() {
  return await prisma.storaged.findMany();
}

export async function getStoragedById(id: string) {
  return await prisma.storaged.findUnique({
    where: { id }
  });
}

export async function updateStoraged(id: string, data: Partial<StoragedBasic>) {
  return await prisma.storaged.update({
    where: { id },
    data
  });
}

export async function deleteStoraged(id: string) {
  return await prisma.storaged.delete({
    where: { id }
  });
}
