"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import oposicionData from "@/data/oposicion.json";

const categorias = oposicionData.categorias as { id: string; label: string }[];
const posts = oposicionData.posts as {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  excerpt: string;
  imagen?: string;
}[];

export default function OposicionPage() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get("categoria");
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  useEffect(() => {
    if (catFromUrl && categorias.some((c) => c.id === catFromUrl)) {
      setCategoriaActiva(catFromUrl);
    }
  }, [catFromUrl]);

  const postsFiltrados = categoriaActiva
    ? posts.filter((p) => p.categoria === categoriaActiva)
    : posts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-titulo font-bold text-3xl sm:text-4xl text-texto mb-2">
          Oposición
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Análisis en detalle de los actores y factores de la oposición: medios de comunicación,
          sectores políticos y económicos, e intervención extranjera. Datos, contexto y fuentes.
        </p>
      </header>

      {/* Bloques por categoría (subelementos del menú) */}
      <section className="mb-12">
        <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
          Temas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categorias.map((cat) => {
            const count = posts.filter((p) => p.categoria === cat.id).length;
            const isActive = categoriaActiva === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoriaActiva(isActive ? null : cat.id)}
                className={`p-5 rounded-card border text-left transition-colors ${
                  isActive
                    ? "border-accento bg-accento/5"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <h3 className="font-titulo font-semibold text-texto mb-1">
                  {cat.label}
                </h3>
                <p className="text-sm text-gray-500">
                  {count} {count === 1 ? "análisis" : "análisis"}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Lista de posts */}
      <section>
        <h2 className="font-titulo font-semibold text-xl text-texto mb-4">
          {categoriaActiva
            ? categorias.find((c) => c.id === categoriaActiva)?.label
            : "Todos los análisis"}
        </h2>
        <div className="space-y-4">
          {postsFiltrados.map((post) => (
            <Link
              key={post.slug}
              href={`/oposicion/${post.slug}`}
              className="block p-6 rounded-card bg-white shadow-card border border-gray-100 hover:border-accento/30 hover:shadow-card-hover transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-medium text-accento uppercase tracking-wide">
                    {categorias.find((c) => c.id === post.categoria)?.label}
                  </span>
                  <h3 className="font-titulo font-semibold text-lg text-texto mt-1">
                    {post.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.fecha).toLocaleDateString("es-EC", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-accento font-medium text-sm shrink-0">
                  Leer análisis →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {postsFiltrados.length === 0 && (
        <p className="text-gray-500 py-8">
          No hay análisis en esta categoría por el momento.
        </p>
      )}
    </div>
  );
}
