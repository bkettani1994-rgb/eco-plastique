import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecoplastique.ma"),
  icons: {
    icon: "https://res.cloudinary.com/diptsoc4h/image/upload/v1782941967/Design_sans_titre_90_t0ux3e.png",
    apple: "https://res.cloudinary.com/diptsoc4h/image/upload/v1782941967/Design_sans_titre_90_t0ux3e.png",
  },
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
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
