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

const SITE_URL = "https://ghadertourism.com";
const OG_IMAGE_URL = `${SITE_URL}/og-image.svg`;

const SEO_DATA: Record<Language, Record<string, MetaContent>> = {
  en: {
    home: {
      title: "Private Chauffeur Lebanon & VIP Airport Transfer Beirut | Ghader Tourism",
      description: "Premium private chauffeur service in Lebanon and VIP airport transfers in Beirut. Book airport taxis, luxury drivers, and guided private tours with 24/7 support.",
      keywords: "private chauffeur lebanon, vip airport transfer beirut, private driver lebanon, beirut airport taxi, lebanon tours, luxury taxi lebanon, private driver beirut"
    },
    transfers: {
      title: "VIP Airport Transfer Beirut & Private Taxi Lebanon | Ghader Tourism",
      description: "Reserve a private airport taxi in Beirut with meet and greet, flight tracking, and premium executive vehicles for Beirut, Byblos, Faraya, Baalbek and beyond.",
      keywords: "vip airport transfer beirut, private taxi lebanon, beirut airport transfer, private driver lebanon, airport taxi beirut"
    },
    tours: {
      title: "Guided Lebanon Tours, Jeita, Byblos & Baalbek | Ghader Tourism",
      description: "Explore Lebanon with private guided tours to Jeita Grotto, Byblos, Batroun, Baalbek, Cedars, and scenic mountain routes with a professional local chauffeur.",
      keywords: "guided lebanon tours, private tours lebanon, jeita tour, byblos tour, baalbek tour, cedars tour, tour guide lebanon"
    },
    fleet: {
      title: "Luxury Fleet for Airport Transfers & Private Tours | Ghader Tourism",
      description: "Browse our executive sedans, premium SUVs, and family vans for private transfers, airport pickups, and luxury Lebanon travel.",
      keywords: "luxury fleet lebanon, executive sedan lebanon, suv with driver lebanon, vip van lebanon, private chauffeur lebanon"
    },
    about: {
      title: "About Ghader Tourism | Premium Lebanon Transportation & Tours",
      description: "Learn about Ghader Tourism, a trusted Lebanon transportation provider with 25+ years of experience in airport transfers, private drivers and guided tours.",
      keywords: "ghader tourism, lebanon transportation, private driver lebanon, luxury tourism lebanon, airport transfer beirut"
    },
    contact: {
      title: "Contact Ghader Tourism | 24/7 Beirut Airport Taxi & Tour Support",
      description: "Reach Ghader Tourism for airport transfers, private drivers, customized tours, and VIP chauffeur support in Lebanon.",
      keywords: "contact ghader tourism, beirut airport taxi, private chauffeur lebanon, vip taxi lebanon, lebanon travel support"
    },
    reviews: {
      title: "Guest Reviews & Trusted Transfer Service in Lebanon | Ghader Tourism",
      description: "Read about our trusted airport transfer and private chauffeur service in Lebanon from guests who rely on us for safe, comfortable travel.",
      keywords: "ghader tourism reviews, beirut airport transfer reviews, private driver lebanon reviews"
    }
  },
  ar: {
    home: {
      title: "تاكسي مطار بيروت وسائق خاص VIP في لبنان | غادِر للسياحة",
      description: "خدمات سائق خاص فاخرة في لبنان وتوصيل VIP من وإلى مطار بيروت مع أسعار ثابتة ودعم على مدار الساعة.",
      keywords: "سائق خاص لبنان, تاكسي مطار بيروت, سائق خاص بيروت, جولات لبنان, تاكسي فاخر لبنان"
    },
    transfers: {
      title: "تاكسي مطار بيروت VIP وتوصيلات خاصة في لبنان | غادِر للسياحة",
      description: "احجز تاكسي مطار خاص في بيروت مع استقبال في المطار وتتبع رحلات ومركبات فاخرة إلى جبيل وفاريا وبعلبك.",
      keywords: "توصيل مطار بيروت, تاكسي خاص لبنان, سائق خاص لبنان, تاكسي VIP بيروت"
    },
    tours: {
      title: "جولات سياحية خاصة في لبنان | غادِر للسياحة",
      description: "استكشف لبنان مع جولات خاصة إلى جعيتا وجبيل وبعلبك والأرز مع سائق محلي محترف وخبرة محلية.",
      keywords: "جولات سياحية خاصة لبنان, جولة جعيتا, جولة جبيل, جولة بعلبك, مرشد سياحي لبنان"
    },
    fleet: {
      title: "أسطول فخم للنقل الخاص والسياحي في لبنان | غادِر للسياحة",
      description: "تصفح سيارات إكزكيوتيڤ وSUVs وفانات فاخرة لرحلات المطار والرحلات الخاصة في لبنان.",
      keywords: "أسطول فخم لبنان, سيارة فاخرة مع سائق, SUV لبنان, فان VIP لبنان"
    },
    about: {
      title: "عن غادِر للسياحة | نقل سياحي فاخر في لبنان",
      description: "تعرف على غادِر للسياحة، مزود موثوق للنقل في لبنان مع خبرة تتجاوز 25 عاماً في التوصيل والسياحة الخاصة.",
      keywords: "غادر للسياحة, نقل لبنان, سائق خاص لبنان, سياحة فاخرة لبنان"
    },
    contact: {
      title: "تواصل مع غادِر للسياحة | دعم 24/7 لحجز التاكسي والم Tours",
      description: "تواصل معنا لحجز تاكسي المطار، السائق الخاص، الجولات المخصصة وخدمات VIP في لبنان.",
      keywords: "تواصل غادر للسياحة, تاكسي مطار بيروت, سائق خاص لبنان, تاكسي VIP لبنان"
    },
    reviews: {
      title: "تقييمات العملاء وخدمة موثوقة في لبنان | غادِر للسياحة",
      description: "اطلع على تقييمات العملاء حول خدماتنا الموثوقة في النقل الخاص وتأجير السائقين في لبنان.",
      keywords: "تقييمات غادر للسياحة, تاكسي مطار بيروت تقييمات"
    }
  },
  fr: {
    home: {
      title: "Chauffeur Privé au Liban & Transfert VIP Aéroport Beyrouth | Ghader Tourism",
      description: "Service de chauffeur privé premium au Liban et transferts VIP de l'aéroport de Beyrouth avec assistance 24/7.",
      keywords: "chauffeur privé liban, transfert vip aéroport beyrouth, taxi aéroport beyrouth, excursion liban, taxi luxe liban"
    },
    transfers: {
      title: "Transfert VIP Aéroport Beyrouth & Taxi Privé Liban | Ghader Tourism",
      description: "Réservez un taxi privé depuis Beyrouth avec accueil en terminal, suivi de vols et véhicules premium vers Byblos, Faraya et Baalbek.",
      keywords: "transfert vip aéroport beyrouth, taxi privé liban, chauffeur privé liban, taxi aéroport beyrouth"
    },
    tours: {
      title: "Circuits Privés au Liban, Jeita, Byblos & Baalbek | Ghader Tourism",
      description: "Découvrez le Liban avec des circuits privés vers Jeita, Byblos, Batroun, Baalbek, les Cèdres et les routes de montagne.",
      keywords: "circuits privés liban, excursion jeita, excursion byblos, excursion baalbek, guide liban"
    },
    fleet: {
      title: "Flotte de Luxe pour Transferts & Circuits Privés | Ghader Tourism",
      description: "Découvrez nos berlines, SUV premium et vans familiaux pour vos transferts aéroport et voyages privés au Liban.",
      keywords: "flotte luxe liban, berline chauffeur liban, suv avec chauffeur liban, van vip liban"
    },
    about: {
      title: "À Propos de Ghader Tourism | Transport Premium au Liban",
      description: "Découvrez Ghader Tourism, un fournisseur de transport au Liban reconnu pour ses transferts, chauffeurs privés et circuits guidés.",
      keywords: "ghader tourism, transport liban, chauffeur privé liban, tourisme luxe liban"
    },
    contact: {
      title: "Contactez Ghader Tourism | Support 24/7 pour Taxi & Tours",
      description: "Contactez Ghader Tourism pour vos transferts aéroport, chauffeurs privés, circuits personnalisés et services VIP au Liban.",
      keywords: "contact ghader tourism, taxi aéroport beyrouth, chauffeur privé liban, taxi vip liban"
    },
    reviews: {
      title: "Avis Clients & Service de Confiance au Liban | Ghader Tourism",
      description: "Consultez les avis clients sur notre service de transfert et chauffeur privé au Liban.",
      keywords: "avis ghader tourism, transfert aéroport beyrouth avis"
    }
  }
};

