"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import { getStoraged } from "@/code/client/storaged.client";

import { getUser } from "@/code/client/user.client";

import User from "@/types/user";

import Storaged from "@/types/storaged";

import genPrice from "@/utils/price-gen";

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ items, setItems ] = useState<Storaged[]>([]);
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
      const res = await getStoraged();
      setItems(res.data || []);
      setLoading(false);
    };
    init();
  }, []);

  const totalValue = items.reduce((acc, i) => acc + (i.stock ?? 0) * i.price, 0);
  const outOfStock = items.filter(i => (i.stock ?? 0) === 0).length;

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Punto de Venta
        </h1>

        {loading ? (
          <p className="text-sm text-neutral-500 text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-200 mx-auto">
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
