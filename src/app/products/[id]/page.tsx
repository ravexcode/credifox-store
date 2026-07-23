"use client";

import { IconArrowLeft, IconInfoCircle, IconInfoSquareRounded } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getProduct } from "@/code/client/products.client";

import type Product from "@/types/products";
import genPrice from "@/utils/price-gen";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ product, setProduct ] = useState<Product>();

  const [ selected, updateSelected ] = useState(0);

  useEffect(() => {
    async function get() {
      const data = await getProduct(id as string);

      if(!data) return router.push("/");

      setProduct(data.data);
      
      return;
    }

    get();
  }, []);

  return (
    !product ? <div></div>
    :
    <div
    className="min-h-screen h-max p-5">
      <Link
      href={"/"}
      className="w-40 gap-1 flex items-center justify-center hover:bg-neutral-200 border border-neutral-200 p-1.5 rounded-full duration-300" >
        <IconArrowLeft
        stroke={1.5}
        size={20} />
        Regresar
      </Link>

      <section
      className="flex md:flex-row flex-col gap-5 md:gap-10 p-10">
        <div
        className="max-w-150 w-full">
          <Image
          src={product.images_url[0]}
          alt="Product image"
          width={1000}
          height={1000}
          loading="eager"
          preload
          className="rounded-md border border-neutral-300 aspect-square" />

          <div
          className="w-full flex gap-1 justify-center items-center mt-5">
            {
              product.images_url.map((_, i) =>
                <span
                key={i}
                className={"block rounded-full w-4 aspect-square border border-neutral-400 cursor-pointer " + ( selected === i && "bg-neutral-400" )}
                onClick={() => {
                  if(selected === i) return;

                  updateSelected(i);

                  return;
                }} />
              )
            }
          </div>
        </div>

        <div
        className="w-full flex flex-col justify-start items-start">
          <p
          className="text-5xl font-extrabold">
            {product.name} <br />
          </p>
          <p
          className="text-4xl font-medium">
            ${genPrice(product.cost)} MXN
            <span
            className="text-gray-900 font-normal text-base ml-2">
              De contado
            </span>
          </p>
          {
            product.values.phone_values && product.values.phone_values.credit_price ?
            <p
            className="text-4xl font-medium">
              ${genPrice(product.values.phone_values.credit_price)} MXN
              <span
              className="text-gray-900 font-normal text-base ml-2">
                Credito
              </span>
            </p> : 
            <p
            className="text-gray-900 font-normal text-base flex gap-1 items-center justify-center my-2">
              <IconInfoCircle
              size={17} />

              No disponible a credito
            </p>
          }
          
        </div>
      </section>
    </div>
  )
}