const getRouteForView = (view: string) => (view === "home" ? "/" : `/${view}`);

export default function SEO({ currentLang, activeView }: SEOProps) {
  const viewKey = SEO_DATA[currentLang]?.[activeView] ? activeView : "home";
  const { title, description, keywords } = SEO_DATA[currentLang][viewKey] || SEO_DATA[currentLang].home;
  const currentPath = getRouteForView(viewKey);
  const canonicalUrl = `${SITE_URL}${currentPath}`;
  const locale = currentLang === "ar" ? "ar_LB" : currentLang === "fr" ? "fr_FR" : "en_US";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ghader Tourism",
    "url": SITE_URL,
    "logo": `${SITE_URL}/favicon.svg`,
    "description": description,
    "sameAs": ["https://instagram.com/ghadertourism", "https://facebook.com/ghadertourism", "https://tiktok.com/@ghadertourism"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+9613460865",
      "contactType": "customer service",
      "email": "ghadertourism@gmail.com",
      "areaServed": "LB",
      "availableLanguage": ["English", "Arabic", "French"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Private Airport Transfer and VIP Chauffeur Service in Lebanon",
    "serviceType": "Airport transfer, private chauffeur, luxury tourism transportation",
    "provider": {
      "@type": "Organization",
      "name": "Ghader Tourism",
      "url": SITE_URL
    },
    "areaServed": ["Lebanon", "Beirut", "Byblos", "Faraya", "Baalbek"],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Ghader Tourism",
    "url": SITE_URL,
    "image": OG_IMAGE_URL,
    "description": description,
    "telephone": "+9613460865",
    "email": "ghadertourism@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ghader Tourism",
    "image": OG_IMAGE_URL,
    "url": SITE_URL,
    "telephone": "+9613460865",
    "email": "ghadertourism@gmail.com",
    "priceRange": "$$",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ghader Tourism",
    "url": SITE_URL,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": viewKey.charAt(0).toUpperCase() + viewKey.slice(1), "item": canonicalUrl }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a tour or private transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reserve directly through WhatsApp, phone, or by using our contact form for airport transfers, private chauffeur bookings, and guided Lebanon tours."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer airport transfers in Beirut?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Ghader Tourism provides premium Beirut airport transfers with meet and greet service, flight tracking, and private executive vehicles."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize a Lebanon tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We can tailor private tours to Jeita, Byblos, Baalbek, Cedars, Batroun, and other destinations across Lebanon."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide private drivers in Lebanon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We provide private drivers in Beirut and across Lebanon for transfers, sightseeing, corporate travel, and luxury day trips."
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ghader Tourism" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta httpEquiv="content-language" content={currentLang === "ar" ? "ar" : currentLang === "fr" ? "fr" : "en"} />
      <meta name="theme-color" content="#05070b" />
      <meta name="last-modified" content="2026-07-05T00:00:00Z" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="ar" href={SITE_URL} />
      <link rel="alternate" hrefLang="fr" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Ghader Tourism" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={OG_IMAGE_URL} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(travelAgencySchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
