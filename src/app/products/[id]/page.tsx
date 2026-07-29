"use client";

import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getProduct } from "@/code/client/products.client";

import type Product from "@/types/products";
import genPrice from "@/utils/price-gen";

type SpecRow = { label: string; value: string | number | undefined };

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ product, setProduct ] = useState<Product>();
  const [ selectedImg, setSelectedImg ] = useState(0);
  const [ selectedVar, setSelectedVar ] = useState(0);

  useEffect(() => {
    async function get() {
      const data = await getProduct(id as string);

      if(!data) return router.push("/");

      setProduct(data.data);

      return;
    }

    get();
  }, []);

  if(!product) return <div></div>;

  const phone = product.values.phone_values;
  const screen = phone?.screen;

  const specs: SpecRow[] = [
    { label: "Marca", value: product.values.brand },
    { label: "Modelo", value: product.values.model },
    ...(phone ? [
      { label: "RAM", value: phone.RAM },
      { label: "Almacenamiento", value: phone.ROM },
      { label: "Procesador", value: phone.processador },
      { label: "Velocidad", value: phone.GHZ ? `${phone.GHZ} GHz` : undefined },
      { label: "Red móvil", value: phone.G ? `${phone.G}G` : undefined },
      { label: "Cámara", value: phone.cam_mpx ? `${phone.cam_mpx} MP` : undefined },
      { label: "Batería", value: phone.batery ? `${phone.batery} mAh` : undefined },
      { label: "Carga rápida", value: phone.charge_speed ? `${phone.charge_speed}W` : undefined },
      { label: "Sistema operativo", value: phone.OS },
      ...(screen ? [
        { label: "Pantalla", value: screen.dimensions },
        { label: "Frecuencia", value: screen.hz ? `${screen.hz} Hz` : undefined },
        { label: "Tecnología", value: screen.tech },
      ] : []),
      { label: "Disponible a crédito", value: phone.has_credit ? "Sí" : "No" },
    ] : []),
  ].filter(r => r.value);

  return (
    <div className="min-h-screen h-max p-5">
      <Link
      href={"/"}
      className="w-40 gap-1 flex items-center justify-center hover:bg-neutral-200 border border-neutral-200 p-1.5 rounded-full duration-300" >
        <IconArrowLeft stroke={1.5} size={20} />
        Regresar
      </Link>

      <section className="flex md:flex-row flex-col gap-5 md:gap-10 p-5 md:p-10">
        <div className="max-w-150 w-full">
          <Image
          src={product.images_url[selectedImg] || product.images_url[0]}
          alt={product.name}
          width={2000}
          height={2000}
          loading="eager"
          preload
          className="rounded-md border border-neutral-300 w-max h-full" />

          {product.images_url.length > 1 && (
            <div className="w-full flex gap-2 justify-center items-center mt-5">
              {product.images_url.map((_, i) => (
                <span
                key={i}
                className={"block rounded-full w-3.5 h-3.5 border border-neutral-400 cursor-pointer duration-200 " + ( selectedImg === i ? "bg-neutral-800" : "bg-white" )}
                onClick={() => setSelectedImg(i)} />
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div>
            {(product.values.brand || product.values.model) && (
              <p className="text-sm text-neutral-500 mb-1">
                {product.values.brand} {product.values.model}
              </p>
            )}
            <p className="text-4xl md:text-5xl font-extrabold leading-tight">
              {product.name}
            </p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold">
              ${genPrice(product.cost)} MXN
              <span className="text-neutral-600 font-normal text-base ml-2">
                De contado
              </span>
            </p>
            {phone?.credit_price ? (
              <p className="text-2xl md:text-3xl font-medium mt-1">
                ${genPrice(phone.credit_price)} MXN
                <span className="text-neutral-600 font-normal text-base ml-2">
                  A crédito
                </span>
              </p>
            ) : (
              <p className="text-neutral-500 text-sm flex gap-1 items-center mt-1">
                <IconInfoCircle size={16} />
                No disponible a crédito
              </p>
            )}
          </div>

          {product.variations.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Versiones</p>
              <div className="flex gap-2 flex-wrap">
                {product.variations.map((v, i) => (
                  <button
                  key={i}
                  onClick={() => setSelectedVar(i)}
                  className={"rounded-xs border px-4 py-2 text-sm cursor-pointer duration-200 " + (selectedVar === i ? "border-orange-500 bg-orange-500 text-white" : "border-neutral-300 hover:border-orange-500")}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {specs.length > 0 && (
            <div className="w-full border-t border-neutral-200 pt-4 mt-2">
              <p className="text-lg font-medium mb-3">Especificaciones</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                {specs.map((s, i) => (
                  <div key={i} className="text-sm">
                    <span className="text-neutral-500">{s.label}</span>
                    <p className="font-medium">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}