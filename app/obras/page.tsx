import obrasData from "@/data/obras.json";
import Link from "next/link";

export default function ObrasPage() {
  const obras = obrasData.obras;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
        Obras
      </h1>
      <p className="text-gray-600 mb-8">
        Mapa e inventario de obras. (Mapa interactivo próximamente)
      </p>

      {/* Placeholder del mapa */}
      <div className="mb-12 h-80 rounded-card bg-gray-100 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 font-medium">
          Aquí irá el mapa interactivo con marcadores
        </p>
      </div>

      {/* Lista de obras */}
      <div className="space-y-4">
        <h2 className="font-titulo font-semibold text-xl">Listado de obras</h2>
        <div className="grid gap-4">
          {obras.map((obra) => (
            <Link
              key={obra.id}
              href={`/obras/${obra.id}`}
              className="block p-6 rounded-card bg-white shadow-card card-hover border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-titulo font-semibold text-lg text-texto">
                    {obra.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {obra.ubicacion.ciudad} • {obra.tipo}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Presupuesto: ${(obra.presupuesto / 1000000).toFixed(1)}M •
                    Gastado: ${(obra.gastado / 1000000).toFixed(1)}M
                  </p>
                </div>
                <span className="text-accento font-medium text-sm shrink-0">
                  Ver detalles →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
