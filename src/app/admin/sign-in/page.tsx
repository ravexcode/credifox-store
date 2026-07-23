"use client";

import Input from "@/components/ui/forms/input";
import DefaultLayout from "@/layouts/default";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState } from "react";

import { signIn } from "@/code/client/auth.client";

export default function SignIn() {
  const router = useRouter();

  const [ tag, setTag ] = useState("");
  const [ pass, setPass ] = useState("");

  const [ loading, isLoading ] = useState(false);

  const handleSubmit = async(e: React.SubmitEvent) => {
    e.preventDefault();

    isLoading(true);
    const token = await signIn({
      tag,
      password: pass
    });

    if(!token) return isLoading(false);

    //token is res.data

    return router.push("/dasboard");
  }
  
  return (
    <DefaultLayout>
      <form
      className="rounded-xs border border-neutral-200/80 p-4 flex flex-col w-full max-w-100 my-10 mx-auto h-max animate-fade-in-up"
      onSubmit={async (e) => { await handleSubmit(e) }}>
        <Image
        src="/expanded.svg"
        alt="Credifox logo"
        width={250}
        height={250}
        className="aspect-square block w-25 mx-auto" />

        <p
        className="text-2xl font-medium tracking-wide mb-5 text-center">
          Inicia sesion
        </p>

        <Input
        label="Ingresa tu tag de usuario"
        value={tag}
        onChange={(e) => { setTag(e.target.value) }}
        placeholder="ex. jhondoe"
        width="w-full"
        bgColor="bg-neutral-100/50"
        message="El tag de usuario no tiene espacios y esta en minusculas"
        spaceBottom
        name="tag"
        isRequired />

        <Input
        label="Ingresa tu contraseña"
        type="password"
        value={pass}
        onChange={(e) => { setPass(e.target.value) }}
        placeholder="ex. safepass1234"
        width="w-full"
        bgColor="bg-neutral-100/50"
        spaceBottom
        name="password"
        isRequired />

        <button
        className="w-full rounded-sm bg-orange-500 duration-400 cursor-pointer hover:bg-orange-700 text-white p-2 font-medium mt-5 disabled:grayscale disabled:hover:bg-orange-500 disabled:cursor-wait"
        type="submit"
        disabled={loading}>
          Iniciar sesion
        </button>
        <p
        className="w-full text-center mt-2 text-sm text-neutral-500">
          * Significa que es de caracter obligatorio
        </p>
      </form>
    </DefaultLayout>
  )
}