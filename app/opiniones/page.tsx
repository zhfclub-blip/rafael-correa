import opinionesData from "@/data/opiniones.json";

export default function OpinionesPage() {
  const opiniones = opinionesData.opiniones;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
        Opiniones
      </h1>
      <p className="text-gray-600 mb-8">
        Busca la opinión de Correa por tema. (Buscador próximamente)
      </p>

      {/* Placeholder del buscador */}
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por tema (ej: petróleo, Yasuní, economía...)"
            className="w-full px-4 py-3 pl-12 rounded-card border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-accento focus:border-transparent"
            disabled
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Lista de opiniones */}
      <div className="space-y-6">
        {opiniones.map((op) => (
          <div
            key={op.id}
            className="bg-white rounded-card shadow-card border border-gray-100 p-6"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-accento/10 text-accento rounded text-sm font-medium">
                {op.tema}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(op.fecha).toLocaleDateString("es-EC")} • {op.fuente}
              </span>
            </div>
            <p className="text-gray-700 italic">&quot;{op.cita}&quot;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
