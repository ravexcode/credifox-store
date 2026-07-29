"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";
import Input from "@/components/ui/forms/input";
import ProductCard from "@/components/ui/products/card";
import { getUser } from "@/code/client/user.client";

import User from "@/types/user";
import Product, { type Values } from "@/types/products";

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
  const [ modelSlugs, setModelSlugs ] = useState<string[]>([""]);

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

  const slugFor = (i: number) => modelSlugs[i] ?? "";
  const setSlug = (i: number, val: string) =>
    setModelSlugs(prev => { const c = [...prev]; c[i] = val; return c; });
  const addSlug = () => setModelSlugs(prev => [...prev, ""]);
  const removeSlug = (i: number) =>
    setModelSlugs(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      name: form.values.brand + " " + (form.name || form.values.model),
      cost: form.cost * 100,
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
      // name syncs with model above
      setModelSlugs([""]);
      setShowPhone(false);
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  const previewProduct: Product = {
    id: "preview",
    name: form.values.brand + " " + form.name || form.values.brand + form.values.model || "Modelo del producto",
    type: form.type || "Tipo",
    variations: form.variations.filter(Boolean),
    cost: (form.cost || 100) * 100,
    values: form.values,
    images_url: form.images_url.filter(Boolean),
  };

  const templates: Record<string, Partial<FormData>> = {
    Motorola: {
      type: "Celulares",
      variations: ["128GB", "256GB", "512GB"],
      values: { brand: "Motorola", model: "" }
    },
    Samsung: {
      type: "Celulares",
      variations: ["128GB", "256GB", "512GB"],
      values: { brand: "Samsung", model: "" }
    },
    Oppo: {
      type: "Celulares",
      variations: ["128GB", "256GB"],
      values: { brand: "Oppo", model: "" }
    },
    Honor: {
      type: "Celulares",
      variations: ["128GB", "256GB", "512GB"],
      values: { brand: "Honor", model: "" }
    },
  };

  const loadTemplate = (brand: string) => {
    const t = templates[brand];
    if(!t) return;
    setForm(prev => ({
      ...prev,
      name: "",
      type: t.type ?? prev.type,
      variations: t.variations ?? prev.variations,
      values: { ...prev.values, ...t.values },
    }));
  };

  const inputClass = (val: string) => ({
    value: val,
    width: "w-full",
    bgColor: "bg-neutral-100/50",
    spaceBottom: true,
  });

  return (
    <AdminLayout user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Crear Producto
        </h1>

        <p className="text-sm text-neutral-500 mb-6 -mt-4 text-center">
          Llena los datos del producto para publicarlo en la tienda
        </p>

        <div className="flex gap-8 items-start justify-center w-full px-10">
          <form
          onSubmit={handleSubmit}
          className="rounded-xs border border-neutral-200/80 p-4 max-w-150 w-full">
            {error && (
              <p className="text-sm text-red-600 mb-3">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 mb-3">{success}</p>
            )}

            <p className="text-xs text-neutral-500 mb-2">Plantillas rápidas:</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {Object.keys(templates).map(b => (
                <button
                key={b}
                type="button"
                onClick={() => loadTemplate(b)}
                className="rounded-sm border border-neutral-300 px-3 py-1.5 text-sm cursor-pointer hover:bg-orange-500 hover:text-white hover:border-orange-500 duration-200">
                  {b}
                </button>
              ))}
            </div>


            <p className="text-sm font-medium mt-4 mb-3 border-t border-neutral-200/80 pt-3">
              Información del producto
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
              message="Este será el nombre del producto"
              name="model"
              spaceBottom={false}
              onChange={(e) => {
                valuesField("model")(e.target.value);
                field("name")(e.target.value);
              }} />
            </div>

            <Input
            label="Categoría"
            placeholder="ej. Celulares"
            {...inputClass(form.type)}
            message="Ej: Celulares, Tablets, Audífonos"
            isRequired
            name="type"
            onChange={(e) => field("type")(e.target.value)} />

            <Input
            label="Precio"
            placeholder="ej. 150"
            type="number"
            {...inputClass(String(form.cost))}
            message="Precio en pesos mexicanos, ej: 150 = $150 MXN"
            isRequired
            name="cost"
            onChange={(e) => field("cost")(Number(e.target.value))} />

            <p className="text-sm font-medium mt-4 mb-1">Versiones del producto *</p>
            <p className="text-xs text-neutral-500 mb-2">
              Las diferentes capacidades o tallas, ej: 128GB, 256GB, 512GB
            </p>
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
              + Agregar versión
            </button>

            <p className="text-sm font-medium mt-4 mb-1">Fotos del producto *</p>
            <p className="text-xs text-neutral-500 mb-2">
              Pega el enlace de cada foto o usa el botón "Obtener imagen" para buscarla automáticamente
            </p>
            {form.images_url.map((url, i) => (
              <div key={i} className="mb-3">
                <div className="flex gap-2 items-center">
                  <input
                  className="rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full bg-neutral-100/50"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={url}
                  onChange={(e) => images.set(i, e.target.value)}
                  required />
                  {form.images_url.length > 1 && (
                    <button
                    type="button"
                    onClick={() => { images.remove(i); removeSlug(i); }}
                    className="text-red-500 text-sm cursor-pointer shrink-0">
                      Eliminar
                    </button>
                  )}
                </div>
                <input
                className="rounded-sm py-1.5 px-3 outline-none duration-400 border focus:border-orange-600 w-full bg-neutral-100/50 text-neutral-800 mt-1"
                placeholder="Escribe el modelo para buscar la imagen, ej: samsung-galaxy-a17"
                value={slugFor(i)}
                onChange={(e) => setSlug(i, e.target.value)} />
                <button
                type="button"
                onClick={() => {
                  const slug = slugFor(i) || (
                    form.values.brand.toLowerCase().trim() +
                    "-" + form.values.model.toLowerCase().replace(/\s+/g, "-").trim()
                  ).replace(/^-|-$/g, "");
                  if(slug) images.set(i, `https://fdn2.gsmarena.com/vv/bigpic/${slug}.jpg`);
                }}
                className="text-orange-600 text-sm cursor-pointer mt-1 ml-1 font-medium">
                  Obtener imagen
                </button>
              </div>
            ))}
            <button
            type="button"
            onClick={() => { images.add(); addSlug(); }}
            className="text-orange-600 text-sm cursor-pointer mb-3">
              + Agregar otra foto
            </button>

            <button
            type="button"
            onClick={() => setShowPhone(prev => !prev)}
            className="text-orange-600 text-sm cursor-pointer mt-2 mb-3 flex items-center gap-1">
              {showPhone ? "−" : "+"} Especificaciones del teléfono
            </button>

            {showPhone && (
              <div className="rounded-xs border border-neutral-200/80 p-4 mb-4">
                <p className="text-sm font-medium mb-1">Especificaciones del teléfono</p>
                <p className="text-xs text-neutral-500 mb-4">
                  Estos datos se mostrarán en la página del producto
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input label="Memoria RAM" placeholder="ej. 8GB" {...inputClass(form.values.phone_values?.RAM ?? "")} name="RAM" onChange={(e) => phoneField("RAM")(e.target.value)} />
                    <p className="text-xs text-neutral-400 -mt-2">Capacidad de memoria</p>
                  </div>
                  <div>
                    <Input label="Almacenamiento" placeholder="ej. 256GB" {...inputClass(form.values.phone_values?.ROM ?? "")} name="ROM" onChange={(e) => phoneField("ROM")(e.target.value)} />
                    <p className="text-xs text-neutral-400 -mt-2">Espacio interno</p>
                  </div>
                  <Input label="Procesador" placeholder="ej. A16" {...inputClass(form.values.phone_values?.processador ?? "")} name="processador" onChange={(e) => phoneField("processador")(e.target.value)} />
                  <Input label="Velocidad (GHz)" type="number" placeholder="ej. 3.2" {...inputClass(String(form.values.phone_values?.GHZ ?? ""))} name="GHZ" onChange={(e) => phoneField("GHZ")(Number(e.target.value))} />
                  <Input label="Red móvil (G)" type="number" placeholder="ej. 5" {...inputClass(String(form.values.phone_values?.G ?? ""))} name="G" onChange={(e) => phoneField("G")(Number(e.target.value))} />
                  <Input label="Cámara (MP)" type="number" placeholder="ej. 48" {...inputClass(String(form.values.phone_values?.cam_mpx ?? ""))} name="cam_mpx" onChange={(e) => phoneField("cam_mpx")(Number(e.target.value))} />
                  <Input label="Batería (mAh)" type="number" placeholder="ej. 5000" {...inputClass(String(form.values.phone_values?.batery ?? ""))} name="batery" onChange={(e) => phoneField("batery")(Number(e.target.value))} />
                  <div>
                    <Input label="Carga rápida (W)" type="number" placeholder="ej. 25" {...inputClass(String(form.values.phone_values?.charge_speed ?? ""))} name="charge_speed" onChange={(e) => phoneField("charge_speed")(Number(e.target.value))} />
                    <p className="text-xs text-neutral-400 -mt-2">Watts de carga</p>
                  </div>
                  <Input label="Sistema operativo" placeholder="ej. iOS 18" {...inputClass(form.values.phone_values?.OS ?? "")} name="OS" onChange={(e) => phoneField("OS")(e.target.value)} />
                  <Input label="Frecuencia pantalla (Hz)" type="number" placeholder="ej. 120" {...inputClass(String(form.values.phone_values?.screen?.hz ?? ""))} name="screen_hz" onChange={(e) => screenField("hz")(Number(e.target.value))} />
                  <Input label="Tamaño pantalla" placeholder="ej. 6.1 pulgadas" {...inputClass(form.values.phone_values?.screen?.dimensions ?? "")} name="screen_dimensions" onChange={(e) => screenField("dimensions")(e.target.value)} />
                  <div className="flex flex-col mb-3">
                    <label className="text-sm">Tipo de pantalla</label>
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

                <div className="flex items-center gap-2 mt-3">
                  <input
                  type="checkbox"
                  id="has_credit"
                  className="accent-orange-600"
                  checked={form.values.phone_values?.has_credit ?? false}
                  onChange={(e) => phoneField("has_credit")(e.target.checked)} />
                  <label htmlFor="has_credit" className="text-sm cursor-pointer">
                    Disponible a crédito
                  </label>
                </div>

                {form.values.phone_values?.has_credit && (
                  <div className="mt-2 max-w-50">
                    <Input
                    label="Precio a crédito"
                    type="number"
                    placeholder="0"
                    {...inputClass(String(form.values.phone_values?.credit_price ?? ""))}
                    message="Precio en pesos mexicanos (MXN)"
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

          <div className="w-full max-w-150 flex flex-col items-center justify-start h-full">
            <p className="text-sm font-medium mb-3">Vista previa</p>
            {previewProduct.images_url.length > 0 && previewProduct.name !== "Modelo del producto"
              ? <ProductCard data={previewProduct} />
              : <div className="w-70 h-100 rounded-xs border border-dashed border-neutral-300 flex items-center justify-center text-neutral-600 text-sm text-center p-4">
                  Completa los campos obligatorios para ver la vista previa
                </div>}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
