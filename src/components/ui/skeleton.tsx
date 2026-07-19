import { memo } from "react";

function ProductSkeleton() {
  return (
    <div className="max-w-80 w-full h-100 bg-neutral-200 rounded-md"/>
  )
}

function Skeleton() {
  const products = [ "", "", "", "", "", "", "", "", "", "" ];

  return(
    <div
    className="w-full h-full flex flex-col items-center justify-start p-10 animate-pulse animate-duration-1000 gap-10 -z-1">
      <div className="w-full h-100 rounded-sm bg-neutral-200 hidden sm:block" />

      <div
      className="w-full sm:grid flex flex-col sm:grid-cols-3 xl:grid-cols-5 gap-10 items-center justify-center sm:px-10">
        {
          products.map((_, index) =>
            <ProductSkeleton
            key={index} />
          )
        }
      </div>
    </div>
  )
}

export default memo(Skeleton);