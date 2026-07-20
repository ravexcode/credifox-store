"use client";

import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  category: string;
  stock: number;
}

const exampleProducts: Product[] = [
  { id: 1, name: "Aceite motor 5W30", cost: 120, price: 185, category: "Aceites", stock: 45 },
  { id: 2, name: "Filtro de aceite", cost: 28, price: 45, category: "Filtros", stock: 120 },
  { id: 3, name: "Filtro de aire", cost: 55, price: 95, category: "Filtros", stock: 80 },
  { id: 4, name: "Aceite motor 10W40", cost: 95, price: 155, category: "Aceites", stock: 32 },
  { id: 5, name: "Filtro de gasolina", cost: 40, price: 70, category: "Filtros", stock: 65 },
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(exampleProducts);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setName("");
    setCost("");
    setPrice("");
    setCategory("");
    setStock("");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Productos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Crear Producto</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del producto"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Costo</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="$0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Precio de venta</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Categoría"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <IconCheck size={16} /> Guardado
                </>
              ) : (
                "Crear Producto"
              )}
            </button>
          </form>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Productos Existentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Nombre</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Costo</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Precio</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2.5">
                      <p className="text-gray-900 font-medium">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-700">${p.cost}</td>
                    <td className="px-4 py-2.5 text-right text-gray-700">${p.price}</td>
                    <td className="px-4 py-2.5 text-right text-gray-700">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
