import type User from "@/types/user"
import Image from "next/image"

interface Props {
  user: User
}

export default function Sidebar(props: Props) {
  return (
    <aside
    className="w-64 flex flex-col items-center justify-center gap-1">
      <Image
      src="/large_white.svg"
      alt="Logo"
      width={454}
      height={94}
      loading="eager"
      className="w-full " />
    </aside>
  )
}