"use client";

import Image from "next/image";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [tag, setTag] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 flex flex-col gap-6"
      >
        <div className="flex justify-center">
          <Image
            src="/expanded.svg"
            alt="Credifox logo"
            width={200}
            height={80}
            priority
            className="w-40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tag" className="text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            id="tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
