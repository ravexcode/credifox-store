"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin";

import { getUser } from "@/code/client/user.client";

import User from "@/types/user";

export default function Page() {
  const router = useRouter();

  const [ user, setUser ] = useState<User>();

  useEffect(() => {
    const get = async() => {
      const content = await getUser(router);

      setUser(content.data);
    }

    get();
  }, [router]);

  return (
    <AdminLayout
    user={user!}>
      <div className="w-full h-screen overflow-auto p-6 animate-fade-in-up">
        <h1 className="text-3xl font-medium text-center tracking-wide mb-6">
          Configuración
        </h1>
        <p className="text-sm text-neutral-500 text-center">
          Configuración del punto de venta próximamente.
        </p>
      </div>
    </AdminLayout>
  );
}
