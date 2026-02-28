"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { TIPOS_LABEL } from "./ModalEvento";
import type { EventoTimeline } from "./ModalEvento";
import datosEconomicos from "@/data/datos-economicos.json";

type DatoEconomico = { valor: string; descripcion: string };
type DatosAnio = Record<string, DatoEconomico>;

function DatosEconomicosAnio({ year }: { year: number }) {
  const datos = (datosEconomicos.porAnio as Record<string, DatosAnio>)[String(year)];
  if (!datos) return null;

  const items: { key: string; label: string }[] = [
    { key: "pib", label: "PIB" },
    { key: "deudaPublica", label: "Deuda" },
    { key: "pobreza", label: "Pobreza" },
    { key: "homicidios", label: "Homicidios" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6 py-3 px-4 bg-gray-50 rounded-card border border-gray-100">
      {items.map(({ key, label }) => {
        const d = datos[key];
        if (!d) return null;
        return (
          <div
            key={key}
            title={d.descripcion}
            className="flex items-baseline gap-2 cursor-help"
          >
            <span className="text-xs text-gray-500 font-medium">{label}:</span>
            <span className="text-sm font-semibold text-texto">{d.valor}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatFechaExacta(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function entradilla(descripcion: string, maxLength = 120): string {
  const trimmed = descripcion.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

function ImagenEvento({ evento }: { evento: EventoTimeline }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
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
            className="w-12 h-12"
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
  );
}

export default function TimelineRevista({ eventos }: { eventos: EventoTimeline[] }) {
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const sectionsRef = useRef<Map<number, HTMLElement | null>>(new Map());

  const eventosPorAnio = useMemo(() => {
    const sorted = [...eventos].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
    const map = new Map<number, EventoTimeline[]>();
    for (const e of sorted) {
      const year = new Date(e.fecha).getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(e);
    }
    return map;
  }, [eventos]);

  const anos = useMemo(
    () => Array.from(eventosPorAnio.keys()).sort((a, b) => a - b),
    [eventosPorAnio]
  );

  const [yearActive, setYearActive] = useState<number | null>(anos[0] ?? null);
  const [menuMinimizado, setMenuMinimizado] = useState(false);

  const scrollToYear = useCallback((year: number) => {
    const el = sectionsRef.current.get(year);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const year = Number((entry.target as HTMLElement).dataset.year);
          if (!Number.isNaN(year)) setYearActive(year);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    anos.forEach((year) => {
      const el = sectionsRef.current.get(year);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [anos]);

  return (
    <div className="timeline-revista flex min-h-[60vh] w-full max-w-6xl mx-auto px-0 sm:px-4 pb-12">
      {/* Menú de años a la izquierda (minimizable) */}
      <aside
        className={`flex flex-col shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-sm transition-[width] duration-200 ease-out ${
          menuMinimizado ? "w-14" : "w-48 sm:w-52"
        }`}
        aria-label="Navegación por años"
      >
        <div className="sticky top-20 flex flex-col h-min py-4 pl-3 pr-2">
          <button
            type="button"
            onClick={() => setMenuMinimizado((v) => !v)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-texto mb-2"
            aria-label={menuMinimizado ? "Expandir menú de años" : "Minimizar menú de años"}
            title={menuMinimizado ? "Expandir menú" : "Minimizar menú"}
          >
            {menuMinimizado ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
          {!menuMinimizado && (
            <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-8rem)]" role="tablist">
              {anos.map((year) => (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  onClick={() => scrollToYear(year)}
                  aria-current={yearActive === year ? "true" : undefined}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    yearActive === year
                      ? "bg-accento text-white border-accento"
                      : "bg-transparent border-transparent text-gray-600 hover:bg-gray-100 hover:text-texto"
                  }`}
                >
                  {year}
                </button>
              ))}
            </nav>
          )}
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 pt-4">
        <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
          Por años
        </h1>
        <p className="text-gray-600 mb-8">
          Explora los eventos por año. Cada entrada muestra la fecha exacta y una breve descripción.
        </p>

        {/* Secciones por año */}
        <div className="space-y-14">
        {anos.map((year) => (
          <section
            key={year}
            id={`year-${year}`}
            ref={(el) => { sectionsRef.current.set(year, el); }}
            data-year={year}
            className="scroll-mt-28"
          >
            <h2 className="font-titulo font-bold text-2xl text-texto mb-2 pb-2 border-b-2 border-gray-200">
              {year}
            </h2>
            <DatosEconomicosAnio year={year} />
            <ul className="space-y-10" role="list">
              {(eventosPorAnio.get(year) ?? []).map((evento) => {
                const expandido = expandidoId === evento.id;
                return (
                  <li key={evento.id} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                    <article className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Imagen a la izquierda (desktop) */}
                      <div className="sm:w-[240px] sm:min-w-[240px]">
                        <ImagenEvento evento={evento} />
                      </div>
                      {/* Título y fecha a la derecha */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-accento mb-1">
                          {formatFechaExacta(evento.fecha)}
                        </p>
                        {evento.tipo && (
                          <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mb-2">
                            {TIPOS_LABEL[evento.tipo] || evento.tipo}
                          </span>
                        )}
                        <h3 className="font-titulo font-bold text-lg sm:text-xl text-texto mb-2">
                          {evento.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {expandido ? evento.descripcion : entradilla(evento.descripcion)}
                        </p>
                        {expandido && (
                          <div className="space-y-4 mb-4">
                            {evento.cifras && (
                              <div className="p-3 bg-accento/5 rounded-card border border-accento/20">
                                <p className="text-xs text-gray-500 font-medium mb-1">Datos destacados</p>
                                <p className="text-sm font-medium text-texto">{evento.cifras}</p>
                              </div>
                            )}
                            {evento.enlaceObra && (
                              <div>
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
                        )}
                        <button
                          type="button"
                          onClick={() => setExpandidoId(expandido ? null : evento.id)}
                          className="text-sm font-medium text-accento hover:text-accento-hover underline underline-offset-2"
                          aria-label={expandido ? `Ver menos: ${evento.titulo}` : `Ver más: ${evento.titulo}`}
                        >
                          {expandido ? "Ver menos" : "Ver más"}
                        </button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        </div>
      </div>
    </div>
  );
}
