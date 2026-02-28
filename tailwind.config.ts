import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: "#FAFAFA",
        texto: "#1A1A1A",
        accento: "#1976D2",
        "accento-hover": "#1565C0",
        camp: {
          dark: "#0a0e1a",
          mid: "#0f1629",
          gold: "#d4a84b",
          "gold-light": "#e8c56a",
          "glow-blue": "#4a7cba",
          text: "#ffffff",
          "text-muted": "#e2e8f0",
        },
      },
      fontFamily: {
        titulo: ["var(--font-outfit)", "sans-serif"],
        cuerpo: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.12)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-vertical": "marquee-vertical 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
