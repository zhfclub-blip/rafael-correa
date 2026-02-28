import Link from "next/link";
import { notFound } from "next/navigation";
import oposicionData from "@/data/oposicion.json";

type Post = {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  excerpt: string;
  contenido: {
    introduccion: string;
    secciones: {
      titulo: string;
      texto: string;
      datos: { label: string; valor: string }[];
    }[];
    conclusion: string;
  };
  citas: { texto: string; fuente: string }[];
  documentos: { titulo: string; tipo: string; url: string }[];
};

const posts = oposicionData.posts as Post[];
const categorias = oposicionData.categorias as { id: string; label: string }[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OposicionPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const catLabel = categorias.find((c) => c.id === post.categoria)?.label ?? post.categoria;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Miga de pan">
        <Link href="/" className="hover:text-accento">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/oposicion" className="hover:text-accento">Oposición</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 truncate max-w-[240px] inline-block align-bottom" title={post.titulo}>
          {post.titulo.length > 50 ? post.titulo.slice(0, 50) + "…" : post.titulo}
        </span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        <article>
          <header className="mb-8">
            <span className="text-xs font-medium text-accento uppercase tracking-wide">
              {catLabel}
            </span>
            <h1 className="font-titulo font-bold text-2xl sm:text-3xl text-texto mt-1 mb-2">
              {post.titulo}
            </h1>
            <p className="text-sm text-gray-500">
              Publicado el {formatFecha(post.fecha)}
            </p>
          </header>

          <p className="text-gray-600 leading-relaxed mb-10">
            {post.contenido.introduccion}
          </p>

          {post.contenido.secciones.map((sec, i) => (
            <section key={i} className="mb-10">
              <h2 className="font-titulo font-semibold text-xl text-texto mb-3">
                {sec.titulo}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {sec.texto}
              </p>
              {sec.datos && sec.datos.length > 0 && (
                <ul className="space-y-2 text-sm">
                  {sec.datos.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="font-medium text-gray-700 shrink-0">{d.label}:</span>
                      <span className="text-gray-600">{d.valor}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="pt-4 border-t border-gray-200">
            <h2 className="font-titulo font-semibold text-xl text-texto mb-3">
              Conclusión
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {post.contenido.conclusion}
            </p>
          </section>
        </article>

        <aside className="lg:pl-4 space-y-6">
          {post.citas && post.citas.length > 0 && (
            <div className="rounded-card border border-red-100 bg-red-50/50 p-4">
              <h3 className="font-titulo font-semibold text-lg text-texto mb-3">
                Citas y referencias
              </h3>
              <ul className="space-y-3">
                {post.citas.map((c, i) => (
                  <li key={i} className="text-sm">
                    <p className="text-gray-700 italic">&ldquo;{c.texto}&rdquo;</p>
                    <p className="text-gray-500 text-xs mt-0.5">— {c.fuente}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.documentos && post.documentos.length > 0 && (
            <div className="rounded-card border border-gray-200 p-4">
              <h3 className="font-titulo font-semibold text-lg text-texto mb-3">
                Documentos
              </h3>
              <ul className="space-y-2 text-sm">
                {post.documentos.map((doc, i) => (
                  <li key={i}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accento hover:underline"
                    >
                      {doc.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link
          href="/oposicion"
          className="inline-flex items-center gap-1 text-accento font-medium hover:underline"
        >
          ← Volver a Oposición
        </Link>
      </div>
    </div>
  );
}
