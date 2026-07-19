"use client";

import DefaultLayout from "@/layouts/default";

import Skeleton from "@/components/ui/skeleton";
import ProductCard from "@/components/ui/products/card";

import Product from "@/types/products";

import { getProducts } from "@/code/client/products.client";

import { useState, useEffect } from "react";

import { IconFileSad } from '@tabler/icons-react';

export default function Page() {
  const [ loading, isLoading ] = useState(true);
  const [ products, setProducts ] = useState<Product []>();

  useEffect(() => {
    async function get() {
      const res = await getProducts();
      
      setProducts(res.data);
      isLoading(false);
    }

    get();
  }, []);

  return (
    <DefaultLayout>
      {
        loading ? 
        <Skeleton /> :
        <main>
          {
            products && products.length > 0 ?
            <section
            className="w-full sm:grid flex flex-col sm:grid-cols-3 xl:grid-cols-5 gap-10 items-center justify-center p-10">
              {
                products.map(product =>
                  <ProductCard
                  key={product.id}
                  data={product} />
                )
              }
            </section> :

            <section
            className="w-full h-full flex flex-col items-center gap-4 justify-center p-10 text-center opacity-80 cursor-default select-none">
              <div
              className="flex gap-5 items-center justify-center">
                <IconFileSad
                size={60}
                stroke={1} />
                
                <p
                className="text-4xl border-l-2 border-neutral-950 pl-5">
                  502
                </p>
              </div>
              <p
              className="text-xl font-light tracking-wide max-w-120">
                Lo sentimos, no encontramos productos disponibles en este momento.
              </p>
            </section>
          }
        </main>
      }
    </DefaultLayout>
  )
}