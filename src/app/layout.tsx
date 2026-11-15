import type { Metadata, Viewport } from "next";
import { store } from "@/config/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "QUEEN — Магазин жіночого одягу",
  description: `${store.description}. ${store.address}.`,
  applicationName: "QUEEN",
  keywords: ["QUEEN", "жіночий одяг", "куртки", "дублянки", "пальта", "купальники"],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "QUEEN",
    title: "QUEEN — Магазин жіночого одягу",
    description: `${store.description}. ${store.address}.`,
  },
  twitter: {
    card: "summary",
    title: "QUEEN — Магазин жіночого одягу",
    description: "Куртки • Дублянки • Пальта • Купальники",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#501E30",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
