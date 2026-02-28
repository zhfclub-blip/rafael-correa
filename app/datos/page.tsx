import obrasData from "@/data/obras.json";

export default function DatosPage() {
  const obras = obrasData.obras;

  // Calcular totales para el resumen
  const totalPresupuesto = obras.reduce((sum, o) => sum + o.presupuesto, 0);
  const totalGastado = obras.reduce((sum, o) => sum + o.gastado, 0);

  // Agrupar por tipo
  const porTipo: Record<string, { presupuesto: number; gastado: number }> = {};
  obras.forEach((o) => {
    if (!porTipo[o.tipo]) {
      porTipo[o.tipo] = { presupuesto: 0, gastado: 0 };
    }
    porTipo[o.tipo].presupuesto += o.presupuesto;
    porTipo[o.tipo].gastado += o.gastado;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
        Datos y visualizaciones
      </h1>
      <p className="text-gray-600 mb-12">
        Gráficos de presupuesto, gasto e inversión por sector.
      </p>

      {/* Placeholder de gráficos */}
      <div className="mb-12 h-64 rounded-card bg-gray-100 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 font-medium">
          Aquí irán los gráficos interactivos (Recharts)
        </p>
      </div>

      {/* Resumen numérico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
          <h3 className="font-titulo font-semibold text-lg mb-4">
            Totales generales
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Presupuesto total</p>
              <p className="text-2xl font-bold text-accento">
                ${(totalPresupuesto / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gastado total</p>
              <p className="text-2xl font-bold">
                ${(totalGastado / 1000000000).toFixed(2)}B
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
          <h3 className="font-titulo font-semibold text-lg mb-4">
            Por tipo de obra
          </h3>
          <div className="space-y-3">
            {Object.entries(porTipo).map(([tipo, datos]) => (
              <div key={tipo} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{tipo}</span>
                <span className="font-medium">
                  ${(datos.gastado / 1000000).toFixed(0)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de obras */}
      <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
        <h3 className="font-titulo font-semibold text-lg p-6 border-b border-gray-100">
          Detalle por obra
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Obra
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Tipo
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Presupuesto
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Gastado
                </th>
              </tr>
            </thead>
            <tbody>
              {obras.map((obra) => (
                <tr
                  key={obra.id}
                  className="border-t border-gray-100 hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4 font-medium">{obra.nombre}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {obra.tipo}
                  </td>
                  <td className="px-6 py-4">
                    ${(obra.presupuesto / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    ${(obra.gastado / 1000000).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
