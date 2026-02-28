import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

/**
 * Card reutilizable para enlaces a secciones.
 * Tiene hover con elevación y transición suave.
 */
export default function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-card bg-white shadow-card card-hover border border-gray-100"
    >
      {icon && (
        <div className="mb-4 text-accento text-3xl">{icon}</div>
      )}
      <h3 className="font-titulo font-semibold text-lg text-texto mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
