import Link from "next/link";

import type { ReactNode } from "react";

interface Props {
  link: string;
  children?: ReactNode;
  className?: string;
}

export default function Option(props: Props) {
  return (
    <Link
    href={props.link}
    className={`w-[90%] rounded-sm p-2 px-3 flex gap-1 items-center font-medium hover:bg-orange-400 text-zinc-50 ${props.className}`}>
      {props.children}
    </Link>
  )
}