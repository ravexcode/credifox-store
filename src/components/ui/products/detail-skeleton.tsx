import { memo } from "react";

function DetailSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between animate-pulse animate-duration-1000">
      <main className="w-full flex-col p-5 items-center justify-center">
        <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-5">
          <span className="h-8 w-8 rounded-full bg-muted" />
          <span className="h-3 w-16 rounded-full bg-muted" />
        </div>

        <section className="flex md:flex-row flex-col gap-6 md:gap-10 p-5 md:p-10">
          <div className="max-w-150 w-full">
            <div className="aspect-square w-full rounded-2xl border border-border bg-muted/40" />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col gap-3">
              <div className="h-3 w-40 rounded-full bg-muted" />
              <div className="h-9 w-72 max-w-full rounded-lg bg-muted" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-8 w-52 rounded-lg bg-muted" />
              <div className="h-4 w-64 rounded-full bg-muted" />
            </div>

            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-full bg-muted" />
              <div className="h-9 w-24 rounded-full bg-muted" />
            </div>

            <div className="w-full border-t border-border pt-5 mt-1">
              <div className="h-3 w-36 rounded-full bg-muted mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {[ "", "", "", "", "", "" ].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <span className="h-2.5 w-16 rounded-full bg-muted" />
                    <span className="h-4 w-24 rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default memo(DetailSkeleton);
