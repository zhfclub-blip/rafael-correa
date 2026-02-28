import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-titulo font-bold text-4xl text-texto mb-2">
        404
      </h1>
      <p className="text-gray-600 mb-6">Página no encontrada</p>
      <Link
        href="/"
        className="px-6 py-3 bg-accento text-white rounded-card font-medium hover:bg-accento-hover transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
