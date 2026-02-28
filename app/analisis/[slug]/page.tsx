import Link from "next/link";
import { notFound } from "next/navigation";
import analisisData from "@/data/analisis.json";
import AnalisisTabs from "@/components/analisis/AnalisisTabs";

type Tema = {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  excerpt: string;
  resumen: { titulo: string; puntos: string[] };
  tablaPropuesta: {
    titulo: string;
    columnas: string[];
    filas: string[][];
    nota: string;
  } | null;
  queDeciaPrensa: { cita: string; fuente: string }[];
  comparativaInternacional: { pais: string; tasaMax: number }[];
  conclusion: string;
  documentos: { titulo: string; tipo: string; url: string }[];
};

const temas = analisisData.temas as Tema[];
const categorias = analisisData.categorias as { id: string; label: string }[];

export function generateStaticParams() {
  return temas.map((t) => ({ slug: t.slug }));
}

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split("-");
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return `${d} ${meses[parseInt(m, 10) - 1]} ${y}`;
}

export default function AnalisisDetallePage({
  params,
}: {
  params: { slug: string };
}) {
  const tema = temas.find((t) => t.slug === params.slug);
  if (!tema) notFound();

  const catLabel = categorias.find((c) => c.id === tema.categoria)?.label ?? tema.categoria;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Miga de pan">
        <Link href="/" className="hover:text-accento">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/analisis" className="hover:text-accento">Análisis y Contexto</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 truncate max-w-[200px] inline-block align-bottom" title={tema.titulo}>
          {tema.titulo.length > 45 ? tema.titulo.slice(0, 45) + "…" : tema.titulo}
        </span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
        {/* Columna principal */}
        <div>
          <h1 className="font-titulo font-bold text-2xl sm:text-3xl text-texto mb-4">
            {tema.titulo}
          </h1>

          <AnalisisTabs tema={tema} />
        </div>

        {/* Sidebar */}
        <aside className="lg:pl-4 space-y-6">
          <div className="rounded-card border border-gray-200 bg-gray-50/50 p-4">
            <p className="text-xs text-gray-500 mb-1">Categoría</p>
            <p className="font-medium text-texto">{catLabel}</p>
            <p className="text-xs text-gray-500 mt-3">Publicado el {formatFecha(tema.fecha)}</p>
          </div>

          {/* Qué decía la prensa */}
          <div className="rounded-card border border-red-100 bg-red-50/50 p-4">
            <h3 className="font-titulo font-semibold text-lg text-texto mb-3">
              ¿Qué decía la prensa?
            </h3>
            <ul className="space-y-3">
              {tema.queDeciaPrensa.map((item, i) => (
                <li key={i} className="text-sm">
                  <p className="text-gray-700 italic">&ldquo;{item.cita}&rdquo;</p>
                  <p className="text-gray-500 text-xs mt-0.5">— {item.fuente}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparativa internacional */}
          {tema.comparativaInternacional.length > 0 && (
            <div className="rounded-card border border-gray-200 bg-white p-4">
              <h3 className="font-titulo font-semibold text-lg text-texto mb-3">
                Comparativa internacional
              </h3>
              <div className="space-y-2">
                {tema.comparativaInternacional.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700">{item.pais}</span>
                    <span className="font-medium text-accento">{item.tasaMax}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tasas máximas de referencia (impuesto o ratio según el tema).
              </p>
            </div>
          )}

        </aside>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link
          href="/analisis"
          className="inline-flex items-center gap-1 text-accento font-medium hover:underline"
        >
          ← Volver a Análisis y Contexto
        </Link>
      </div>
    </div>
  );
}
