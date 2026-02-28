import Link from "next/link";
import HeroFraseCarousel from "@/components/HeroFraseCarousel";

const features = [
  {
    title: "Obras",
    description: "Mapa interactivo con las obras realizadas. Presupuesto, ubicación y detalles.",
    href: "/obras",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Timeline",
    description: "Línea de tiempo interactiva. Recorre los hitos de su trayectoria desde 2006.",
    href: "/timeline",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Opiniones",
    description: "Busca la opinión de Correa sobre cualquier tema. Petróleo, Yasuní, economía y más.",
    href: "/opiniones",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Datos",
    description: "Gráficos y visualizaciones. Presupuesto vs gastado, inversión por sector y más.",
    href: "/datos",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Análisis y Contexto",
    description: "Lo que decían prensa y oposición vs. lo que pasó en realidad. Documentos, tablas y datos.",
    href: "/analisis",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Oposición",
    description: "Medios de comunicación, florindos, intervención extranjera. Análisis con datos y contexto.",
    href: "/oposicion",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM7 8h10M7 12h10" />
      </svg>
    ),
  },
];

const cifras = [
  { valor: "150+", label: "Obras registradas" },
  { valor: "10", label: "Años en gobierno" },
  { valor: "$45B", label: "Inversión total" },
  { valor: "500+", label: "Opiniones indexadas" },
];

const frasesAutoria = [
  "Sueño con un Ecuador más justo, solidario e innovador.",
  "La soberanía no se negocia.",
  "Un país con desarrollo inclusivo y justicia social.",
  "La patria ya es de todos.",
  "Ecuador debe ser dueño de su destino.",
  "Por el progreso y la dignidad de nuestro pueblo.",
  "La educación es el gran igualador social.",
  "Invertir en la gente es invertir en el futuro.",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-camp-dark text-white">
      {/* Fondo cósmico con gradientes y brillo sutil */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-camp-dark via-camp-mid to-camp-dark" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-camp-glow-blue/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-camp-gold/5 blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-camp-gold/10 blur-[80px]" />
        {/* Estrellas sutiles */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 50px 160px, white, transparent),
            radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 130px 80px, white, transparent)`,
          backgroundSize: "200px 200px",
        }} />
      </div>

      <div className="relative">
        {/* Hero: izquierda = título y CTA, derecha = carrusel de frases */}
        <section className="min-h-[85vh] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 px-4 sm:px-6 pt-24 pb-20 max-w-6xl mx-auto">
          {/* Bloque izquierdo: título, subtítulo, botón */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-titulo font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
              Rafael <span className="text-camp-gold">Correa</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium mb-3">
              Un Líder Visionario
            </p>
            <p className="text-camp-text-muted text-lg sm:text-xl max-w-2xl mb-10">
              Por el progreso, la justicia social y la soberanía de Ecuador.
            </p>
            <Link
              href="/timeline"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-camp-gold text-camp-dark font-semibold hover:bg-camp-gold-light transition-colors shadow-lg shadow-camp-gold/20 w-fit"
            >
              Conoce su Visión <span aria-hidden>&gt;</span>
            </Link>
          </div>

          {/* Derecha: una frase a la vez, cambia cada 15 s */}
          <HeroFraseCarousel frases={frasesAutoria} />
        </section>

        {/* Ola divisoria */}
        <div className="w-full h-16 sm:h-24 relative -mt-4" aria-hidden>
          <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-full text-camp-dark" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--camp-glow-blue)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="var(--camp-gold)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--camp-glow-blue)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path fill="url(#waveGrad)" d="M0 120 L0 60 Q360 0 720 60 T1440 60 L1440 120 Z" />
            <path fill="var(--camp-mid)" d="M0 120 L0 80 Q360 40 720 80 T1440 80 L1440 120 Z" />
          </svg>
        </div>

        {/* Tarjetas de características */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group block p-6 rounded-2xl bg-camp-card border border-white/10 backdrop-blur-sm hover:border-camp-gold/40 hover:shadow-lg hover:shadow-camp-gold/10 transition-all duration-300"
              >
                <div className="mb-4 text-camp-gold">{f.icon}</div>
                <h3 className="font-titulo font-semibold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-camp-text-muted text-sm leading-relaxed mb-4">{f.description}</p>
                <span className="inline-flex items-center gap-1 text-camp-gold font-medium text-sm group-hover:gap-2 transition-all">
                  Leer más <span aria-hidden>&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Visión */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="relative rounded-2xl overflow-hidden bg-camp-card border border-white/10 backdrop-blur-sm p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-camp-glow-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" aria-hidden />
            <div className="relative">
              <h2 className="font-titulo font-bold text-2xl sm:text-3xl text-white mb-2">
                Visión para el Futuro de Ecuador
              </h2>
              <p className="text-camp-text-muted mb-6">
                Un líder comprometido con el desarrollo y la soberanía
              </p>
              <blockquote className="relative pl-6 border-l-2 border-camp-gold mb-8">
                <span className="absolute -left-1 text-4xl text-camp-gold/60 font-serif leading-none">&ldquo;</span>
                <p className="text-lg sm:text-xl text-white italic">
                  Sueño con un Ecuador más justo, solidario e innovador. Un país soberano con desarrollo inclusivo y justicia social.
                </p>
              </blockquote>
              <Link
                href="/timeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-camp-gold text-camp-dark font-semibold hover:bg-camp-gold-light transition-colors shadow-lg shadow-camp-gold/20 w-fit"
              >
                Conoce su Trayectoria <span aria-hidden>&gt;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Resumen en cifras */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <h2 className="font-titulo font-semibold text-xl sm:text-2xl text-white mb-8">
            Resumen en cifras
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {cifras.map((c) => (
              <div
                key={c.label}
                className="p-6 rounded-2xl bg-camp-card border border-white/10 backdrop-blur-sm text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-camp-gold mb-1">{c.valor}</p>
                <p className="text-sm text-camp-text-muted">{c.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
