import type Product from "@/types/products";

import Image from "next/image";
import Link from "next/link";

import genPrice from "@/utils/price-gen";

type Props = {
  data: Product
}

export default function ProductCard(props: Props) {
  const product = props.data;

  return (
    <section
    className="w-70 flex flex-col gap-2 items-center justify-center p-2">
      <div
      className="w-full flex items-center justify-center relative">
        <Image
        src={product.images_url[0]}
        alt={product.name + " image"}
        width={250}
        height={250}
        loading="lazy"
        className="rounded-md aspect-square w-full block border border-neutral-200" />

        <span
        className="absolute top-2 right-4 scale-90 text-xs rounded-full border border-neutral-300 bg-zinc-50 text-neutral-950 py-1 w-25 text-center font-medium">
          {product.type.slice(0,1).toUpperCase() + product.type.slice(1, product.type.length)}
        </span>
      </div>

      <p
      className="text-xl font-medium w-full text-start">
        {product.name}
      </p>

      <p
      className="text-xl font-bold text-start w-full">
        ${genPrice(product.cost)} MXN
      </p>

      <Link
      href={`/products/${product.id}`}
      className="w-full rounded-full mt-2 text-zinc-50 bg-orange-500 p-2 text-center font-bold duration-200 hover:bg-orange-600" >
        Explorar
      </Link>
    </section>
  )
}