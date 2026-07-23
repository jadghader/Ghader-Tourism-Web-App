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
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

const SEO_DATA: Record<Language, Record<string, MetaContent>> = {
  en: {
    home: {
      title: "Private Chauffeur Lebanon & VIP Airport Transfer Beirut | Ghader Tourism",
      description: "Private chauffeur service, Beirut airport transfers, and Lebanon day trips with a professional car and driver. Book directly with 24/7 support.",
      keywords: "private chauffeur lebanon, vip airport transfer beirut, private driver lebanon, beirut airport taxi, lebanon tours, luxury taxi lebanon, private driver beirut"
    },
    transfers: {
      title: "VIP Airport Transfer Beirut & Private Taxi Lebanon | Ghader Tourism",
      description: "Reserve a private airport taxi in Beirut with meet and greet, flight tracking, and premium executive vehicles for Beirut, Byblos, Faraya, Baalbek and beyond.",
      keywords: "vip airport transfer beirut, private taxi lebanon, beirut airport transfer, private driver lebanon, airport taxi beirut"
    },
    tours: {
      title: "Private Lebanon Day Trips with Car & Driver | Ghader Tourism",
      description: "Explore Jeita, Byblos, Batroun, Baalbek, Beirut, Chouf and more with a private vehicle and professional local driver.",
      keywords: "private Lebanon day trips, car with driver Lebanon, Jeita trip, Byblos trip, Baalbek trip, private driver Lebanon"
    },
    fleet: {
      title: "Luxury Fleet for Airport Transfers & Private Tours | Ghader Tourism",
      description: "Browse our executive sedans, premium SUVs, and family vans for private transfers, airport pickups, and luxury Lebanon travel.",
      keywords: "luxury fleet lebanon, executive sedan lebanon, suv with driver lebanon, vip van lebanon, private chauffeur lebanon"
    },
    about: {
      title: "About Ghader Tourism | Premium Lebanon Transportation & Tours",
      description: "Learn about Ghader Tourism, a family-run private transport service with 25+ years of experience in airport transfers, private drivers and Lebanon day trips.",
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
      title: "تاكسي مطار بيروت وسائق خاص VIP في لبنان | غادر للسياحة",
      description: "خدمات سائق خاص فاخرة في لبنان وتوصيل VIP من وإلى مطار بيروت مع أسعار ثابتة ودعم على مدار الساعة.",
      keywords: "سائق خاص لبنان, تاكسي مطار بيروت, سائق خاص بيروت, جولات لبنان, تاكسي فاخر لبنان"
    },
    transfers: {
      title: "تاكسي مطار بيروت VIP وتوصيلات خاصة في لبنان | غادر للسياحة",
      description: "احجز تاكسي مطار خاص في بيروت مع استقبال في المطار وتتبع رحلات ومركبات فاخرة إلى جبيل وفاريا وبعلبك.",
      keywords: "توصيل مطار بيروت, تاكسي خاص لبنان, سائق خاص لبنان, تاكسي VIP بيروت"
    },
    tours: {
      title: "رحلات خاصة في لبنان مع سيارة وسائق | غادر للسياحة",
      description: "اكتشف جعيتا وجبيل والبترون وبعلبك وبيروت والشوف مع سيارة خاصة وسائق محلي محترف.",
      keywords: "رحلات خاصة في لبنان, سيارة مع سائق لبنان, رحلة جعيتا, رحلة جبيل, رحلة بعلبك, سائق خاص لبنان"
    },
    fleet: {
      title: "أسطول فخم للنقل الخاص والسياحي في لبنان | غادر للسياحة",
      description: "تصفح سيارات السيدان والدفع الرباعي والميني فان والفانات المتاحة لتوصيلات المطار والرحلات الخاصة في لبنان.",
      keywords: "سيارات نقل خاصة لبنان, سيارة مع سائق, دفع رباعي لبنان, ميني فان لبنان"
    },
    about: {
      title: "عن غادر للسياحة | نقل سياحي فاخر في لبنان",
      description: "تعرّف على غادر للسياحة، خدمة نقل خاصة تديرها عائلة لبنانية بخبرة تزيد عن ٢٥ عاماً في التوصيل والرحلات الخاصة.",
      keywords: "غادر للسياحة, نقل لبنان, سائق خاص لبنان, سياحة فاخرة لبنان"
    },
    contact: {
      title: "تواصل مع غادر للسياحة | دعم 24/7 لحجز التاكسي والجولات",
      description: "تواصل معنا لحجز تاكسي المطار، السائق الخاص، الجولات المخصصة وخدمات VIP في لبنان.",
      keywords: "تواصل غادر للسياحة, تاكسي مطار بيروت, سائق خاص لبنان, تاكسي VIP لبنان"
    },
    reviews: {
      title: "تقييمات العملاء وخدمة موثوقة في لبنان | غادر للسياحة",
      description: "اطلع على تقييمات العملاء حول خدماتنا الموثوقة في النقل الخاص وخدمة السائق في لبنان.",
      keywords: "تقييمات غادر للسياحة, تاكسي مطار بيروت تقييمات"
    }
  },
};

const getRouteForView = (view: string) => (view === "home" ? "/" : `/${view}`);

export default function SEO({ currentLang, activeView }: SEOProps) {
  const viewKey = SEO_DATA[currentLang]?.[activeView] ? activeView : "home";
  const { title, description, keywords } = SEO_DATA[currentLang][viewKey] || SEO_DATA[currentLang].home;
  const currentPath = getRouteForView(viewKey);
  const canonicalUrl = `${SITE_URL}${currentPath}`;
  const locale = currentLang === "ar" ? "ar_LB" : "en_US";

  const businessSchema = {
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#business`,
    "name": "Ghader Tourism",
    "url": SITE_URL,
    "logo": `${SITE_URL}/favicon.svg`,
    "image": OG_IMAGE_URL,
    "description": description,
    "telephone": "+9613460865",
    "email": "ghadertourism@gmail.com",
    "priceRange": "$$",
    "sameAs": ["https://instagram.com/ghadertourism", "https://facebook.com/ghadertourism", "https://tiktok.com/@ghadertourism"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+9613460865",
      "contactType": "customer service",
      "email": "ghadertourism@gmail.com",
      "areaServed": "LB",
      "availableLanguage": ["English", "Arabic"]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  const serviceSchema = {
    "@type": "Service",
    "@id": `${SITE_URL}/#private-transport-service`,
    "name": "Private Airport Transfer and VIP Chauffeur Service in Lebanon",
    "serviceType": "Airport transfer, private chauffeur, luxury tourism transportation",
    "provider": {
      "@id": `${SITE_URL}/#business`
    },
    "areaServed": ["Lebanon", "Beirut", "Byblos", "Faraya", "Baalbek"]
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": "Ghader Tourism",
    "url": SITE_URL,
    "description": description
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": viewKey === "home"
      ? [{ "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL }]
      : [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": viewKey.charAt(0).toUpperCase() + viewKey.slice(1), "item": canonicalUrl }
        ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [businessSchema, serviceSchema, websiteSchema, breadcrumbSchema]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ghader Tourism"/>
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta httpEquiv="content-language" content={currentLang === "ar" ? "ar" : "en"} />
      <meta name="theme-color" content="#0c0a09" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Ghader Tourism private transfers and tours across Lebanon" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Ghader Tourism" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={OG_IMAGE_URL} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
