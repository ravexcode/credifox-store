"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";
import Input from "@/components/ui/forms/input";
import { getUser } from "@/code/client/user.client";

import User from "@/types/user";
import type { Values } from "@/types/products";

interface FormData {
  name: string;
  type: string;
  cost: number;
  variations: string[];
  images_url: string[];
  values: Values;
}

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [ showPhone, setShowPhone ] = useState(false);

  const [ form, setForm ] = useState<FormData>({
    name: "",
    type: "",
    cost: 0,
    variations: [""],
    images_url: [""],
    values: { brand: "", model: "" },
  });

  useEffect(() => {
    const get = async() => {
      const content = await getUser(router);
      setUser(content.data);
    };
    get();
  }, [router]);

  type Val = string | number | boolean;

  const field = (f: keyof FormData) =>
    (val: Val) => setForm(prev => ({ ...prev, [f]: val }));

  const valuesField = (f: keyof Values) =>
    (val: Val) => setForm(prev => ({
      ...prev,
      values: { ...prev.values, [f]: val }
    }));

  const phoneField = (f: string) =>
    (val: Val) => setForm(prev => ({
      ...prev,
      values: {
        ...prev.values,
        phone_values: { ...prev.values.phone_values, [f]: val } as Values["phone_values"],
      }
    }));

  const screenField = (f: string) =>
    (val: Val) => setForm(prev => ({
      ...prev,
      values: {
        ...prev.values,
        phone_values: {
          ...prev.values.phone_values,
          screen: { ...prev.values.phone_values?.screen, [f]: val },
        } as Values["phone_values"],
      }
    }));

  const arrHandler = (key: "variations" | "images_url") => ({
    add: () => setForm(prev => ({ ...prev, [key]: [...prev[key], ""] })),
    remove: (i: number) => setForm(prev => ({
      ...prev,
      [key]: prev[key].filter((_, idx) => idx !== i)
    })),
    set: (i: number, val: string) => setForm(prev => {
      const copy = [...prev[key]];
      copy[i] = val;
      return { ...prev, [key]: copy };
    }),
  });

  const variations = arrHandler("variations");
  const images = arrHandler("images_url");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      variations: form.variations.filter(Boolean),
      images_url: form.images_url.filter(Boolean),
      values: {
        ...form.values,
        ...(!showPhone || !form.values.phone_values?.RAM
          ? {}
          : { phone_values: form.values.phone_values }),
      },
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if(!res.ok) {
        setError(data.message || data.error || "Error al crear producto");
        return;
      }

      setSuccess("¡Producto creado exitosamente!");

      setForm({
        name: "", type: "", cost: 0,
        variations: [""], images_url: [""],
        values: { brand: "", model: "" },
      });
      setShowPhone(false);
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (val: string) => ({
    value: val,
    width: "w-full",
    bgColor: "bg-neutral-100/50",
    spaceBottom: true,
  });

  return (
    <AdminLayout user={user!}>
      <div className="w-full flex flex-col items-center justify-center p-6 animate-fade-in-up">
        <h1 className="text-2xl font-medium tracking-wide mb-6">
          Crear Producto
        </h1>

        <form
        onSubmit={handleSubmit}
        className="rounded-xs border border-neutral-200/80 p-4 max-w-200">

          {error && (
            <p className="text-sm text-red-600 mb-3">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mb-3">{success}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
            label="Nombre"
            placeholder="Nombre del producto"
            {...inputClass(form.name)}
            isRequired
            name="name"
            onChange={(e) => field("name")(e.target.value)} />

            <Input
            label="Tipo"
            placeholder="Tipo de producto"
            {...inputClass(form.type)}
            isRequired
            name="type"
            onChange={(e) => field("type")(e.target.value)} />
          </div>

          <Input
          label="Costo"
          placeholder="0"
          type="number"
          {...inputClass(String(form.cost))}
          isRequired
          name="cost"
          onChange={(e) => field("cost")(Number(e.target.value))} />

          <p className="text-sm font-medium mt-4 mb-1">Variaciones *</p>
          {form.variations.map((v, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
              className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full bg-neutral-100/50"
              placeholder="ej. 128GB"
              value={v}
              onChange={(e) => variations.set(i, e.target.value)}
              required />
              {form.variations.length > 1 && (
                <button
                type="button"
                onClick={() => variations.remove(i)}
                className="text-red-500 text-sm cursor-pointer shrink-0">
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button
          type="button"
          onClick={variations.add}
          className="text-orange-600 text-sm cursor-pointer mb-3">
            + Agregar variación
          </button>

          <p className="text-sm font-medium mt-4 mb-1">URLs de imágenes *</p>
          {form.images_url.map((url, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
              className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full bg-neutral-100/50"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={url}
              onChange={(e) => images.set(i, e.target.value)}
              required />
              {form.images_url.length > 1 && (
                <button
                type="button"
                onClick={() => images.remove(i)}
                className="text-red-500 text-sm cursor-pointer shrink-0">
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button
          type="button"
          onClick={images.add}
          className="text-orange-600 text-sm cursor-pointer mb-3">
            + Agregar imagen
          </button>

          <p className="text-sm font-medium mt-4 mb-3 border-t border-neutral-200/80 pt-3">
            Valores
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Input
            label="Marca"
            placeholder="ej. Apple"
            {...inputClass(form.values.brand)}
            name="brand"
            onChange={(e) => valuesField("brand")(e.target.value)} />

            <Input
            label="Modelo"
            placeholder="ej. iPhone 15"
            {...inputClass(form.values.model)}
            name="model"
            onChange={(e) => valuesField("model")(e.target.value)} />
          </div>

          <button
          type="button"
          onClick={() => setShowPhone(prev => !prev)}
          className="text-orange-600 text-sm cursor-pointer mt-2 mb-3 flex items-center gap-1">
            {showPhone ? "−" : "+"} Valores de teléfono
          </button>

          {showPhone && (
            <div className="rounded-xs border border-neutral-200/80 p-3 mb-4">
              <p className="text-sm font-medium mb-3">Especificaciones del teléfono</p>
              <div className="grid grid-cols-3 gap-3">
                <Input label="RAM" placeholder="ex. 8GB" {...inputClass(form.values.phone_values?.RAM ?? "")} name="RAM" onChange={(e) => phoneField("RAM")(e.target.value)} />
                <Input label="ROM" placeholder="ex. 256GB" {...inputClass(form.values.phone_values?.ROM ?? "")} name="ROM" onChange={(e) => phoneField("ROM")(e.target.value)} />
                <Input label="Procesador" placeholder="ej. A16" {...inputClass(form.values.phone_values?.processador ?? "")} name="processador" onChange={(e) => phoneField("processador")(e.target.value)} />
                <Input label="GHZ" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.GHZ ?? ""))} name="GHZ" onChange={(e) => phoneField("GHZ")(Number(e.target.value))} />
                <Input label="G" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.G ?? ""))} name="G" onChange={(e) => phoneField("G")(Number(e.target.value))} />
                <Input label="Cámara MPX" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.cam_mpx ?? ""))} name="cam_mpx" onChange={(e) => phoneField("cam_mpx")(Number(e.target.value))} />
                <Input label="Batería" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.batery ?? ""))} name="batery" onChange={(e) => phoneField("batery")(Number(e.target.value))} />
                <Input label="Velocidad de carga" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.charge_speed ?? ""))} name="charge_speed" onChange={(e) => phoneField("charge_speed")(Number(e.target.value))} />
                <Input label="OS" placeholder="ej. iOS 18" {...inputClass(form.values.phone_values?.OS ?? "")} name="OS" onChange={(e) => phoneField("OS")(e.target.value)} />
                <Input label="Frecuencia pantalla" type="number" placeholder="0" {...inputClass(String(form.values.phone_values?.screen?.hz ?? ""))} name="screen_hz" onChange={(e) => screenField("hz")(Number(e.target.value))} />
                <Input label="Dimensiones pantalla" placeholder="ej. 6.1 pulgadas" {...inputClass(form.values.phone_values?.screen?.dimensions ?? "")} name="screen_dimensions" onChange={(e) => screenField("dimensions")(e.target.value)} />
                <div className="flex flex-col mb-3">
                  <label className="text-sm">Tecnología pantalla</label>
                  <select
                  className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 bg-neutral-100/50 w-full mt-1"
                  value={form.values.phone_values?.screen?.tech ?? ""}
                  onChange={(e) => screenField("tech")(e.target.value)}>
                    <option value="">Seleccionar</option>
                    <option value="OLED">OLED</option>
                    <option value="AMOLED">AMOLED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                type="checkbox"
                id="has_credit"
                className="accent-orange-600"
                checked={form.values.phone_values?.has_credit ?? false}
                onChange={(e) => phoneField("has_credit")(e.target.checked)} />
                <label htmlFor="has_credit" className="text-sm cursor-pointer">
                  Tiene crédito
                </label>
              </div>

              {form.values.phone_values?.has_credit && (
                <div className="mt-2 max-w-50">
                  <Input
                  label="Precio de crédito"
                  type="number"
                  placeholder="0"
                  {...inputClass(String(form.values.phone_values?.credit_price ?? ""))}
                  name="credit_price"
                  onChange={(e) => phoneField("credit_price")(Number(e.target.value))} />
                </div>
              )}
            </div>
          )}

          <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-orange-500 duration-400 cursor-pointer hover:bg-orange-700 text-white p-2 font-medium mt-4 disabled:grayscale disabled:hover:bg-orange-500 disabled:cursor-wait">
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
