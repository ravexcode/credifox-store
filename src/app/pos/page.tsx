"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

const weekData = [
  { day: "Lun", sells: 12500, costs: 8200 },
  { day: "Mar", sells: 9800, costs: 7100 },
  { day: "Mié", sells: 15200, costs: 9800 },
  { day: "Jue", sells: 11300, costs: 8500 },
  { day: "Vie", sells: 18900, costs: 12100 },
  { day: "Sáb", sells: 22400, costs: 14300 },
  { day: "Dom", sells: 8600, costs: 6200 },
];

const monthData = [
  { day: "Sem 1", sells: 78500, costs: 52100 },
  { day: "Sem 2", sells: 91200, costs: 61400 },
  { day: "Sem 3", sells: 84700, costs: 58900 },
  { day: "Sem 4", sells: 103800, costs: 67200 },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data = period === "week" ? weekData : monthData;
  const maxVal = Math.max(...data.map((d) => Math.max(d.sells, d.costs)));

  const totalSells = data.reduce((a, b) => a + b.sells, 0);
  const totalCosts = data.reduce((a, b) => a + b.costs, 0);
  const revenue = totalSells - totalCosts;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-1 bg-white border border-gray-200 rounded-md p-1">
          <button
            onClick={() => setPeriod("week")}
            className={cn(
              "px-3 py-1 text-sm rounded-sm transition-colors",
              period === "week" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod("month")}
            className={cn(
              "px-3 py-1 text-sm rounded-sm transition-colors",
              period === "month" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Mes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Ventas</p>
          <p className="text-2xl font-bold text-gray-900">${totalSells.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Costos</p>
          <p className="text-2xl font-bold text-gray-900">${totalCosts.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Ganancia</p>
          <div className="flex items-center gap-2">
            <p className={cn("text-2xl font-bold", revenue >= 0 ? "text-green-600" : "text-red-600")}>
              ${revenue.toLocaleString()}
            </p>
            {revenue >= 0 ? (
              <IconTrendingUp size={20} className="text-green-600" />
            ) : (
              <IconTrendingDown size={20} className="text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Ventas vs Costos - {period === "week" ? "Semana" : "Mes"}
        </h2>
        <div className="flex items-end gap-3 h-64">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end justify-center" style={{ height: "220px" }}>
                <div
                  className="w-5 bg-green-500 rounded-t-sm"
                  style={{ height: `${(d.sells / maxVal) * 100}%` }}
                  title={`Ventas: $${d.sells.toLocaleString()}`}
                />
                <div
                  className="w-5 bg-red-400 rounded-t-sm"
                  style={{ height: `${(d.costs / maxVal) * 100}%` }}
                  title={`Costos: $${d.costs.toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-xs text-gray-600">Ventas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-sm" />
            <span className="text-xs text-gray-600">Costos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
