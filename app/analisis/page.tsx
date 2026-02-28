"use client";

import Link from "next/link";
import { useState } from "react";
import analisisData from "@/data/analisis.json";

const categorias = analisisData.categorias as { id: string; label: string }[];
const temas = analisisData.temas as {
  slug: string;
  titulo: string;
  categoria: string;
  excerpt: string;
  imagen?: string;
}[];

export default function AnalisisPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  const temasFiltrados =
    categoriaActiva === "todos"
      ? temas
      : temas.filter((t) => t.categoria === categoriaActiva);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
          Análisis y Contexto
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Estudios detallados sobre temas tergiversados por la prensa o que
          requieren una explicación profunda. Lo que se dijo frente a lo que
          muestran los datos y documentos.
        </p>
      </header>

      {/* Filtro por categoría */}
      <nav
        className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4"
        aria-label="Filtrar por tema"
      >
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              categoriaActiva === cat.id
                ? "bg-accento text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {temasFiltrados.map((tema) => (
          <article
            key={tema.slug}
            className="rounded-card bg-white shadow-card border border-gray-100 overflow-hidden card-hover flex flex-col"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              {tema.imagen ? (
                <img
                  src={tema.imagen}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>Imagen</span>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-medium text-accento uppercase tracking-wide mb-1">
                {categorias.find((c) => c.id === tema.categoria)?.label ?? tema.categoria}
              </span>
              <h2 className="font-titulo font-semibold text-lg text-texto mb-2 line-clamp-2">
                {tema.titulo}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                {tema.excerpt}
              </p>
              <Link
                href={`/analisis/${tema.slug}`}
                className="inline-flex items-center gap-1 text-accento font-medium text-sm hover:underline"
              >
                Leer análisis <span aria-hidden>&gt;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {temasFiltrados.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No hay análisis en esta categoría por el momento.
        </p>
      )}
    </div>
  );
}
