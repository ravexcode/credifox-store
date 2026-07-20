import { IconSettings } from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center gap-4 text-center">
        <IconSettings size={48} stroke={1.5} className="text-gray-300" />
        <p className="text-gray-500 text-sm">Próximamente</p>
      </div>
    </div>
  );
}
