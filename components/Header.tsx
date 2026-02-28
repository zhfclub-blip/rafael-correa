"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks: { href: string; label: string; children?: { href: string; label: string }[] }[] = [
  { href: "/", label: "Inicio" },
  { href: "/obras", label: "Obras" },
  { href: "/timeline", label: "Timeline" },
  { href: "/opiniones", label: "Opiniones" },
  { href: "/datos", label: "Datos" },
  { href: "/analisis", label: "Análisis y Contexto" },
  {
    href: "/oposicion",
    label: "Oposición",
    children: [
      { href: "/oposicion?categoria=medios-comunicacion", label: "Medios de comunicación" },
      { href: "/oposicion?categoria=florindos", label: "Florindos (fachos o entreguistas)" },
      { href: "/oposicion?categoria=intervencion-extranjera", label: "Intervención extranjera" },
    ],
  },
];

const socialLinks = [
  { href: "#", label: "Facebook", icon: <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
  { href: "#", label: "Twitter", icon: <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { href: "#", label: "YouTube", icon: <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [oposicionOpen, setOposicionOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const headerDark = isHome
    ? "bg-camp-dark/95 backdrop-blur-sm border-b border-white/10"
    : "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm";

  const logoClass = isHome
    ? "font-titulo font-bold text-xl text-white hover:opacity-90 transition-opacity"
    : "font-titulo font-bold text-xl text-accento hover:text-accento-hover transition-colors";

  const navLinkClass = isHome
    ? "text-white hover:text-camp-gold transition-colors font-medium"
    : "text-gray-600 hover:text-accento transition-colors font-medium";

  const mobileMenuBg = isHome ? "bg-camp-mid border-white/10" : "bg-white border-gray-100";
  const mobileLinkClass = isHome
    ? "py-3 px-4 rounded-lg hover:bg-white/10 text-white hover:text-camp-gold"
    : "py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-accento";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerDark}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className={logoClass}>
          {isHome ? (
            <>
              Rafael <span className="text-camp-gold border-b-2 border-camp-gold pb-0.5">Correa</span>
            </>
          ) : (
            "Rafael Correa"
          )}
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setOposicionOpen(true)}
                onMouseLeave={() => setOposicionOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`${navLinkClass} flex items-center gap-1`}
                >
                  {link.label}
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {oposicionOpen && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className={`rounded-lg shadow-lg py-2 min-w-[220px] ${
                      isHome
                        ? "border border-white/20 bg-camp-mid"
                        : "border border-gray-200 bg-white"
                    }`}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-sm ${
                            isHome
                              ? "text-white hover:bg-white/10 hover:text-camp-gold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-accento"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            )
          )}
          {isHome && (
            <div className="flex items-center gap-2 ml-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:text-camp-gold hover:border-camp-gold transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  {s.icon}
                </svg>
              </a>
            ))}
            </div>
          )}
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${isHome ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-600"}`}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className={`md:hidden absolute top-16 left-0 right-0 border-b py-4 px-4 shadow-lg ${mobileMenuBg}`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium ${mobileLinkClass}`}
                  >
                    {link.label}
                  </Link>
                  <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-gray-200 ml-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm ${mobileLinkClass}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium ${mobileLinkClass}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
