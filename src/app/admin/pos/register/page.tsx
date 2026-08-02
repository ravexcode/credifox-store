"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import PosNav from "@/components/ui/pos/nav";

import { getStoraged } from "@/code/client/storaged.client";

import { getProducts } from "@/code/client/products.client";

import { getUser } from "@/code/client/user.client";

import { createOrder } from "@/code/client/orders.client";

import User from "@/types/user";

import Storaged from "@/types/storaged";

import Product from "@/types/products";

import genPrice from "@/utils/price-gen";

type Source = "storaged" | "product";

type CartItem = {
  id: string;
  source: Source;
  name: string;
  price: number;
  qty: number;
  variation: string;
  image_url: string | null;
}

const keyOf = (id: string, variation: string) => id + "::" + variation;

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ source, setSource ] = useState<Source>("storaged");
  const [ storaged, setStoraged ] = useState<Storaged[]>([]);
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ cart, setCart ] = useState<CartItem[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ checking, setChecking ] = useState(false);
  const [ success, setSuccess ] = useState("");
  const [ error, setError ] = useState("");
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    const get = async() => {
      const content = await getUser(router);

      setUser(content.data);
    }

    get();
  }, [router]);

  useEffect(() => {
    const init = async() => {
      const [ s, p ] = await Promise.all([ getStoraged(), getProducts() ]);

      setStoraged(s.data || []);
      setProducts(p.data || []);
      setLoading(false);
    };
    init();
  }, []);

  const refreshStoraged = async() => {
    const res = await getStoraged();
    setStoraged(res.data || []);
  };

  const filteredStoraged = useMemo(() => {
    const q = search.trim().toLowerCase();
    if(!q) return storaged;
    return storaged.filter(i => i.name.toLowerCase().includes(q));
  }, [search, storaged]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if(!q) return products;
    return products.filter(i => i.name.toLowerCase().includes(q));
  }, [search, products]);

  const add = (item: Omit<CartItem, "qty">, qty = 1) => {
    setCart(prev => {
      const found = prev.find(c =>
        keyOf(c.id, c.variation) === keyOf(item.id, item.variation)
      );

      const nextQty = (found?.qty ?? 0) + qty;
      const capped = item.source === "storaged"
        ? Math.min(nextQty, storaged.find(s => s.id === item.id)?.stock ?? nextQty)
        : nextQty;

      if(found) {
        return prev.map(c =>
          keyOf(c.id, c.variation) === keyOf(item.id, item.variation)
            ? { ...c, qty: capped }
            : c
        );
      }

      return [...prev, { ...item, qty: capped }];
    });
  };

  const addStoraged = (p: Storaged) => {
    if(p.stock !== null && p.stock <= 0) return;

    add({
      id: p.id,
      source: "storaged",
      name: p.name,
      price: p.price,
      variation: "",
      image_url: p.image_url ?? null,
    });
  };

  const addProduct = (p: Product, variation: string) => {
    add({
      id: p.id,
      source: "product",
      name: p.name,
      price: p.cost,
      variation,
      image_url: p.images_url[0] ?? null,
    });
  };

  const setQty = (id: string, variation: string, qty: number) => {
    setCart(prev =>
      qty <= 0
        ? prev.filter(c => keyOf(c.id, c.variation) !== keyOf(id, variation))
        : prev.map(c => {
            if(keyOf(c.id, c.variation) !== keyOf(id, variation)) return c;

            if(c.source === "storaged") {
              const stored = storaged.find(s => s.id === c.id);
              const max = stored?.stock ?? Infinity;

              return { ...c, qty: Math.min(qty, max) };
            }

            return { ...c, qty };
          })
    );
  };

  const remove = (id: string, variation: string) => {
    setCart(prev =>
      prev.filter(c => keyOf(c.id, c.variation) !== keyOf(id, variation))
    );
  };

  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);

  const checkout = async() => {
    if(cart.length === 0) return;

    setChecking(true);
    setError("");
    setSuccess("");

    const payload = cart.map(c => ({
      product_id: c.id,
      name: c.name,
      price: c.price,
      qty: c.qty,
      variation: c.variation === "" ? null : c.variation,
      image_url: c.image_url,
    }));

    try {
      const res = await createOrder(payload);

      if(res.error || !res.data) {
        setError(res.message || "Error al registrar la venta");
        return;
      }

      setCart([]);
      setSuccess(`Venta registrada correctamente. Total: $${genPrice(res.data.total)}`);
      await refreshStoraged();
    } catch {
      setError("Error de red");
    } finally {
      setChecking(false);
    }
  };

  const tabClass = (active: boolean) =>
    "px-4 py-2 rounded-sm text-sm font-medium cursor-pointer duration-200 " +
    (active
      ? "bg-orange-500 text-white"
      : "border border-neutral-200/80 text-neutral-600 hover:border-orange-500 hover:text-orange-600");

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6">
        <div>
          <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
            Registro de venta
          </h1>

          <PosNav />

          {error && (
            <p className="text-sm text-red-600 mb-3 text-center">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mb-3 text-center">{success}</p>
          )}

          <div className="flex gap-2 mb-4">
            <button
            type="button"
            onClick={() => setSource("storaged")}
            className={tabClass(source === "storaged")}>
              Almacén
            </button>
            <button
            type="button"
            onClick={() => setSource("product")}
            className={tabClass(source === "product")}>
              Catálogo
            </button>
          </div>

          <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full mb-4 bg-neutral-100/50" />

          {loading ? (
            <p className="text-sm text-neutral-500">Cargando...</p>
          ) : source === "storaged" ? (
            filteredStoraged.length === 0 ? (
              <p className="text-sm text-neutral-500">No hay productos</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-170 overflow-y-auto pr-1">
                {filteredStoraged.map(p => (
                  <button
                  key={p.id}
                  type="button"
                  onClick={() => addStoraged(p)}
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
            )
          ) : (
            filteredProducts.length === 0 ? (
              <p className="text-sm text-neutral-500">No hay productos</p>
            ) : (
              <div className="flex flex-col gap-3 max-h-170 overflow-y-auto pr-1">
                {filteredProducts.map(p => (
                  <div
                  key={p.id}
                  className="rounded-xs border border-neutral-200/80 p-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-sm font-bold text-orange-600">${genPrice(p.cost)}</p>
                    </div>

                    {p.variations.length > 0 ? (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {p.variations.map(v => (
                          <button
                          key={v}
                          type="button"
                          onClick={() => addProduct(p, v)}
                          className="rounded-sm border border-neutral-300 px-2.5 py-1 text-xs cursor-pointer duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-500">
                            {v}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                      type="button"
                      onClick={() => addProduct(p, "")}
                      className="mt-2 w-full rounded-sm bg-orange-500 text-white text-xs font-medium py-1.5 cursor-pointer duration-200 hover:bg-orange-700">
                        Agregar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <aside className="rounded-xs border border-neutral-200/80 p-4 sticky top-0 lg:h-170 flex flex-col">
          <p className="text-sm font-medium mb-3">Venta actual</p>

          {cart.length === 0 ? (
            <p className="text-sm text-neutral-500">Selecciona productos</p>
          ) : (
            <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
              {cart.map(c => (
                <div
                key={keyOf(c.id, c.variation)}
                className="flex items-center gap-2 justify-between text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{c.name}</p>
                    {c.variation && (
                      <p className="text-xs text-neutral-500 truncate">{c.variation}</p>
                    )}
                  </div>
                  <input
                  type="number"
                  min={1}
                  value={c.qty}
                  onChange={(e) => setQty(c.id, c.variation, Number(e.target.value))}
                  className="w-14 rounded-sm py-1 px-2 outline-none border focus:border-orange-600 bg-neutral-100/50 text-center" />
                  <p className="w-20 text-right font-medium">${genPrice(c.price * c.qty)}</p>
                  <button
                  type="button"
                  onClick={() => remove(c.id, c.variation)}
                  className="text-neutral-400 duration-200 cursor-pointer hover:text-red-600">
                    ✕
                  </button>
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
            disabled={cart.length === 0 || checking}
            className="w-full rounded-sm bg-orange-500 duration-400 cursor-pointer hover:bg-orange-700 text-white p-2 font-medium mt-3 disabled:grayscale disabled:cursor-wait">
              {checking ? "Registrando..." : "Cobrar"}
            </button>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}
