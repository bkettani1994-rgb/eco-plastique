export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteTestimonial {
  name: string;
  city: string;
  review: string;
  rating: number;
  product?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export const siteConfig = {
  businessName: "Eco Plastique",
  description:
    "Eco Plastique propose des solutions sur mesure pour protéger et améliorer votre quotidien : nappes PVC, protège-matelas et oreillers médicaux.",
  whatsappNumber: "212663310060",
  phoneDisplay: "+212 6 63 31 00 60",
  email: "contact@ecoplastique.ma",
  address: "Casablanca, Maroc",
  phone: "+212 6 63 31 00 60",
};

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  const text = message ?? "Bonjour, je suis intéressé par vos produits Eco Plastique.";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://web.facebook.com/ecoplastique.ma" },
  { label: "Instagram", href: "https://www.instagram.com/ecoplastique.ma/" },
  { label: "TikTok", href: "https://www.tiktok.com/@ecoplastique.ma" },
];

export const testimonials: SiteTestimonial[] = [
  {
    name: "Khadija B.",
    city: "Casablanca",
    review: "Exactement les dimensions demandées, qualité top et livraison rapide !",
    rating: 5,
    product: "Nappe PVC sur mesure",
  },
  {
    name: "Youssef A.",
    city: "Rabat",
    review: "Très facile à nettoyer, parfait pour une famille avec enfants.",
    rating: 5,
    product: "Nappe PVC sur mesure",
  },
  {
    name: "Salma T.",
    city: "Marrakech",
    review: "Parfait pour mon enfant, je ne m'inquiète plus des petits accidents nocturnes.",
    rating: 5,
    product: "Protège-matelas imperméable",
  },
  {
    name: "Nadia L.",
    city: "Tanger",
    review: "Mes douleurs au cou ont nettement diminué après deux semaines.",
    rating: 5,
    product: "Oreiller cervical médical",
  },
  {
    name: "Karim S.",
    city: "Agadir",
    review: "Très confortable et la housse se lave facilement.",
    rating: 4,
    product: "Oreiller à mémoire de forme",
  },
  {
    name: "Imane R.",
    city: "Fès",
    review: "Le meilleur oreiller que j'ai eu, je me réveille sans douleurs au cou.",
    rating: 5,
    product: "Oreiller cervical médical",
  },
];

export const generalFaq: FaqItem[] = [
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nous livrons partout au Maroc en 24 à 72 heures selon votre ville, grâce à notre réseau de partenaires logistiques.",
  },
  {
    question: "Puis-je commander sur WhatsApp ?",
    answer:
      "Oui, vous pouvez nous contacter directement sur WhatsApp pour passer commande, poser vos questions ou demander conseil.",
  },
  {
    question: "Comment prendre les dimensions de ma table ?",
    answer:
      "Mesurez la longueur et la largeur de votre table avec un mètre ruban et communiquez-nous ces mesures lors de votre commande.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons le paiement à la livraison (cash) ainsi que le virement bancaire pour les commandes en ligne.",
  },
];

export const howItWorks: HowItWorksStep[] = [
  {
    title: "Choisissez votre produit",
    description: "Parcourez notre catalogue et sélectionnez le produit qui correspond à vos besoins.",
    icon: "ShoppingBag",
  },
  {
    title: "Personnalisez vos dimensions",
    description: "Indiquez vos mesures exactes pour une fabrication parfaitement sur mesure.",
    icon: "Ruler",
  },
  {
    title: "Validez votre commande",
    description: "Confirmez votre commande en ligne ou directement sur WhatsApp.",
    icon: "BadgeCheck",
  },
  {
    title: "Livraison à domicile",
    description: "Recevez votre commande rapidement, partout au Maroc, avec paiement à la livraison.",
    icon: "Truck",
  },
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Livraison rapide partout au Maroc",
    description: "Une logistique fiable pour recevoir vos produits en un temps record, où que vous soyez.",
    icon: "Truck",
  },
  {
    title: "Paiement à la livraison",
    description: "Payez en toute confiance au moment de la réception de votre commande.",
    icon: "Wallet",
  },
  {
    title: "Qualité garantie",
    description: "Des matériaux durables et soigneusement sélectionnés pour une satisfaction totale.",
    icon: "ShieldCheck",
  },
  {
    title: "Service client réactif",
    description: "Notre équipe est disponible pour répondre à toutes vos questions rapidement.",
    icon: "Headset",
  },
];
