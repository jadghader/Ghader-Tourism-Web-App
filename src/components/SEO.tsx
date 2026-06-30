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
      title: "Private Chauffeur Lebanon & VIP Airport Transfer Beirut | Ghader Tourism",
      description: "Elite Private Chauffeur Lebanon & 24/7 VIP Airport Transfer Beirut. Book premier private taxi services, executive airport pickups, and Guided Lebanon Tours with transparent flat rates and 25+ years of expertise.",
      keywords: "Private Chauffeur Lebanon, VIP Airport Transfer Beirut, Guided Lebanon Tours, beirut airport taxi, private driver lebanon, vip taxi beirut, private chauffeur beirut, lebanon tours, car hire with driver lebanon, beirut airport transfers, luxury taxi lebanon, faraya taxi, byblos taxi, private driver beirut"
    },
    transfers: {
      title: "VIP Airport Transfer Beirut & Premium Taxi Services | Ghader Tourism",
      description: "Book reliable, premium VIP Airport Transfer Beirut and elite Private Chauffeur Lebanon. 24/7 airport taxi pickup at Beirut Rafic Hariri Airport (BEY) with free flight tracking and meets-and-greets.",
      keywords: "VIP Airport Transfer Beirut, Private Chauffeur Lebanon, Guided Lebanon Tours, beirut airport pickup, luxury taxi beirut, private taxi beirut airport, lebanon VIP driver, executive transport lebanon, taxi faraya airport, airport transit beirut, beirut hotel pickup taxi"
    },
    tours: {
      title: "Guided Lebanon Tours & Private Custom Sightseeing | Ghader Tourism",
      description: "Embark on bespoke Guided Lebanon Tours. Hire a top Private Chauffeur Lebanon to explore majestic Baalbek ruins, Jeita Grotto, historic Byblos, and ancient Cedar forests in premium SUVs and sedans.",
      keywords: "Guided Lebanon Tours, Private Chauffeur Lebanon, VIP Airport Transfer Beirut, lebanon private tours, sightseeing lebanon, baalbek tour guide, jeita grotto excursion, byblos private tour, cedars of god bcharre tour, custom tours lebanon, private driver guide lebanon"
    },
    fleet: {
      title: "Our Premium Luxury Fleet - Executive Sedan & SUV Rentals | Ghader Tourism",
      description: "Browse our impeccable fleet of latest premium Mercedes-Benz, executive SUVs, and family luxury vans. Complete with professional, multilingual private chauffeurs across Lebanon.",
      keywords: "mercedes rental beirut, luxury SUV driver lebanon, luxury van hire beirut, vip cars lebanon, private luxury transport lebanon, family minivan lebanon, sprinters vip beirut"
    },
    about: {
      title: "About Ghader Tourism | 25+ Years of Elite Transportation in Lebanon",
      description: "Discover our family heritage of luxury tourism and private transportation in Lebanon. Certified airport terminal access permits, specialized local driver guides, and 24/7 travel desk since 2000.",
      keywords: "ghader tourism history, luxury travel company lebanon, reputable tour operator beirut, professional taxi service lebanon, secure transport beirut"
    },
    booking: {
      title: "Book Private Drivers & Beirut Airport Taxi Online | Ghader Tourism",
      description: "Reserve your premium private taxi or custom sightseeing tour in Lebanon. Quick 5-step online booking with instant WhatsApp validation and transparent flat rates.",
      keywords: "book beirut taxi, book private driver lebanon, reserve tour beirut, airport taxi reservation lebanon, hire chauffeur online beirut"
    },
    contact: {
      title: "Contact Ghader Tourism | 24/7 VIP Chauffeur Help Desk Lebanon",
      description: "Get in touch with our live travel support. 24/7 helpline for customized tour itineraries, airport taxi bookings, hotel transfers, and corporate executive travel in Lebanon.",
      keywords: "contact ghader tourism, beirut private driver phone, vip travel desk lebanon, hire driver beirut whatsapp, contact airport taxi beirut"
    }
  },
  ar: {
    home: {
      title: "تاكسي مطار بيروت وسائق خاص كبار الشخصيات VIP لبنان | غادِر للسياحة",
      description: "احجز تاكسي مطار بيروت وسائق خاص كبار الشخصيات VIP في جميع أنحاء لبنان على مدار الساعة. خبرة تفوق ٢٥ عاماً، أسعار ثابتة ومراقبة رحلات الطيران مجاناً. جولات سياحية خاصة وعائلية فاخرة.",
      keywords: "تاكسي مطار بيروت, سائق خاص في لبنان, توصيل مطار بيروت, تاكسي فاخر لبنان, حجز سائق بيروت, جولات سياحية لبنان, سائق سياحي بيروت, تاكسي فاريا, تاكسي جبيل"
    },
    transfers: {
      title: "تاكسي المطار وسائق خاص كبار الشخصيات VIP | غادِر للسياحة",
      description: "خدمات استقبال وتاكسي فاخر مخصص من وإلى مطار رفيق الحريري الدولي ببيروت. سائق بانتظارك داخل المطار بلوحة اسمك، تتبع مباشر لرحلات الطيران مجاناً، وأقصى درجات الأمان.",
      keywords: "توصيل مطار بيروت, سائق خاص كبار الشخصيات, تاكسي VIP بيروت, تتبع الطيران مطار رفيق الحريري, تاكسي خاص مطار بيروت, حجز سيارة سائق مطار بيروت"
    },
    tours: {
      title: "جولات سياحية خاصة ورحلات يومية في لبنان | غادِر للسياحة",
      description: "احجز رحلاتك السياحية الخاصة في لبنان. اكتشف معابد بعلبك الرومانية، مغارة جعيتا الخلابة، قلعة جبيل التاريخية، وغابات الأرز الساحرة برفقة سائقين محليين ومرشدين خبراء.",
      keywords: "جولات سياحية خاصة, رحلة بعلبك, جعيتا وجبيل, سياحة لبنان, حجز مرشد سياحي لبنان, جولة سياحية خاصة لبنان, معالم لبنان السياحية"
    },
    fleet: {
      title: "سياراتنا الفاخرة والحديثة وسيارات الدفع الرباعي والـ SUV | غادِر للسياحة",
      description: "تصفح أسطولنا المميز من سيارات مرسيدس الفاخرة، سيارات الدفع الرباعي العائلية الـ SUV، والفانات السياحية المجهزة بالكامل لضمان راحة وخصوصية كبار الشخصيات.",
      keywords: "تأجير مرسيدس بيروت, سيارات فاخرة مع سائق لبنان, فان سياحي بيروت, أسطول سيارات غادر للسياحة, سيارات VIP مع سائق لبنان"
    },
    about: {
      title: "من نحن | غادِر للسياحة وخبرة ٢٥+ عاماً من التميز والنقل في لبنان",
      description: "تعرف على مسيرتنا العريقة في تقديم أرقى خدمات النقل السياحي، تاكسي المطار والرحلات الخاصة في لبنان. شركة عائلية مرخصة تضمن أمان رحلتك على مدار الساعة.",
      keywords: "شركة غادر للسياحة, سياحة وسفر لبنان, تاريخ غادر للسياحة, افضل تاكسي مطار بيروت"
    },
    booking: {
      title: "احجز رحلتك أو تاكسي المطار مباشرة وسريعاً | غادِر للسياحة",
      description: "منصة حجز سهلة وسريعة لتاكسي المطار والرحلات السياحية الخاصة في لبنان. حدد تفاصيل رحلتك واحصل على تأكيد فوري عبر الواتساب مباشرة.",
      keywords: "حجز تاكسي بيروت, حجز سائق خاص, تأكيد جولة سياحية لبنان, حجز تاكسي المطار اون لاين"
    },
    contact: {
      title: "اتصل بنا | مكتب خدمة العملاء والمساعدة ٢٤/٧ | غادِر للسياحة",
      description: "تواصل معنا في أي وقت لتنسيق جولاتك السياحية وتوصيلات تاكسي المطار في لبنان. نحن متاحون على مدار الساعة عبر الهاتف والواتساب لخدمتكم.",
      keywords: "رقم غادر للسياحة, حجز سائق بيروت واتساب, دعم سياحي لبنان, رقم تاكسي مطار بيروت"
    }
  },
  fr: {
    home: {
      title: "Taxi Aéroport Beyrouth & Chauffeur Privé VIP au Liban | Ghader Tourism",
      description: "Réservez votre Taxi Aéroport de Beyrouth (BEY) et Chauffeurs Privés de prestige au Liban. Plus de 25 ans d'excellence, circuits touristiques guidés sur mesure et tarifs fixes transparents.",
      keywords: "taxi aeroport beyrouth, chauffeur prive liban, transfert vip beyrouth, voiture avec chauffeur liban, excursions liban, taxi vip liban, chauffeur prive beyrouth"
    },
    transfers: {
      title: "Taxis Aéroport VIP & Chauffeurs de Prestige Liban | Ghader Tourism",
      description: "Service haut de gamme de transfert depuis l'Aéroport de Beyrouth (BEY). Accueil personnalisé en terminal, suivi des vols en temps réel, chauffeurs bilingues et confort optimal.",
      keywords: "transfert vip aéroport beyrouth, chauffeur prestige liban, taxi privé aéroport liban, taxi beyrouth faraya, navette aeroport beyrouth"
    },
    tours: {
      title: "Circuits Touristiques Guidés & Excursions Privées au Liban | Ghader Tourism",
      description: "Réservez vos excursions privées au Liban. Explorez Baalbek, la Grotte de Jeita, Byblos et les Cèdres millénaires dans le confort absolu de nos véhicules de luxe avec chauffeurs.",
      keywords: "excursion privée liban, visiter baalbek, guide francophone liban, circuit touristique beyrouth, visiter le liban chauffeur"
    },
    fleet: {
      title: "Notre Gamme de Véhicules de Prestige - Mercedes & SUV | Ghader Tourism",
      description: "Découvrez notre gamme de véhicules récents avec chauffeurs privés professionnels : Mercedes-Benz Classe E/S, SUV haut de gamme et Vans exécutifs pour vos déplacements.",
      keywords: "louer mercedes beyrouth, van luxe liban, voiture chauffeur privé beyrouth, transport premium liban"
    },
    about: {
      title: "À Propos de Ghader Tourism | 25 Ans d'Excellence et de Prestige au Liban",
      description: "Notre histoire, notre engagement et nos accréditations pour un transport privé d'élite au Liban. Chauffeurs professionnels certifiés et assistance sur mesure 24h/24.",
      keywords: "histoire ghader tourism, agence transport prestige liban, voyage sur mesure beyrouth"
    },
    booking: {
      title: "Réservez Votre Chauffeur Privé & Taxi Aéroport en Ligne | Ghader Tourism",
      description: "Réservez facilement et en toute sécurité vos taxis d'affaires, transferts aéroport ou excursions guidées privées au Liban. Confirmation instantanée via WhatsApp.",
      keywords: "réserver taxi beyrouth, réserver chauffeur privé liban, réservation circuit liban, taxi aeroport beyrouth en ligne"
    },
    contact: {
      title: "Contactez Ghader Tourism | Bureau d'Assistance VIP Chauffeurs 24h/24",
      description: "Contactez notre équipe d'experts pour planifier votre voyage sur mesure ou réserver un taxi au Liban. Assistance téléphonique et WhatsApp disponible 24/7.",
      keywords: "contact ghader tourism, numéro chauffeur liban, assistance voyage beyrouth, whatsapp taxi beyrouth"
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

  // 1. Taxi Service Schema
  const taxiSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Ghader Tourism Airport Transfers & Private Chauffeur",
    "image": ogImageUrl,
    "description": description,
    "@id": "https://ghadertourism.com/#taxidepartment",
    "url": siteUrl,
    "telephone": "+9613460865",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8219",
      "longitude": "35.4883"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Lebanon" },
      { "@type": "AdministrativeArea", "name": "Beirut" },
      { "@type": "AdministrativeArea", "name": "Jounieh" },
      { "@type": "AdministrativeArea", "name": "Byblos" },
      { "@type": "AdministrativeArea", "name": "Faraya" },
      { "@type": "AdministrativeArea", "name": "Tripoli" },
      { "@type": "AdministrativeArea", "name": "Sidon" },
      { "@type": "AdministrativeArea", "name": "Tyre" },
      { "@type": "AdministrativeArea", "name": "Baalbek" }
    ],
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ghader Tourism",
      "telephone": "+9613460865"
    }
  };

  // 2. LocalBusiness Schema
  const localBusinessMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ghader Tourism",
    "image": ogImageUrl,
    "description": "Premium Local Chauffeur Service and Private Transportation provider in Lebanon with over 25 years of family-owned heritage.",
    "@id": "https://ghadertourism.com/#localbusiness",
    "url": siteUrl,
    "telephone": "+9613460865",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8219",
      "longitude": "35.4883"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  // 3. TourProvider (TravelAgency) Schema with featured tours listed
  const tourProviderMarkup = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Ghader Tourism Guided Tours",
    "image": ogImageUrl,
    "description": "Highly acclaimed private customized sightseeing tours and excursions inside Lebanon led by licensed local chauffeur-guides.",
    "@id": "https://ghadertourism.com/#tourprovider",
    "url": `${siteUrl}/#tours`,
    "telephone": "+9613460865",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Airport Road, near Beirut Rafic Hariri International Airport Terminal",
      "addressLocality": "Beirut",
      "addressRegion": "Mount Lebanon",
      "addressCountry": "LB"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Private Custom Sightseeing Tours",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Tour",
            "name": "Northern Wonders: Jeita Grotto, Harissa, Byblos & Batroun",
            "description": "Wander the sparkling caves of Jeita, ride the scenic Teleferique cable car to Harissa, then explore ancient Byblos and the coastal charm of Batroun.",
            "duration": "PT10H"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Tour",
            "name": "Chouf Explorer: Moussa Castle, Beiteddine Palace, Ain w Zein & Cedar Forest",
            "description": "Discover Chouf's gems: the handbuilt Moussa Castle, the majestic Beiteddine Palace, Ain w Zein natural cave, and the ancient Cedar Forest.",
            "duration": "PT11H"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Tour",
            "name": "Bekaa Heritage: Baalbek Temples & Zahle",
            "description": "Marvel at the monumental Roman temples of Baalbek and relax by the picturesque Berdawni riverbanks in the valley city of Zahle.",
            "duration": "PT10H"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Tour",
            "name": "Bekaa Eco-Escape: Taanayel Farm, Aamiq Wetland & Chtoura",
            "description": "Stroll the beautiful tree-lined paths of Taanayel Farm, discover rare wildlife at Aamiq Wetland, and enjoy authentic dairy tasting in Chtoura.",
            "duration": "PT9H"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Tour",
            "name": "Faraya Mountain Escape: Winter Ski or Summer ATV & Lake Adventure",
            "description": "Experience the high snowfields of Faraya Ski Resort in winter, or ride ATVs around the high-altitude lake and natural bridges in summer.",
            "duration": "PT10H"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ghader Tourism" />
      <meta name="robots" content="index, follow" />
      <meta name="last-modified" content="2026-06-30T16:00:00Z" />

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

      {/* Structured Data: Taxi Service, LocalBusiness & TravelAgency/TourProvider */}
      <script type="application/ld+json">
        {JSON.stringify(taxiSchemaMarkup)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessMarkup)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(tourProviderMarkup)}
      </script>
    </Helmet>
  );
}
