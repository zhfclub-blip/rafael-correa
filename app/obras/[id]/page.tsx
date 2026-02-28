import obrasData from "@/data/obras.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ObraDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const obra = obrasData.obras.find((o) => o.id === params.id);

  if (!obra) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/obras"
        className="inline-flex items-center text-gray-600 hover:text-accento mb-6 transition-colors"
      >
        ← Volver a Obras
      </Link>

      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 sm:p-8">
        <h1 className="font-titulo font-bold text-2xl sm:text-3xl text-texto mb-2">
          {obra.nombre}
        </h1>
        <p className="text-gray-500 mb-6">
          {obra.ubicacion.ciudad} • {obra.tipo} • {obra.inicio} - {obra.fin}
        </p>

        {/* Datos financieros */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Presupuesto</p>
            <p className="text-xl font-semibold">
              ${(obra.presupuesto / 1000000).toFixed(2)}M
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gastado</p>
            <p className="text-xl font-semibold">
              ${(obra.gastado / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>

        {/* Problemas */}
        {obra.problemas && obra.problemas.length > 0 && (
          <div className="mb-6">
            <h3 className="font-titulo font-semibold text-lg mb-2">
              Problemas reportados
            </h3>
            <ul className="flex flex-wrap gap-2">
              {obra.problemas.map((p) => (
                <li
                  key={p}
                  className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Descripción placeholder */}
        <p className="text-gray-600">
          Descripción detallada de la obra. (Contenido de ejemplo)
        </p>
      </div>
    </div>
  );
}
