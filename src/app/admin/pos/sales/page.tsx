"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import { getUser } from "@/code/client/user.client";

import { getOrders } from "@/code/client/orders.client";

import User from "@/types/user";
import Order from "@/types/order";

import genPrice from "@/utils/price-gen";

const statusLabel: Record<string, string> = {
  pending: "Pendiente",
  completed: "Completado",
  cancelled: "Cancelado",
};

const paymentLabel: Record<string, string> = {
  unpaid: "Pendiente",
  paid: "Pagado",
};

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ orders, setOrders ] = useState<Order[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const get = async() => {
      const content = await getUser(router);

      setUser(content.data);
    }

    get();
  }, [router]);

  useEffect(() => {
    const init = async() => {
      const res = await getOrders();
      setOrders(res.data || []);
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Ventas
        </h1>

        {loading ? (
          <p className="text-sm text-neutral-500 text-center">Cargando...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center">
            No hay ventas registradas
          </p>
        ) : (
          <div className="flex flex-col gap-4 max-w-250 mx-auto">
            {orders.map(order => (
              <div
              key={order.id}
              className="rounded-xs border border-neutral-200/80 p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {order.items.reduce((acc, i) => acc + i.qty, 0)} producto(s) · {order.items.length} línea(s)
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="rounded-sm border border-neutral-200/80 px-2 py-0.5 text-xs text-neutral-600">
                      {statusLabel[order.status] ?? order.status}
                    </span>
                    <span className="rounded-sm border border-neutral-200/80 px-2 py-0.5 text-xs text-neutral-600">
                      Pago: {paymentLabel[order.payment_status] ?? order.payment_status}
                    </span>
                    <p className="text-lg font-bold">${genPrice(order.total)}</p>
                  </div>
                </div>

                <div className="border-t border-neutral-200/80 mt-3 pt-3 flex flex-col gap-1">
                  {order.items.map(item => (
                    <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 text-sm">
                      <p className="flex-1 truncate">
                        {item.name}
                        {item.variation ? ` · ${item.variation}` : ""}
                        <span className="text-neutral-500"> × {item.qty}</span>
                      </p>
                      <p className="font-medium">${genPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
