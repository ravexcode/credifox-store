"use client";

import { IconArrowLeft } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getProduct } from "@/code/client/products.client";

import type Product from "@/types/products";
import genPrice from "@/utils/price-gen";
import Footer from "@/components/ui/footer";
import DetailSkeleton from "@/components/ui/products/detail-skeleton";

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

  if(!product) return <DetailSkeleton />;

  const phone = product.values.phone_values;
  const screen = phone?.screen;
  const isPhone = !!phone;
  const hasCredit = isPhone && !!phone?.has_credit && !!phone.credit_price;

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
    <div className="min-h-screen flex flex-col items-center justify-between">

      <main
      className="w-full flex-col p-5 items-center justify-center">
        <Link
        href={"/"}
        className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-orange-500 hover:shadow-sm">
          <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
            <IconArrowLeft stroke={2} size={16} />
          </span>
          Regresar
        </Link>

        <section className="flex md:flex-row flex-col gap-6 md:gap-10 p-5 md:p-10">
          <div className="max-w-150 w-full">
            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <Image
              src={product.images_url[selectedImg] || product.images_url[0]}
              alt={product.name}
              width={2000}
              height={2000}
              loading="eager"
              preload
              className="rounded-xl object-contain w-full h-auto" />
            </div>

            {product.images_url.length > 1 && (
              <div className="w-full flex gap-2.5 justify-center items-center mt-5">
                {product.images_url.map((_, i) => (
                  <span
                  key={i}
                  className={"block rounded-full w-3 h-3 border cursor-pointer duration-200 " + ( selectedImg === i ? "border-orange-500 bg-orange-500" : "border-border bg-muted/40 hover:border-orange-400" )}
                  onClick={() => setSelectedImg(i)} />
                ))}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <div>
              {(product.values.brand || product.values.model) && (
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                  {product.values.brand} {product.values.model}
                </p>
              )}
              <p className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
                {product.name}
              </p>
            </div>

            <div>
              {
                isPhone ?
                hasCredit ?
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  Desde
                  <span className="text-lg font-medium text-muted-foreground ml-1">
                    $
                  </span>
                  {genPrice(phone!.credit_price! * 0.1)}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    MXN · A crédito
                  </span>
                </p> :
                <p className="text-base font-medium text-muted-foreground">
                  No disponible a crédito
                </p> :
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="text-lg font-medium text-muted-foreground">
                    $
                  </span>
                  {genPrice(product.cost)}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    MXN · De contado
                  </span>
                </p>
              }
            </div>

            {product.variations.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                  Versiones
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variations.map((v, i) => (
                    <button
                    key={i}
                    onClick={() => setSelectedVar(i)}
                    className={"rounded-full border px-4 py-2 text-sm font-medium cursor-pointer duration-200 " + (selectedVar === i ? "border-orange-500 bg-orange-500 text-white" : "border-border bg-card text-foreground hover:border-orange-500 hover:text-orange-600")}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {specs.length > 0 && (
              <div className="w-full border-t border-border pt-5 mt-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Especificaciones
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                  {specs.map((s, i) => (
                    <div key={i} className="text-sm">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {s.label}
                      </span>
                      <p className="font-semibold text-foreground mt-0.5">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
