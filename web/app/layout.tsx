import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://holding-ai.example"),
  title: {
    default: "AI Site Engine - сайт + CRM для роста заявок",
    template: "%s | Holding AI",
  },
  description:
    "AI Site Engine - продуктовая система генерации заявок: сайт, CRM и рост клиентского потока.",
  applicationName: "Holding AI",
  openGraph: {
    title: "Holding AI - Пакетные SEO-лендинги",
    description:
      "Запускайте конверсионные лендинги по пакетам с аналитикой и SEO-архитектурой.",
    type: "website",
    url: "https://holding-ai.example",
    siteName: "Holding AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holding AI - Пакетные SEO-лендинги",
    description:
      "Конверсионная система SEO-лендингов с пакетной моделью запуска.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0d0d0d] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
