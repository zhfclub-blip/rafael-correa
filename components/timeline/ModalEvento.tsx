"use client";

import Link from "next/link";

export type EventoTimeline = {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  tipo?: string;
  imagen?: string;
  /** URLs de noticias, artículos o documentos que documentan el evento */
  fuentes?: string[];
  /** ID de obra relacionada (en /obras) para enlazar */
  enlaceObra?: string;
  /** Cifras o datos destacados (ej: "56.7% de votos", "$2.5M invertidos") */
  cifras?: string;
};

export const TIPOS_LABEL: Record<string, string> = {
  politico: "Político",
  legal: "Legal",
  economico: "Económico",
  internacional: "Internacional",
  social: "Social",
  personal: "Personal",
};

export default function ModalEvento({
  evento,
  onCerrar,
}: {
  evento: EventoTimeline;
  onCerrar: () => void;
}) {
  const fechaFormateada = new Date(evento.fecha).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-gray-100 rounded-t-2xl overflow-hidden">
          {evento.imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={evento.imagen}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm text-accento font-semibold mb-1">{fechaFormateada}</p>
          {evento.tipo && (
            <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mb-2">
              {TIPOS_LABEL[evento.tipo] || evento.tipo}
            </span>
          )}
          <h2 id="modal-titulo" className="font-titulo font-bold text-xl text-texto mb-3">
            {evento.titulo}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {evento.descripcion}
          </p>

          {/* Cifras y datos destacados */}
          {evento.cifras && (
            <div className="mb-4 p-3 bg-accento/5 rounded-card border border-accento/20">
              <p className="text-xs text-gray-500 font-medium mb-1">Datos destacados</p>
              <p className="text-sm font-medium text-texto">{evento.cifras}</p>
            </div>
          )}

          {/* Enlace a obra relacionada */}
          {evento.enlaceObra && (
            <div className="mb-4">
              <Link
                href={`/obras/${evento.enlaceObra}`}
                className="inline-flex items-center gap-2 text-sm text-accento hover:text-accento-hover font-medium"
              >
                Ver obra relacionada
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          {/* Fuentes y referencias */}
          {evento.fuentes && evento.fuentes.length > 0 && (
            <div className="border border-gray-200 rounded-card p-4 bg-gray-50/50">
              <p className="text-xs text-gray-500 font-medium mb-2">Fuentes</p>
              <ul className="space-y-1">
                {evento.fuentes.map((url, i) => (
                  <li key={i}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accento hover:underline break-all"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onCerrar}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-texto transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
