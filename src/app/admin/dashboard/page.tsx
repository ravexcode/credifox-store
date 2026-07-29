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
  }, []);

  return (
    <AdminLayout
    user={user!}>
      
    </AdminLayout>
  )
}