"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import PosNav from "@/components/ui/pos/nav";

import { getStoraged } from "@/code/client/storaged.client";

import { getUser } from "@/code/client/user.client";

import { getOrders } from "@/code/client/orders.client";

import User from "@/types/user";

import Storaged from "@/types/storaged";

import Order from "@/types/order";

import genPrice from "@/utils/price-gen";

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ items, setItems ] = useState<Storaged[]>([]);
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
      const [ s, o ] = await Promise.all([ getStoraged(), getOrders() ]);

      setItems(s.data || []);
      setOrders(o.data || []);
      setLoading(false);
    };
    init();
  }, []);

  const totalValue = items.reduce((acc, i) => acc + (i.stock ?? 0) * i.price, 0);
  const outOfStock = items.filter(i => (i.stock ?? 0) === 0).length;
  const totalSold = orders.reduce((acc, o) => acc + o.total, 0);
  const unitsSold = orders.reduce((acc, o) =>
    acc + o.items.reduce((a, i) => a + i.qty, 0), 0
  );

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Punto de Venta
        </h1>

        <PosNav />

        {loading ? (
          <p className="text-sm text-neutral-500 text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-200 mx-auto">
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Productos</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Valor en inventario</p>
              <p className="text-2xl font-bold">${genPrice(totalValue)}</p>
            </div>
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Sin stock</p>
              <p className="text-2xl font-bold">{outOfStock}</p>
            </div>
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Ventas registradas</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Productos vendidos</p>
              <p className="text-2xl font-bold">{unitsSold}</p>
            </div>
            <div className="rounded-xs border border-neutral-200/80 p-4 text-center">
              <p className="text-sm text-neutral-500">Total vendido</p>
              <p className="text-2xl font-bold">${genPrice(totalSold)}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
