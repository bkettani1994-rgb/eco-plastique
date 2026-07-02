export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductTestimonial {
  name: string;
  city: string;
  review: string;
  rating: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductPageConfig {
  hero: boolean;
  gallery: boolean;
  features: boolean;
  benefits: boolean;
  specifications: boolean;
  howToUse: boolean;
  testimonials: boolean;
  faq: boolean;
  cta: boolean;
  whatsapp: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  category: string;
  categoryAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  longDescription: string;
  images: string[];
  price: number;
  fromPrice?: boolean;
  oldPrice?: number;
  features: string[];
  featuresAr?: string[];
  benefits: string[];
  benefitsAr?: string[];
  specifications: ProductSpecification[];
  howToUse?: string[];
  howToUseAr?: string[];
  faq: ProductFaqItem[];
  faqAr?: ProductFaqItem[];
  testimonials?: ProductTestimonial[];
  seoTitle: string;
  seoDescription: string;
  pageConfig: ProductPageConfig;
}

const fullPageConfig: ProductPageConfig = {
  hero: true,
  gallery: true,
  features: true,
  benefits: true,
  specifications: true,
  howToUse: true,
  testimonials: true,
  faq: true,
  cta: true,
  whatsapp: true,
};

export const products: Product[] = [
  {
    id: "1",
    slug: "nappe-pvc-sur-mesure",
    name: "Nappe PVC sur mesure",
    nameAr: "غطاء طاولة PVC مقاس مخصص",
    category: "Nappes",
    categoryAr: "أغطية الطاولة",
    shortDescription:
      "Protégez votre table avec élégance grâce à notre nappe en PVC sur mesure, facile à nettoyer et résistante au quotidien.",
    shortDescriptionAr:
      "احمِ طاولتك بأناقة مع غطاء PVC مقاس مخصص، سهل التنظيف ومتين للاستخدام اليومي.",
    longDescription:
      "Notre nappe en PVC sur mesure est découpée selon les dimensions exactes de votre table, qu'elle soit ronde, carrée, ovale ou rectangulaire. Fabriquée à partir d'un PVC épais et de haute qualité, elle protège durablement votre table contre les taches, l'eau, l'huile et la chaleur des plats, tout en restant agréable au toucher. Disponible dans une large gamme de motifs et de couleurs pour s'harmoniser avec votre décoration intérieure, elle est devenue un incontournable des foyers marocains qui veulent allier praticité, hygiène et style sans sacrifier l'esthétique de leur salle à manger.",
    images: [
      "https://picsum.photos/seed/nappe-pvc-sur-mesure-1/800/800",
      "https://picsum.photos/seed/nappe-pvc-sur-mesure-2/800/800",
      "https://picsum.photos/seed/nappe-pvc-sur-mesure-3/800/800",
      "https://picsum.photos/seed/nappe-pvc-sur-mesure-4/800/800",
    ],
    price: 150,
    fromPrice: true,
    features: [
      "Découpe sur mesure selon les dimensions exactes de votre table",
      "PVC épais et résistant aux taches, à l'huile et à l'eau",
      "Surface lisse qui s'essuie en quelques secondes",
      "Large choix de motifs, couleurs et finitions",
      "Bords renforcés anti-effilochage",
      "Résiste aux contacts ponctuels avec la chaleur",
    ],
    featuresAr: [
      "قص مخصص حسب الأبعاد الدقيقة لطاولتك",
      "PVC سميك ومقاوم للبقع والزيت والماء",
      "سطح أملس يُمسح في ثوانٍ",
      "مجموعة واسعة من الأنماط والألوان والتشطيبات",
      "حواف معززة مقاومة للتفتت",
      "مقاوم للتلامس العرضي مع الحرارة",
    ],
    benefits: [
      "Protection optimale de votre table au quotidien",
      "Facile à nettoyer, juste un coup d'éponge",
      "Sur mesure, adaptée à chaque forme de table",
      "Résistante aux taches, à l'usure et au temps",
      "Esthétique soignée qui valorise votre intérieur",
    ],
    benefitsAr: [
      "حماية مثالية لطاولتك يومياً",
      "سهل التنظيف، مجرد مسحة بالإسفنجة",
      "مقاس مخصص يناسب كل شكل طاولة",
      "مقاوم للبقع والبلى والزمن",
      "مظهر أنيق يضفي جمالاً على ديكورك",
    ],
    specifications: [
      { label: "Matière", value: "PVC haute densité" },
      { label: "Épaisseur", value: "0,5 mm" },
      { label: "Découpe", value: "Sur mesure (ronde, carrée, ovale, rectangulaire)" },
      { label: "Couleurs disponibles", value: "Plus de 20 motifs et coloris" },
      { label: "Entretien", value: "Lavable à l'éponge humide" },
      { label: "Garantie", value: "12 mois contre les défauts de fabrication" },
      { label: "Origine", value: "Fabrication marocaine" },
    ],
    howToUse: [
      "Mesurez précisément la longueur et la largeur de votre table",
      "Indiquez vos dimensions et la forme de table lors de la commande",
      "Choisissez votre motif et votre couleur préférés",
      "Recevez votre nappe découpée sur mesure à domicile",
      "Installez-la directement sur votre table, sans outils",
    ],
    howToUseAr: [
      "قس الطول والعرض الدقيق لطاولتك",
      "أدخل أبعادك وشكل الطاولة عند الطلب",
      "اختر النمط واللون المفضل لديك",
      "استلم غطاءك المقص على المقاس في المنزل",
      "ضعه مباشرة على طاولتك بدون أدوات",
    ],
    faq: [
      {
        question: "Comment prendre les mesures de ma table ?",
        answer:
          "Mesurez la longueur et la largeur de votre table avec un mètre ruban, en ajoutant si besoin quelques centimètres de débord sur chaque côté pour un effet drapé.",
      },
      {
        question: "La nappe résiste-t-elle à la chaleur ?",
        answer:
          "Oui, notre PVC supporte les contacts ponctuels avec des plats tièdes, mais nous recommandons un dessous de plat pour les plats très chauds afin de préserver la nappe sur le long terme.",
      },
      {
        question: "Puis-je choisir un motif personnalisé ?",
        answer:
          "Oui, contactez-nous sur WhatsApp pour découvrir notre catalogue complet de motifs et de couleurs disponibles, et recevoir des conseils personnalisés.",
      },
      {
        question: "Combien de temps faut-il pour recevoir ma nappe sur mesure ?",
        answer:
          "Le délai de fabrication et de livraison est généralement de 2 à 5 jours ouvrés selon votre ville.",
      },
    ],
    faqAr: [
      {
        question: "كيف أقيس طاولتي؟",
        answer: "قس الطول والعرض بشريط القياس، مع إضافة بضعة سنتيمترات إذا أردت تدلياً جانبياً.",
      },
      {
        question: "هل الغطاء مقاوم للحرارة؟",
        answer: "نعم، يتحمل PVC التلامس العرضي مع الأطباق الدافئة، لكن نوصي بوضع حامل طبق للأطباق الساخنة جداً.",
      },
      {
        question: "هل يمكنني اختيار نمط مخصص؟",
        answer: "نعم، تواصل معنا عبر واتساب لاستعراض كتالوج الأنماط والألوان الكامل.",
      },
      {
        question: "كم يستغرق التوصيل للغطاء المقاس المخصص؟",
        answer: "مدة التصنيع والتوصيل من 2 إلى 5 أيام عمل حسب مدينتك.",
      },
    ],
    testimonials: [
      {
        name: "Khadija B.",
        city: "Casablanca",
        review: "Exactement les dimensions demandées, qualité top et livraison rapide !",
        rating: 5,
      },
      {
        name: "Youssef A.",
        city: "Rabat",
        review: "Très facile à nettoyer, parfait pour une famille avec enfants.",
        rating: 5,
      },
      {
        name: "Fatima Z.",
        city: "Fès",
        review: "Le motif est magnifique et correspond parfaitement à ma salle à manger.",
        rating: 4,
      },
    ],
    seoTitle: "Nappe PVC sur mesure - Protection de table élégante au Maroc",
    seoDescription:
      "Commandez votre nappe en PVC sur mesure, résistante et facile à nettoyer. Large choix de motifs, livraison partout au Maroc, paiement à la livraison.",
    pageConfig: { ...fullPageConfig, howToUse: true },
  },
  {
    id: "2",
    slug: "protege-matelas-impermeable",
    name: "Protège-matelas imperméable",
    nameAr: "واقٍ للمرتبة مضاد للماء",
    category: "Protège-matelas",
    categoryAr: "واقيات المراتب",
    shortDescription:
      "Un protège-matelas imperméable, anti-acariens et respirant pour préserver votre matelas des taches et de l'humidité.",
    shortDescriptionAr:
      "واقٍ للمرتبة مضاد للماء والعث وقابل للتنفس، يحافظ على مرتبتك من البقع والرطوبة.",
    longDescription:
      "Notre protège-matelas imperméable forme une barrière efficace contre les liquides, la transpiration et les acariens, tout en restant doux et respirant au contact de la peau. Idéal pour les enfants, les personnes âgées ou simplement pour prolonger la durée de vie de votre matelas, il se glisse facilement grâce à ses élastiques renforcés aux quatre coins et reste parfaitement en place toute la nuit. Disponible dans toutes les tailles standards marocaines, il se lave en machine et sèche rapidement, pour une hygiène irréprochable au quotidien.",
    images: [
      "https://picsum.photos/seed/protege-matelas-impermeable-1/800/800",
      "https://picsum.photos/seed/protege-matelas-impermeable-2/800/800",
      "https://picsum.photos/seed/protege-matelas-impermeable-3/800/800",
    ],
    price: 119,
    fromPrice: true,
    features: [
      "Membrane imperméable et respirante",
      "Surface douce et confortable au contact de la peau",
      "Élastiques renforcés aux quatre coins",
      "Disponible dans toutes les tailles standards",
      "Anti-acariens et antibactérien",
      "Silencieux, sans bruissement de plastique",
    ],
    featuresAr: [
      "غشاء مضاد للماء وقابل للتنفس",
      "سطح ناعم ومريح عند لمس الجلد",
      "مطاطات معززة في الزوايا الأربع",
      "متوفر في جميع الأحجام القياسية",
      "مضاد للعث والبكتيريا",
      "صامت بدون طقطقة بلاستيكية",
    ],
    benefits: [
      "Protection longue durée de votre matelas",
      "Respirant et confortable toute la nuit",
      "Installation facile en quelques secondes",
      "Hygiène garantie contre acariens et bactéries",
      "Lavable en machine pour un entretien simple",
    ],
    benefitsAr: [
      "حماية طويلة الأمد لمرتبتك",
      "قابل للتنفس ومريح طوال الليل",
      "تركيب سهل في ثوانٍ",
      "نظافة مضمونة ضد العث والبكتيريا",
      "قابل للغسيل بالغسالة لصيانة بسيطة",
    ],
    specifications: [
      { label: "Matière", value: "Coton-polyester avec membrane TPU" },
      { label: "Dimensions", value: "90x190, 140x190, 160x200, 180x200 cm" },
      { label: "Couleurs disponibles", value: "Blanc, beige" },
      { label: "Entretien", value: "Lavable en machine à 40°C" },
      { label: "Fermeture", value: "Élastique périphérique renforcé" },
      { label: "Garantie", value: "12 mois" },
    ],
    howToUse: [
      "Choisissez la taille correspondant exactement à votre matelas",
      "Déposez le protège-matelas à plat sur le matelas",
      "Ajustez les élastiques sous chacun des quatre coins",
      "Installez vos draps habituels par-dessus",
    ],
    howToUseAr: [
      "اختر الحجم المطابق تماماً لمرتبتك",
      "ضع الواقي بشكل مستوٍ فوق المرتبة",
      "ثبّت المطاطات تحت كل زاوية من الزوايا الأربع",
      "ضع ملاءاتك العادية فوقه",
    ],
    faq: [
      {
        question: "Le protège-matelas fait-il du bruit pendant la nuit ?",
        answer:
          "Non, notre membrane TPU est conçue pour être silencieuse, contrairement aux protections plastiques classiques qui bruissent.",
      },
      {
        question: "Peut-on le laver en machine ?",
        answer:
          "Oui, il est lavable en machine à 40°C et sèche rapidement à l'air libre, sans perdre ses propriétés imperméables.",
      },
      {
        question: "Convient-il aux personnes allergiques ?",
        answer:
          "Oui, sa membrane anti-acariens et antibactérienne en fait un allié idéal pour les personnes sensibles ou allergiques.",
      },
    ],
    faqAr: [
      {
        question: "هل يُصدر الواقي أصواتاً خلال الليل؟",
        answer: "لا، غشاء TPU مصمم ليكون صامتاً، على عكس الواقيات البلاستيكية التقليدية.",
      },
      {
        question: "هل يمكن غسله بالغسالة؟",
        answer: "نعم، يُغسل عند 40 درجة ويجف سريعاً دون فقدان خصائصه المضادة للماء.",
      },
      {
        question: "هل يناسب الأشخاص المصابين بالحساسية؟",
        answer: "نعم، غشاؤه المضاد للعث والبكتيريا يجعله مثالياً للأشخاص ذوي البشرة الحساسة.",
      },
    ],
    testimonials: [
      {
        name: "Salma T.",
        city: "Marrakech",
        review: "Parfait pour mon enfant, je ne m'inquiète plus des petits accidents nocturnes.",
        rating: 5,
      },
      {
        name: "Hassan M.",
        city: "Fès",
        review: "Très confortable, on ne sent même pas qu'il y a une protection.",
        rating: 4,
      },
    ],
    seoTitle: "Protège-matelas imperméable - Confort et hygiène au Maroc",
    seoDescription:
      "Protège-matelas imperméable, anti-acariens et respirant, toutes tailles disponibles. Livraison rapide partout au Maroc.",
    pageConfig: fullPageConfig,
  },
  {
    id: "3",
    slug: "oreiller-cervical-medical",
    name: "Oreiller cervical médical",
    nameAr: "وسادة عنقية طبية",
    category: "Oreillers médicaux",
    categoryAr: "وسائد طبية",
    shortDescription:
      "Un oreiller ergonomique conçu pour soulager les douleurs cervicales et améliorer votre posture pendant le sommeil.",
    shortDescriptionAr:
      "وسادة بيئية مصممة لتخفيف آلام الرقبة وتحسين وضعية النوم.",
    longDescription:
      "Conçu pour épouser parfaitement les courbes de votre cou et de votre tête, notre oreiller cervical médical aide à réduire les tensions musculaires, les douleurs cervicales et les maux de tête liés à une mauvaise posture nocturne. Sa mousse orthopédique à densité contrôlée offre un double niveau de hauteur, idéal que vous dormiez sur le dos ou sur le côté. Recommandé par des professionnels de la santé, c'est un allié indispensable pour retrouver un sommeil réparateur et se réveiller sans douleurs.",
    images: [
      "https://picsum.photos/seed/oreiller-cervical-medical-1/800/800",
      "https://picsum.photos/seed/oreiller-cervical-medical-2/800/800",
      "https://picsum.photos/seed/oreiller-cervical-medical-3/800/800",
    ],
    price: 250,
    features: [
      "Forme ergonomique à double hauteur",
      "Soutien optimal de la nuque et des cervicales",
      "Mousse orthopédique à densité contrôlée",
      "Housse amovible et lavable",
      "Convient à la position dorsale et latérale",
      "Recommandé pour les douleurs cervicales chroniques",
    ],
    featuresAr: [
      "شكل بيئي بارتفاع مزدوج",
      "دعم مثالي للرقبة والفقرات العنقية",
      "إسفنج تقويمي بكثافة محكومة",
      "غطاء قابل للفك والغسيل",
      "مناسب لوضعية النوم على الظهر والجانب",
      "موصى به لآلام الرقبة المزمنة",
    ],
    benefits: [
      "Soulage durablement les douleurs cervicales",
      "Améliore la posture pendant le sommeil",
      "Favorise un sommeil profond et réparateur",
      "Qualité médicale validée par des professionnels",
      "Réduit les maux de tête liés à une mauvaise posture",
    ],
    benefitsAr: [
      "يخفف آلام الرقبة بشكل مستمر",
      "يحسن وضعية الجسم أثناء النوم",
      "يعزز النوم العميق والمريح",
      "جودة طبية معتمدة من المختصين",
      "يقلل الصداع الناتج عن وضعية خاطئة",
    ],
    specifications: [
      { label: "Matière", value: "Mousse orthopédique haute densité" },
      { label: "Dimensions", value: "50 x 30 x 12/9 cm" },
      { label: "Housse", value: "Coton respirant, déhoussable" },
      { label: "Couleurs disponibles", value: "Blanc, gris clair" },
      { label: "Entretien", value: "Housse lavable en machine, mousse non immergeable" },
      { label: "Recommandation", value: "Validé par des kinésithérapeutes" },
      { label: "Garantie", value: "18 mois" },
    ],
    howToUse: [
      "Placez l'oreiller selon votre position de sommeil habituelle",
      "Utilisez le côté le plus haut pour dormir sur le dos",
      "Utilisez le côté le plus bas pour dormir sur le côté",
      "Laissez votre nuque s'adapter pendant quelques nuits",
      "Nettoyez régulièrement la housse pour une hygiène optimale",
    ],
    howToUseAr: [
      "ضع الوسادة حسب وضعية نومك المعتادة",
      "استخدم الجانب الأعلى للنوم على الظهر",
      "استخدم الجانب الأقل ارتفاعاً للنوم على الجانب",
      "اترك رقبتك تتأقلم خلال بضع ليالٍ",
      "نظف الغطاء بانتظام للحفاظ على النظافة المثلى",
    ],
    faq: [
      {
        question: "Combien de temps avant de ressentir les bienfaits ?",
        answer:
          "La plupart de nos clients ressentent une amélioration dès la première semaine d'utilisation régulière, le temps que la nuque s'adapte à la nouvelle forme.",
      },
      {
        question: "L'oreiller convient-il aux enfants ?",
        answer:
          "Cet oreiller est conçu pour les adultes. Nous recommandons un avis médical avant toute utilisation chez l'enfant.",
      },
      {
        question: "Quelle est la différence avec un oreiller classique ?",
        answer:
          "Contrairement à un oreiller classique, sa forme ergonomique à double hauteur soutient spécifiquement la courbe cervicale, réduisant les tensions musculaires.",
      },
    ],
    faqAr: [
      {
        question: "كم من الوقت قبل الشعور بالفائدة؟",
        answer: "يشعر معظم عملائنا بتحسن خلال الأسبوع الأول من الاستخدام المنتظم.",
      },
      {
        question: "هل الوسادة مناسبة للأطفال؟",
        answer: "هذه الوسادة مصممة للبالغين. نوصي باستشارة طبية قبل استخدامها للأطفال.",
      },
      {
        question: "ما الفرق عن الوسادة العادية؟",
        answer: "خلافاً للوسادة العادية، شكلها البيئي المزدوج يدعم منحنى الرقبة تحديداً ويقلل التوتر العضلي.",
      },
    ],
    testimonials: [
      {
        name: "Nadia L.",
        city: "Tanger",
        review: "Mes douleurs au cou ont nettement diminué après deux semaines.",
        rating: 5,
      },
      {
        name: "Omar K.",
        city: "Agadir",
        review: "Très bon soutien, je le recommande à toute personne qui travaille sur écran.",
        rating: 5,
      },
      {
        name: "Leila H.",
        city: "Casablanca",
        review: "Je me réveille enfin sans raideur dans le cou, un vrai changement.",
        rating: 4,
      },
    ],
    seoTitle: "Oreiller cervical médical - Soulagement et confort au Maroc",
    seoDescription:
      "Oreiller cervical ergonomique pour soulager les douleurs au cou et améliorer votre posture de sommeil. Livraison partout au Maroc.",
    pageConfig: fullPageConfig,
  },
  {
    id: "4",
    slug: "oreiller-memoire-forme",
    name: "Oreiller mémoire de forme",
    nameAr: "وسادة إسفنج الذاكرة",
    category: "Oreillers médicaux",
    categoryAr: "وسائد طبية",
    shortDescription:
      "Un oreiller en mousse à mémoire de forme qui s'adapte parfaitement à la morphologie de votre tête et de votre cou.",
    shortDescriptionAr:
      "وسادة إسفنج الذاكرة تتكيف تماماً مع شكل رأسك ورقبتك لراحة لا مثيل لها.",
    longDescription:
      "Notre oreiller à mémoire de forme utilise une mousse viscoélastique haute qualité qui réagit à la chaleur et à la pression de votre corps pour offrir un soutien parfaitement personnalisé. Il retrouve sa forme initiale après chaque utilisation, garantissant un confort constant nuit après nuit, tout en réduisant les points de pression sur la tête, le cou et les épaules. Sa housse respirante et amovible se lave facilement, pour un confort durable et une hygiène irréprochable.",
    images: [
      "https://picsum.photos/seed/oreiller-memoire-forme-1/800/800",
      "https://picsum.photos/seed/oreiller-memoire-forme-2/800/800",
      "https://picsum.photos/seed/oreiller-memoire-forme-3/800/800",
    ],
    price: 199,
    fromPrice: true,
    features: [
      "Mousse à mémoire de forme viscoélastique",
      "S'adapte à la chaleur et à la pression du corps",
      "Réduction notable des points de pression",
      "Housse respirante et amovible",
      "Hypoallergénique et anti-acariens",
      "Retrouve sa forme initiale après chaque utilisation",
    ],
    featuresAr: [
      "إسفنج لزج بذاكرة الشكل",
      "يتكيف مع حرارة الجسم وضغطه",
      "تقليل ملحوظ لنقاط الضغط",
      "غطاء قابل للتنفس والفك",
      "مضاد للحساسية ومضاد للعث",
      "يستعيد شكله الأصلي بعد كل استخدام",
    ],
    benefits: [
      "Confort personnalisé selon votre morphologie",
      "Soutien durable nuit après nuit",
      "Réduit les douleurs cervicales et les tensions",
      "Hypoallergénique, adapté aux peaux sensibles",
      "Housse amovible facile à laver",
    ],
    benefitsAr: [
      "راحة مخصصة حسب بنية جسمك",
      "دعم دائم ليلة بعد ليلة",
      "يقلل آلام الرقبة والتوترات",
      "مضاد للحساسية، مناسب للبشرة الحساسة",
      "غطاء قابل للفك وسهل الغسيل",
    ],
    specifications: [
      { label: "Matière", value: "Mousse viscoélastique à mémoire de forme" },
      { label: "Dimensions", value: "60 x 40 x 12 cm" },
      { label: "Housse", value: "Tissu respirant amovible" },
      { label: "Couleurs disponibles", value: "Blanc, gris" },
      { label: "Entretien", value: "Housse lavable en machine, mousse non immergeable" },
      { label: "Certification", value: "Sans substances nocives" },
      { label: "Garantie", value: "18 mois" },
    ],
    howToUse: [
      "Posez l'oreiller à plat quelques heures avant la première utilisation",
      "Installez-le sur votre lit",
      "Laissez la mousse s'adapter à la chaleur de votre corps",
      "Profitez d'un soutien personnalisé chaque nuit",
    ],
    howToUseAr: [
      "ضع الوسادة مسطحة لبضع ساعات قبل الاستخدام الأول",
      "ضعها على سريرك",
      "اترح الإسفنج يتكيف مع حرارة جسمك",
      "استمتع بدعم مخصص كل ليلة",
    ],
    faq: [
      {
        question: "L'oreiller dégage-t-il une odeur au début ?",
        answer:
          "Une légère odeur peut être présente à l'ouverture, elle disparaît après aération de quelques heures dans une pièce ventilée.",
      },
      {
        question: "Convient-il aux personnes allergiques ?",
        answer: "Oui, notre mousse est hypoallergénique et résiste naturellement aux acariens.",
      },
      {
        question: "Faut-il un temps d'adaptation ?",
        answer:
          "Oui, comptez quelques nuits pour que la mousse s'adapte parfaitement à la morphologie de votre tête et de votre cou.",
      },
    ],
    faqAr: [
      {
        question: "هل تُصدر الوسادة رائحة في البداية؟",
        answer: "قد تكون هناك رائحة خفيفة عند الفتح تختفي بعد تهوية بضع ساعات.",
      },
      {
        question: "هل تناسب الأشخاص المصابين بالحساسية؟",
        answer: "نعم، إسفنجنا مضاد للحساسية ويقاوم العث بشكل طبيعي.",
      },
      {
        question: "هل هناك وقت للتأقلم؟",
        answer: "نعم، خذ بضع ليالٍ ليتكيف الإسفنج تماماً مع شكل رأسك ورقبتك.",
      },
    ],
    testimonials: [
      {
        name: "Imane R.",
        city: "Casablanca",
        review: "Le meilleur oreiller que j'ai eu, je me réveille sans douleurs au cou.",
        rating: 5,
      },
      {
        name: "Karim S.",
        city: "Agadir",
        review: "Très confortable et la housse se lave facilement.",
        rating: 4,
      },
    ],
    seoTitle: "Oreiller mémoire de forme - Confort sur mesure au Maroc",
    seoDescription:
      "Oreiller à mémoire de forme viscoélastique pour un soutien personnalisé et un sommeil de qualité. Livraison rapide partout au Maroc.",
    pageConfig: fullPageConfig,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
