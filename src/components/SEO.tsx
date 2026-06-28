import React from "react";
import { Helmet } from "react-helmet-async";
import { Language } from "../types";

interface SEOProps {
  currentLang: Language;
  activeView: string;
}

interface MetaContent {
  title: string;
  description: string;
  keywords: string;
}

const SEO_DATA: Record<Language, Record<string, MetaContent>> = {
  en: {
    home: {
      title: "Ghader Tourism | Premium Tours, Airport Transfers & VIP Chauffeur in Lebanon",
      description: "Embark on bespoke guided tours & professional private transfers with Ghader Tourism. 20+ years of local luxury transport expertise in Beirut, Lebanon.",
      keywords: "lebanon private chauffeur, vip taxi beirut, lebanon guided tours, beirut airport transfer, ghader tourism, luxury car rental beirut, sightseeing lebanon"
    },
    transfers: {
      title: "VIP Airport Transfers & Luxury Chauffeur Lebanon | Ghader Tourism",
      description: "Premium private airport transfers and VIP chauffeur services from Beirut Rafic Hariri Airport. No hidden surcharges, 24/7 dispatcher, and flight tracking.",
      keywords: "beirut airport pickup, luxury transfer beirut, private taxi beirut airport, lebanon VIP driver, executive transport lebanon"
    },
    tours: {
      title: "Bespoke Guided Tours & Historical Sightseeing in Lebanon | Ghader Tourism",
      description: "Book custom daily excursions in Lebanon. Explore the majestic Baalbek temples, Jeita Grotto, Byblos Castle, and cedar forests in luxury private cars.",
      keywords: "lebanon private tours, sightseeing lebanon, baalbek tour guide, jeita grotto excursion, byblos private tour"
    },
    fleet: {
      title: "Our Executive Luxury Fleet - Premium Cars & SUV Rentals | Ghader Tourism",
      description: "Browse our impeccable fleet of latest premium Mercedes-Benz, executive SUVs, and family luxury vans. Complete with professional, multilingual chauffeurs.",
      keywords: "mercedes rental beirut, luxury SUV chauffeur lebanon, luxury van hire beirut, vip cars lebanon"
    },
    about: {
      title: "About Ghader Tourism | 20+ Years of Luxury Travel in Lebanon",
      description: "Discover our heritage of luxury tourism in Lebanon. Certified private transportation, specialized guides, and 24/7 dedicated travel support since 2000.",
      keywords: "ghader tourism history, luxury travel company lebanon, reputable tour operator beirut"
    },
    booking: {
      title: "Book Private Chauffeur & Custom Tours Online | Ghader Tourism",
      description: "Reserve your premium private transfers or custom sightseeing tours in Lebanon. Secure checkout, customizable itineraries, and instant expert support.",
      keywords: "book beirut taxi, book private driver lebanon, reserve tour beirut"
    },
    contact: {
      title: "Contact Ghader Tourism | 24/7 VIP Travel Desk Lebanon",
      description: "Get in touch with our expert travel desk. Live support for customized tour itineraries, hotel transfers, and corporate executive travel in Lebanon.",
      keywords: "contact ghader tourism, beirut private chauffeur phone, vip travel desk lebanon"
    }
  },
  ar: {
    home: {
      title: "غادِر للسياحة | جولات سياحية خاصة، توصيلات مطار وسائق خاص كبار الشخصيات",
      description: "استكشف لبنان من خلال جولات سياحية خاصة وتوصيلات مطار فاخرة مع غادِر للسياحة. خبرة أكثر من ٢٠ عاماً في النقل السياحي الفاخر في بيروت وجميع المناطق.",
      keywords: "سائق خاص لبنان، توصيل مطار بيروت، جولات سياحية لبنان، غادر للسياحة، تاكسي فاخر بيروت، تأجير سيارات مع سائق"
    },
    transfers: {
      title: "توصيلات المطار وسائق خاص كبار الشخصيات VIP | غادِر للسياحة",
      description: "خدمات استقبال وتوصيل فاخرة من وإلى مطار بيروت الدولي. سائق بانتظارك داخل المطار، تتبع مجاني لرحلات الطيران، وأعلى مستويات الأمان والخصوصية.",
      keywords: "توصيل مطار بيروت، سائق خاص كبار الشخصيات، تاكسي VIP بيروت، تتبع الطيران مطار رفيق الحريري"
    },
    tours: {
      title: "جولات سياحية خاصة ورحلات يومية في لبنان | غادِر للسياحة",
      description: "احجز رحلاتك السياحية الخاصة في لبنان. اكتشف معابد بعلبك الرومانية، مغارة جعيتا، قلعة جبيل، وغابات الأرز الخلابة برفقة سائقين مرشدين محترفين.",
      keywords: "جولات سياحية خاصة، رحلة بعلبك، جعيتا وجبيل، سياحة لبنان، حجز مرشد سياحي لبنان"
    },
    fleet: {
      title: "أسطول سياراتنا الفاخرة والحديثة - غادِر للسياحة",
      description: "تصفح أسطولنا المميز من سيارات مرسيدس الفاخرة، وسيارات الدفع الرباعي العائلية الـ SUV، والفانات السياحية المجهزة بالكامل لراحة ورفاهية عملائنا.",
      keywords: "تأجير مرسيدس بيروت، سيارات فاخرة مع سائق لبنان، فان سياحي بيروت"
    },
    about: {
      title: "من نحن | غادِر للسياحة وخبرة ٢٠+ عاماً من التميز في لبنان",
      description: "تعرف على مسيرتنا في تقديم أرقى خدمات النقل السياحي والرحلات الخاصة في لبنان. شركة مرخصة ومعتمدة تضمن أمان وخصوصية رحلتك على مدار الساعة.",
      keywords: "شركة غادر للسياحة، سياحة وسفر لبنان، تاريخ غادر للسياحة"
    },
    booking: {
      title: "احجز رحلتك أو توصيلة المطار مباشرة | غادِر للسياحة",
      description: "منصة حجز سهلة وسريعة لتوصيلات المطار والرحلات السياحية الخاصة في لبنان. حدد تفاصيل رحلتك واحصل على تسعيرة فورية وتأكيد سريع.",
      keywords: "حجز تاكسي بيروت، حجز سائق خاص، تأكيد جولة سياحية لبنان"
    },
    contact: {
      title: "اتصل بنا | مكتب خدمة العملاء والمساعدة ٢٤/٧ | غادِر للسياحة",
      description: "تواصل معنا في أي وقت للحصول على دعم مخصص وتنسيق رحلاتك في لبنان. نحن متاحون على مدار الساعة لخدمة كبار الشخصيات ورجال الأعمال.",
      keywords: "رقم غادر للسياحة، حجز سائق بيروت واتساب، دعم سياحي لبنان"
    }
  },
  fr: {
    home: {
      title: "Ghader Tourism | Circuits Touristiques & Chauffeur Privé VIP au Liban",
      description: "Vivez des moments d'exception avec nos excursions guidées sur mesure et nos transferts privés de prestige. Ghader Tourism, expert du transport VIP au Liban depuis 20 ans.",
      keywords: "chauffeur privé liban, transfert aéroport beyrouth, circuit touristique guidé liban, ghader tourism, voiture luxe beyrouth"
    },
    transfers: {
      title: "Transferts Aéroport VIP & Chauffeur de Prestige Liban | Ghader Tourism",
      description: "Service haut de gamme de transfert depuis l'Aéroport de Beyrouth (BEY). Accueil personnalisé, suivi des vols en temps réel, chauffeurs bilingues et confort optimal.",
      keywords: "transfert vip aéroport beyrouth, chauffeur prestige liban, taxi privé aéroport liban"
    },
    tours: {
      title: "Circuits Touristiques Guidés & Excursions Sur Mesure au Liban | Ghader Tourism",
      description: "Réservez vos excursions privées au Liban. Explorez Baalbek, la Grotte de Jeita, Byblos et les Cèdres millénaires dans le confort absolu de nos véhicules de luxe.",
      keywords: "excursion privée liban, visiter baalbek, guide francophone liban, circuit touristique beyrouth"
    },
    fleet: {
      title: "Notre Flotte de Prestige - Voitures de Luxe & SUV Executif | Ghader Tourism",
      description: "Découvrez notre gamme de véhicules récents et parfaitement entretenus : Mercedes-Benz Classe E/S, SUV spacieux et Vans de luxe pour vos déplacements professionnels et privés.",
      keywords: "louer mercedes beyrouth, van luxe liban, voiture chauffeur privé beyrouth"
    },
    about: {
      title: "À Propos de Ghader Tourism | 20 Ans d'Excellence au Liban",
      description: "Notre histoire et nos engagements pour un tourisme de prestige au Liban. Services de transport accrédités, chauffeurs certifiés et assistance sur mesure 24h/24.",
      keywords: "histoire ghader tourism, agence transport prestige liban, voyage sur mesure beyrouth"
    },
    booking: {
      title: "Réservez Votre Chauffeur Privé & Circuit en Ligne | Ghader Tourism",
      description: "Réservez facilement et en toute sécurité vos transferts d'affaires ou vos excursions touristiques privées au Liban. Devis en ligne et assistance immédiate.",
      keywords: "réserver taxi beyrouth, réserver chauffeur privé liban, réservation circuit liban"
    },
    contact: {
      title: "Contactez Ghader Tourism | Bureau d'Assistance VIP 24h/24",
      description: "Contactez notre équipe d'experts pour planifier votre voyage sur mesure au Liban. Assistance téléphonique et WhatsApp disponible 24/7 pour nos clients VIP.",
      keywords: "contact ghader tourism, numéro chauffeur liban, assistance voyage beyrouth"
    }
  }
};

export default function SEO({ currentLang, activeView }: SEOProps) {
  // Safe lookup with home as fallback if view not defined
  const viewKey = SEO_DATA[currentLang]?.[activeView] ? activeView : "home";
  const { title, description, keywords } = SEO_DATA[currentLang][viewKey] || SEO_DATA[currentLang]["home"];

  // Absolute URL for canonical & open graph tags (fallback using development host or standard domain)
  const siteUrl = "https://ghadertourism.com"; 
  const currentUrl = `${siteUrl}${activeView !== "home" ? `/#${activeView}` : ""}`;
  
  // Use professional banner or scenic photo as og:image
  const ogImageUrl = `${siteUrl}/src/assets/images/lebanon_luxury_chauffeur_hero_1782464049590.jpg`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ghader Tourism" />
      <meta name="robots" content="index, follow" />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}`} />
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}`} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={currentLang === "ar" ? "ar_LB" : currentLang === "fr" ? "fr_FR" : "en_US"} />
      <meta property="og:site_name" content="Ghader Tourism" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}
