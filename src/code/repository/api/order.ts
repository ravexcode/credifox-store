export type OrderItemInput = {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  variation?: string | null;
  image_url?: string | null;
}

import prisma from "@/lib/prisma";

import type { OrderModel } from "@/generated/prisma/models/Order";
import type { OrderItemModel } from "@/generated/prisma/models/OrderItem";

export type OrderWithItems = OrderModel & { items: OrderItemModel[] };

export async function createOrder(userId: string, total: number, items: OrderItemInput[]) {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        user_id: userId,
        total,
        items: {
          create: items
        }
      },
      include: {
        items: true
      }
    });

    for(const item of items) {
      if(!item.product_id) continue;

      await tx.storaged.updateMany({
        where: {
          id: item.product_id,
          stock: { not: null }
        },
        data: {
          stock: { decrement: item.qty }
        }
      });
    }

    return order;
  });
}

export async function getOrdersByUser(userId: string) {
  return await prisma.order.findMany({
    where: { user_id: userId },
    include: {
      items: true
    },
    orderBy: {
      created_at: "desc"
    }
  });
}

export async function getOrderById(id: string, userId: string) {
  return await prisma.order.findFirst({
    where: { id, user_id: userId },
    include: {
      items: true
    }
  });
}
