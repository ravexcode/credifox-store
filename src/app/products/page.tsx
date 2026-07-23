"use client";

import { useRouter } from "next/router"

export default function Return() {
  const router = useRouter();

  router.push("/")

  return (
    <div></div>
  )
}