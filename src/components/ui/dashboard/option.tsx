import Link from "next/link";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  link: string;
  children?: ReactNode;
  className?: string;
  active?: boolean;
}

export default function Option(props: Props) {
  return (
    <Link
    href={props.link}
    aria-current={props.active ? "page" : undefined}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
      props.active
        ? "bg-orange-100/80 font-semibold text-orange-800"
        : "text-zinc-500 hover:bg-orange-50 hover:text-orange-700",
      props.className
    )}>
      {props.children}
    </Link>
  )
}
