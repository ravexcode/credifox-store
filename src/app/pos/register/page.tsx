"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconPlus, IconTrash } from "@tabler/icons-react";

type TransactionType = "venta" | "compra";

interface Transaction {
  id: number;
  product: string;
  quantity: number;
  unitPrice: number;
  extra: string;
  extraCost: number;
  tax: number;
  type: TransactionType;
}

const exampleTransactions: Transaction[] = [
  { id: 1, product: "Aceite motor 5W30", quantity: 10, unitPrice: 185, extra: "gasolina", extraCost: 50, tax: 16, type: "compra" },
  { id: 2, product: "Filtro de aceite", quantity: 25, unitPrice: 45, extra: "transporte", extraCost: 120, tax: 16, type: "compra" },
  { id: 3, product: "Aceite motor 5W30", quantity: 5, unitPrice: 280, extra: "gasolina", extraCost: 30, tax: 16, type: "venta" },
  { id: 4, product: "Filtro de aire", quantity: 8, unitPrice: 95, extra: "transporte", extraCost: 40, tax: 16, type: "venta" },
];

export default function RegisterPage() {
  const [transactions] = useState<Transaction[]>(exampleTransactions);
  const [filter, setFilter] = useState<TransactionType | "all">("all");

  const filtered = filter === "all" ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Registro de Movimientos</h1>
        <div className="flex gap-1 bg-white border border-gray-200 rounded-md p-1">
          {(["all", "venta", "compra"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 text-sm rounded-sm transition-colors capitalize",
                filter === f ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {f === "all" ? "Todos" : f === "venta" ? "Ventas" : "Compras"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Producto</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Cant.</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">P. Unitario</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Extra</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Costo Extra</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Impuesto</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const subtotal = t.quantity * t.unitPrice;
                const taxAmount = subtotal * (t.tax / 100);
                const total = subtotal + t.extraCost + taxAmount;
                return (
                  <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          t.type === "venta" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {t.type === "venta" ? "Venta" : "Compra"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{t.product}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{t.quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${t.unitPrice}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{t.extra}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${t.extraCost}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{t.tax}%</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">${total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Resumen</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Ventas</p>
            <p className="text-lg font-bold text-green-600">
              ${transactions.filter((t) => t.type === "venta").reduce((a, t) => a + t.quantity * t.unitPrice + t.extraCost + t.quantity * t.unitPrice * (t.tax / 100), 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Compras</p>
            <p className="text-lg font-bold text-blue-600">
              ${transactions.filter((t) => t.type === "compra").reduce((a, t) => a + t.quantity * t.unitPrice + t.extraCost + t.quantity * t.unitPrice * (t.tax / 100), 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Gastos Extra</p>
            <p className="text-lg font-bold text-orange-600">
              ${transactions.reduce((a, t) => a + t.extraCost, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Impuestos</p>
            <p className="text-lg font-bold text-gray-700">
              ${transactions.reduce((a, t) => a + t.quantity * t.unitPrice * (t.tax / 100), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
