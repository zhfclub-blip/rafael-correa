"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pinta el fondo del body de oscuro cuando estamos en la página de inicio.
 */
export default function HomeTheme() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isHome) {
      document.documentElement.classList.add("page-inicio");
      document.body.style.backgroundColor = "var(--camp-bg-dark)";
    } else {
      document.documentElement.classList.remove("page-inicio");
      document.body.style.backgroundColor = "";
    }
    return () => {
      document.documentElement.classList.remove("page-inicio");
      document.body.style.backgroundColor = "";
    };
  }, [isHome]);

  return null;
}
