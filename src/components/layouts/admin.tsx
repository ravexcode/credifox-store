import type User from "@/types/user";
import type { ReactNode } from "react";

import Sidebar from "../ui/dashboard/sidebar";

interface Props {
  user: User,
  children?: ReactNode;
}

export default function AdminLayout(props: Props) {
  return (
    <div
    className="w-full grid grid-cols-[auto_1fr] justify-center items-center">
      <Sidebar
      user={props.user} />

      {props.children}
    </div>
  )
}