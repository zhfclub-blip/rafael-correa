"use client";

import { useState } from "react";
import timelineData from "@/data/timeline.json";
import TimelineICMIF from "@/components/timeline/TimelineICMIF";
import TimelineRevista from "@/components/timeline/TimelineRevista";
import type { EventoTimeline } from "@/components/timeline/ModalEvento";

type VistaTimeline = "linea" | "revista";

export default function TimelinePage() {
  const eventos = timelineData.timeline as EventoTimeline[];
  const [vista, setVista] = useState<VistaTimeline>("linea");

  return (
    <div className="min-h-screen bg-[var(--color-fondo)]">
      {/* Selector de vista */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div
          className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Vista de línea de tiempo"
        >
          <button
            type="button"
            role="tab"
            aria-selected={vista === "linea"}
            onClick={() => setVista("linea")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              vista === "linea"
                ? "bg-accento text-white shadow"
                : "text-gray-600 hover:text-texto hover:bg-gray-50"
            }`}
          >
            Línea de tiempo
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={vista === "revista"}
            onClick={() => setVista("revista")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              vista === "revista"
                ? "bg-accento text-white shadow"
                : "text-gray-600 hover:text-texto hover:bg-gray-50"
            }`}
          >
            Por años (revista)
          </button>
        </div>
      </div>

      {vista === "linea" && <TimelineICMIF eventos={eventos} />}
      {vista === "revista" && <TimelineRevista eventos={eventos} />}
    </div>
  );
}
