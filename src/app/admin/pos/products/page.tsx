"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import Input from "@/components/ui/forms/input";

import {
  getStoraged,
  createStoraged,
  updateStoraged,
  deleteStoraged
} from "@/code/client/storaged.client";

import { getUser } from "@/code/client/user.client";

import User from "@/types/user";

import Storaged from "@/types/storaged";

import genPrice from "@/utils/price-gen";

interface FormData {
  name: string;
  price: number;
  stock: string;
  image_url: string;
}

const EMPTY: FormData = { name: "", price: 0, stock: "", image_url: "" };

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ items, setItems ] = useState<Storaged[]>([]);
  const [ selected, setSelected ] = useState<string | null>(null);
  const [ form, setForm ] = useState<FormData>(EMPTY);
  const [ loading, setLoading ] = useState(false);
  const [ fetchLoading, setFetchLoading ] = useState(true);
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [ confirmDelete, setConfirmDelete ] = useState(false);

  const refresh = async() => {
    const res = await getStoraged();
    setItems(res.data || []);
  };

  useEffect(() => {
    const get = async() => {
      const content = await getUser(router);

      setUser(content.data);
    }

    get();
  }, [router]);

  useEffect(() => {
    const init = async() => {
      await refresh();
      setFetchLoading(false);
    };
    init();
  }, []);

  const select = (p: Storaged) => {
    setSelected(p.id);
    setError("");
    setSuccess("");
    setConfirmDelete(false);
    setForm({
      name: p.name,
      price: p.price / 100,
      stock: p.stock === null ? "" : String(p.stock),
      image_url: p.image_url ?? "",
    });
  };

  const reset = () => {
    setSelected(null);
    setForm(EMPTY);
    setConfirmDelete(false);
  };

  const handleSave = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name,
      price: form.price * 100,
      stock: form.stock === "" ? null : Number(form.stock),
      image_url: form.image_url === "" ? null : form.image_url,
    };

    try {
      const res = selected
        ? await updateStoraged(selected, payload)
        : await createStoraged(payload);

      if(res.error) {
        setError(res.message || "Error al guardar");
        return;
      }

      setSuccess(selected ? "Producto actualizado" : "Producto creado");
      reset();
      await refresh();
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    if(!selected) return;
    if(!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await deleteStoraged(selected);

      if(res.error) {
        setError(res.message || "Error al eliminar");
        setConfirmDelete(false);
        return;
      }

      setSuccess("Producto eliminado");
      reset();
      await refresh();
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (val: string | number) => ({
    value: val,
    width: "w-full",
    bgColor: "bg-neutral-100/50",
    spaceBottom: true,
  });

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
      <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
        Productos en almacén
      </h1>

      {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}
      {success && <p className="text-sm text-green-600 mb-3 text-center">{success}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-8 max-w-250 mx-auto">
        <div className="flex flex-col gap-2 max-h-170 overflow-y-auto pr-2">
          <button
          type="button"
          onClick={reset}
          className="text-left w-full rounded-xs border p-3 cursor-pointer duration-200 hover:border-orange-500 border-dashed">
            <p className="text-sm font-medium text-orange-600">+ Nuevo producto</p>
          </button>

          {fetchLoading ? (
            <p className="text-sm text-neutral-500">Cargando...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-neutral-500">No hay productos</p>
          ) : (
            items.map(p => (
              <button
              key={p.id}
              type="button"
              onClick={() => select(p)}
              className={"text-left w-full rounded-xs border p-3 cursor-pointer duration-200 hover:border-orange-500 " + (selected === p.id ? "border-orange-500 bg-orange-50" : "border-neutral-200/80")}>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-neutral-500">
                  ${genPrice(p.price)} — {p.stock === null ? "sin stock" : `stock ${p.stock}`}
                </p>
              </button>
            ))
          )}
        </div>

        <form
        onSubmit={handleSave}
        className="rounded-xs border border-neutral-200/80 p-4 max-w-150 w-full">
          <p className="text-sm font-medium mb-3">
            {selected ? "Editando producto" : "Nuevo producto"}
          </p>

          <Input
          label="Nombre"
          placeholder="ej. iPhone 15 Pro 256GB"
          {...inputClass(form.name)}
          isRequired
          name="name"
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />

          <Input
          label="Precio"
          placeholder="ej. 15000"
          type="number"
          {...inputClass(form.price)}
          message="Precio en pesos mexicanos"
          isRequired
          name="price"
          onChange={(e) => setForm(prev => ({ ...prev, price: Number(e.target.value) }))} />

          <Input
          label="Stock"
          placeholder="ej. 10"
          type="number"
          {...inputClass(form.stock)}
          message="Opcional. Vacío = sin control de stock"
          name="stock"
          onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))} />

          <Input
          label="Imagen (URL)"
          placeholder="https://ejemplo.com/imagen.jpg"
          {...inputClass(form.image_url)}
          name="image_url"
          onChange={(e) => setForm(prev => ({ ...prev, image_url: e.target.value }))} />

          <div className="flex gap-3 mt-4">
            <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-orange-500 duration-400 cursor-pointer hover:bg-orange-700 text-white p-2 font-medium disabled:grayscale disabled:cursor-wait">
              {loading ? "Guardando..." : "Guardar"}
            </button>

            {selected && (
              <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className={"w-full rounded-sm duration-400 cursor-pointer p-2 font-medium disabled:grayscale disabled:cursor-wait " + (confirmDelete ? "bg-red-600 text-white hover:bg-red-700" : "border border-red-500 text-red-600 hover:bg-red-50")}>
                {confirmDelete ? "¿Eliminar?" : "Eliminar"}
              </button>
            )}
          </div>
        </form>
      </div>
      </div>
    </AdminLayout>
  );
}
