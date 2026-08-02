import type Product from "@/types/products";

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

import genPrice from "@/utils/price-gen";

type Props = {
  data: Product
}

export default function ProductCard({ data: product }: Props) {
  const phone = product.values.phone_values;
  const isPhone = !!phone;
  const hasCredit = isPhone && !!phone?.has_credit && !!phone.credit_price;

  return (
    <Link
    href={`/products/${product.id}`}
    className="group w-70 flex flex-col rounded-2xl border border-border bg-card overflow-hidden duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div
      className="relative aspect-square w-full overflow-hidden bg-muted/40">
        <Image
        src={product.images_url[0]}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 50vw, 20vw"
        loading="lazy"
        className="object-contain p-5 duration-500 group-hover:scale-105" />

        <span
        className="absolute top-3 left-3 rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
          {product.type}
        </span>
      </div>

      <div
      className="flex flex-col gap-2 p-4">
        <p
        className="truncate text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {product.values.brand}
          {product.values.model ? ` · ${product.values.model}` : ""}
        </p>

        <h3
        className="truncate text-base font-semibold leading-snug text-foreground">
          {product.name}
        </h3>

        <div
        className="flex items-baseline gap-2 pt-2">
          {
            hasCredit ?
            <p
            className="text-xl font-bold text-foreground">
              Desde
              <span
              className="ml-1 text-sm font-medium text-muted-foreground">
                $
              </span>
              {genPrice(phone!.credit_price! * 0.1)}
              <span
              className="ml-1 text-sm font-medium text-muted-foreground">
                MXN
              </span>
            </p> :
            isPhone ?
            <p
            className="text-sm font-medium text-muted-foreground">
              No disponible a crédito
            </p> :
            <p
            className="text-xl font-bold text-foreground">
              <span
              className="text-sm font-medium text-muted-foreground">
                $
              </span>
              {genPrice(product.cost)}
              <span
              className="ml-1 text-sm font-medium text-muted-foreground">
                MXN
              </span>
            </p>
          }
        </div>

        <span
        className="flex items-center justify-center gap-2 rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-orange-600">
          Explorar
          <IconArrowRight
          size={16}
          stroke={2}
          className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
