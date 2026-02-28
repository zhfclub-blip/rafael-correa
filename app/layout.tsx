import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import HomeTheme from "@/components/HomeTheme";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rafael Correa - Obras y Trayectoria",
  description: "Explora las obras, trayectoria y opiniones de Rafael Correa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-cuerpo antialiased min-h-screen">
        <HomeTheme />
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
