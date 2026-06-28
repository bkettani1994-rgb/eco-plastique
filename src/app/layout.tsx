import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecoplastique.ma"),
  title: {
    default: "Eco Plastique | Nappes PVC, Protège-matelas et Oreillers médicaux au Maroc",
    template: "%s | Eco Plastique",
  },
  description:
    "Eco Plastique vous propose des nappes PVC sur mesure, des protège-matelas imperméables et des oreillers médicaux cervicaux et à mémoire de forme. Livraison partout au Maroc, paiement à la livraison.",
  openGraph: {
    siteName: "Eco Plastique",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
