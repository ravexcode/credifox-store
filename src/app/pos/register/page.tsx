"use client";

import { useEffect, useMemo, useState } from "react";

import { getStoraged } from "@/code/client/storaged.client";

import Storaged from "@/types/storaged";

import genPrice from "@/utils/price-gen";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function Page() {
  const [ items, setItems ] = useState<Storaged[]>([]);
  const [ cart, setCart ] = useState<CartItem[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    const init = async() => {
      const res = await getStoraged();
      setItems(res.data || []);
      setLoading(false);
    };
    init();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if(!q) return items;
    return items.filter(i => i.name.toLowerCase().includes(q));
  }, [items, search]);

  const add = (p: Storaged) => {
    setCart(prev => {
      const found = prev.find(c => c.id === p.id);
      if(found) {
        return prev.map(c =>
          c.id === p.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const setQty = (id: string, qty: number) => {
    setCart(prev =>
      qty <= 0
        ? prev.filter(c => c.id !== id)
        : prev.map(c => c.id === id ? { ...c, qty } : c)
    );
  };

  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);

  const checkout = () => {
    if(cart.length === 0) return;
    setCart([]);
  };

  return (
    <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6">
      <div>
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Registro de venta
        </h1>

        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar producto..."
        className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full mb-4 bg-neutral-100/50" />

        {loading ? (
          <p className="text-sm text-neutral-500">Cargando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-neutral-500">No hay productos</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-170 overflow-y-auto pr-1">
            {filtered.map(p => (
              <button
              key={p.id}
              type="button"
              onClick={() => add(p)}
              disabled={(p.stock ?? 0) === 0}
              className="rounded-xs border border-neutral-200/80 p-3 text-left cursor-pointer duration-200 hover:border-orange-500 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-sm font-bold text-orange-600">${genPrice(p.price)}</p>
                <p className="text-xs text-neutral-500">
                  {p.stock === null ? "Sin stock definido" : `Stock: ${p.stock}`}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="rounded-xs border border-neutral-200/80 p-4 sticky top-0 lg:h-170 flex flex-col">
        <p className="text-sm font-medium mb-3">Venta actual</p>

        {cart.length === 0 ? (
          <p className="text-sm text-neutral-500">Selecciona productos</p>
        ) : (
          <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
            {cart.map(c => (
              <div key={c.id} className="flex items-center gap-2 justify-between text-sm">
                <p className="flex-1 truncate">{c.name}</p>
                <input
                type="number"
                min={1}
                value={c.qty}
                onChange={(e) => setQty(c.id, Number(e.target.value))}
                className="w-14 rounded-sm py-1 px-2 outline-none border focus:border-orange-600 bg-neutral-100/50 text-center" />
                <p className="w-20 text-right font-medium">${genPrice(c.price * c.qty)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-neutral-200/80 mt-3 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total</p>
            <p className="text-xl font-bold">${genPrice(total)}</p>
          </div>
          <button
          type="button"
          onClick={checkout}
          disabled={cart.length === 0}
          className="w-full rounded-sm bg-orange-500 duration-400 cursor-pointer hover:bg-orange-700 text-white p-2 font-medium mt-3 disabled:grayscale disabled:cursor-wait">
            Cobrar
          </button>
        </div>
      </aside>
    </div>
  );
}
