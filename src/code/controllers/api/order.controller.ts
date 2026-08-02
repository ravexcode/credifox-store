type CreateData = {
  token: string;
  items: OrderItemInput[];
}

type GetByIdData = {
  token: string;
  id: string;
}

type OrderReturn = {
  message: string;
  order?: OrderWithItems | null;
  error?: string;
  status: number;
}

type OrdersReturn = {
  message: string;
  orders?: OrderWithItems[];
  error?: string;
  status: number;
}

type AuthVerify = {
  message: string;
  user?: { id: string };
  error?: string;
  status: number;
}

import { verifyAuth } from "@/code/repository/api/auth";
import { type OrderItemInput, type OrderWithItems, createOrder, getOrdersByUser, getOrderById } from "@/code/repository/api/order";

export async function createOrderController(data: CreateData): Promise<OrderReturn> {
  const verify = await verifyAuth(data.token) as AuthVerify;

  if(verify.status >= 205) return verify;

  const total = data.items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const order = await createOrder(verify.user!.id, total, data.items);

  return {
    message: "Order created",
    order,
    status: 201
  }
}

export async function getOrdersController(token: string): Promise<OrdersReturn> {
  const verify = await verifyAuth(token) as AuthVerify;

  if(verify.status >= 205) return verify;

  const orders = await getOrdersByUser(verify.user!.id);

  return {
    message: "Orders retrieved",
    orders,
    status: 200
  }
}

export async function getOrderByIdController(data: GetByIdData): Promise<OrderReturn> {
  const verify = await verifyAuth(data.token) as AuthVerify;

  if(verify.status >= 205) return verify;

  const order = await getOrderById(data.id, verify.user!.id);

  if(!order) {
    return {
      message: "Order not found",
      error: "Not found",
      status: 404
    }
  }

  return {
    message: "Order retrieved",
    order,
    status: 200
  }
}
