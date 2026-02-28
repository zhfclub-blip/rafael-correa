"use client";

import { useState } from "react";

type Documento = { titulo: string; tipo: string; url: string };
type TemaTab = {
  resumen: { titulo: string; puntos: string[] };
  tablaPropuesta: {
    titulo: string;
    columnas: string[];
    filas: string[][];
    nota: string;
  } | null;
  conclusion: string;
  documentos: Documento[];
};

type TabId = "analisis" | "noticias" | "documentos";

export default function AnalisisTabs({ tema }: { tema: TemaTab }) {
  const [tabActivo, setTabActivo] = useState<TabId>("analisis");

  const tabs: { id: TabId; label: string; disabled?: boolean }[] = [
    { id: "analisis", label: "Análisis" },
    { id: "noticias", label: "Noticias", disabled: true },
    { id: "documentos", label: "Documentos" },
  ];

  return (
    <>
      <div className="flex gap-1 border-b border-gray-200 mb-8" role="tablist" aria-label="Secciones del análisis">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tabActivo === tab.id}
            aria-disabled={tab.disabled}
            onClick={() => !tab.disabled && setTabActivo(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tabActivo === tab.id
                ? "border-accento text-accento"
                : tab.disabled
                  ? "border-transparent text-gray-400 cursor-not-allowed"
                  : "border-transparent text-gray-600 hover:text-accento hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabActivo === "analisis" && (
        <>
          <section className="mb-8">
            <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
              {tema.resumen.titulo}
            </h2>
            <ul className="space-y-2 text-gray-600">
              {tema.resumen.puntos.map((punto, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accento shrink-0">•</span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </section>

          {tema.tablaPropuesta && (
            <section className="mb-8">
              <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
                {tema.tablaPropuesta.titulo}
              </h2>
              <div className="overflow-x-auto rounded-card border border-gray-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      {tema.tablaPropuesta.columnas.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-sm font-medium text-gray-600"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tema.tablaPropuesta.filas.map((fila, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-100 hover:bg-gray-50/50"
                      >
                        {fila.map((celda, j) => (
                          <td key={j} className="px-4 py-3 text-gray-700">
                            {celda}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tema.tablaPropuesta.nota && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-900">
                  <strong>Importante:</strong> {tema.tablaPropuesta.nota}
                </div>
              )}
            </section>
          )}

          <section className="mb-8">
            <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
              Conclusión
            </h2>
            <p className="text-gray-600 leading-relaxed">{tema.conclusion}</p>
          </section>
        </>
      )}

      {tabActivo === "documentos" && (
        <section className="mb-8">
          <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
            Documentos
          </h2>
          {tema.documentos && tema.documentos.length > 0 ? (
            <ul className="space-y-4">
              {tema.documentos.map((doc, i) => (
                <li key={i}>
                  <a
                    href={doc.url}
                    download={doc.tipo === "pdf" ? doc.url.split("/").pop() : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 p-4 rounded-card border border-gray-200 bg-white hover:border-accento hover:bg-gray-50/50 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-medium text-texto group-hover:text-accento">
                      {doc.titulo}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">Descargar</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay documentos disponibles para este tema.</p>
          )}
        </section>
      )}

      {tabActivo === "noticias" && (
        <p className="text-gray-500 py-8">Contenido de noticias próximamente.</p>
      )}
    </>
  );
}
