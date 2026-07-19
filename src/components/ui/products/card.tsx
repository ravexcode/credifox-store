import type Product from "@/types/products";

import { IconEye } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";

import genPrice from "@/utils/price-gen";

type Props = {
  data: Product
}

export default function ProductCard(props: Props) {
  return (
    <div
    className="max-w-80 w-full h-100 border mix-blend-multiply border-neutral-200 bg-white hover:brightness-90 duration-200 rounded-sm flex flex-col items-center justify-start p-5 cursor-pointer">
      <p
      className="text-xs text-neutral-400 w-full text-end">
        ID: {props.data.id}
      </p>

      <Image
      src={props.data.images_url[0]}
      alt={props.data.name}
      width={250}
      height={250}
      loading="lazy"
      className="rounded-md" />
      
      <p
      className="text-lg font-medium mt-5 w-full text-start">
        {props.data.name}
      </p>

      <p
      className="text-2xl tracking-wide font-bold w-full text-start mt-auto">
        ${genPrice(props.data.cost)} MXN
      </p>
    </div>
  )
}