"use client";

import { useMemo, useRef, useState } from "react";
import ModalEvento, { TIPOS_LABEL } from "./ModalEvento";
import type { EventoTimeline } from "./ModalEvento";

export type { EventoTimeline } from "./ModalEvento";

const YEAR_START = 2006;
const YEAR_END = 2022;
const YEAR_WIDTH_PX = 280; // Más espacio por año → menos solapamiento
const TOTAL_WIDTH = (YEAR_END - YEAR_START) * YEAR_WIDTH_PX;
const LINE_HEIGHT = 80;

function dateToPosition(fecha: string): number {
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = d.getMonth() / 12;
  return (year - YEAR_START + month) * YEAR_WIDTH_PX;
}

export default function TimelineICMIF({ eventos }: { eventos: EventoTimeline[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<EventoTimeline | null>(null);

  const ordenados = useMemo(() => {
    return [...eventos].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  }, [eventos]);

  return (
    <div className="timeline-icmif">
      {/* Título y navegación por años */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
          Línea de tiempo
        </h1>
        <p className="text-gray-600 mb-6">
          Haz clic en un punto para ver el detalle. Desliza horizontalmente para explorar.
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: YEAR_END - YEAR_START }, (_, i) => YEAR_START + i).map(
            (year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  const left = (year - YEAR_START) * YEAR_WIDTH_PX - 120;
                  scrollRef.current?.scrollTo({
                    left: Math.max(0, left),
                    behavior: "smooth",
                  });
                }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-accento hover:text-white hover:border-accento transition-colors"
              >
                {year}
              </button>
            )
          )}
        </div>
      </div>

      {/* Contenedor con scroll horizontal — solo puntos en la línea */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-visible pb-12 scroll-smooth"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          className="relative mx-4 sm:mx-8"
          style={{ width: TOTAL_WIDTH, height: LINE_HEIGHT + 48 }}
        >
          {/* Línea central */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-gray-300"
            style={{ top: LINE_HEIGHT / 2 - 1 }}
          />

          {/* Marcadores de año */}
          {Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => {
            const y = YEAR_START + i;
            const left = (y - YEAR_START) * YEAR_WIDTH_PX;
            return (
              <div
                key={y}
                className="absolute flex flex-col items-center pointer-events-none"
                style={{ left: left - 1, top: LINE_HEIGHT / 2 - 4 }}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span
                  className="absolute top-6 text-xs font-semibold text-gray-500 whitespace-nowrap"
                >
                  {y}
                </span>
              </div>
            );
          })}

          {/* Eventos: solo punto + tooltip al hover */}
          {ordenados.map((evento) => {
            const left = dateToPosition(evento.fecha);
            return (
              <div
                key={evento.id}
                className="absolute z-10 flex flex-col items-center group"
                style={{
                  left: left - 10,
                  top: LINE_HEIGHT / 2 - 10,
                }}
              >
                <button
                  type="button"
                  onClick={() => setEventoSeleccionado(evento)}
                  className="w-5 h-5 rounded-full bg-accento border-2 border-white shadow-md hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accento focus:ring-offset-2 transition-transform z-20"
                  aria-label={`Ver: ${evento.titulo}`}
                />
                {/* Tooltip al hover: solo título */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap max-w-[200px] truncate">
                  {evento.titulo}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {Object.entries(TIPOS_LABEL).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full opacity-70"
                style={{
                  backgroundColor:
                    key === "politico" ? "var(--color-accento)" :
                    key === "legal" ? "#6b7280" :
                    key === "economico" ? "#059669" :
                    key === "internacional" ? "#7c3aed" :
                    key === "social" ? "#ea580c" : "#64748b",
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Modal evento */}
      {eventoSeleccionado && (
        <ModalEvento
          evento={eventoSeleccionado}
          onCerrar={() => setEventoSeleccionado(null)}
        />
      )}
    </div>
  );
}
