import { Language } from "../types";

export interface WhatsAppOptions {
  lang: Language;
  activeView: string;
  contextType?: "general" | "airport_transfer" | "tour" | "vehicle" | "route" | "contact";
  itemName?: string; // name of tour, vehicle model, or transfer route
  routeFromTo?: { from: string; to: string };
}

export function getWhatsAppLink({
  lang,
  activeView,
  contextType = "general",
  itemName,
  routeFromTo,
}: WhatsAppOptions): string {
  const phoneNumber = "9613460865";
  
  // Localized view names for context
  const viewNames: Record<string, Record<Language, string>> = {
    home: {
      en: "Home / Welcome Page",
      ar: "الصفحة الرئيسية",
      fr: "Page d'Accueil"
    },
    fleet: {
      en: "Fleet Showcase Page",
      ar: "معرض الأسطول",
      fr: "Page de la Flotte"
    },
    transfers: {
      en: "Taxi & Drivers / Transfers Page",
      ar: "صفحة التاكسي والسائقين",
      fr: "Page Taxis et Transferts"
    },
    tours: {
      en: "Sightseeing Tours Page",
      ar: "صفحة الجولات السياحية",
      fr: "Page des Circuits Touristiques"
    },
    about: {
      en: "About Ghader Tourism Page",
      ar: "صفحة من نحن",
      fr: "Page À Propos"
    },
    reviews: {
      en: "Customer Reviews Page",
      ar: "صفحة آراء العملاء",
      fr: "Page des Avis"
    },
    contact: {
      en: "Contact / Support Page",
      ar: "صفحة الاتصال بالدعم",
      fr: "Page de Contact"
    }
  };

  const currentPage = viewNames[activeView]?.[lang] || viewNames.home[lang];

  let mainMessage = "";

  if (lang === "ar") {
    switch (contextType) {
      case "airport_transfer":
        mainMessage = "مرحباً غادِر للسياحة، أود حجز تاكسي مخصص من وإلى مطار بيروت الدولي.";
        break;
      case "tour":
        mainMessage = itemName 
          ? `مرحباً غادِر للسياحة، أود الاستفسار عن حجز رحلة سياحية خاصة: ${itemName}.`
          : "مرحباً غادِر للسياحة، أود الاستفسار عن حجز رحلة سياحية مخصصة في لبنان.";
        break;
      case "vehicle":
        mainMessage = itemName 
          ? `مرحباً غادِر للسياحة، أود الاستفسار عن حجز سيارة فاخرة مع سائق: ${itemName}.`
          : "مرحباً غادِر للسياحة، أود الاستفسار عن حجز سيارة مع سائق.";
        break;
      case "route":
        mainMessage = routeFromTo
          ? `مرحباً غادِر للسياحة، أود الاستفسار عن تسعيرة توصيلة خاصة من ${routeFromTo.from} إلى ${routeFromTo.to}.`
          : "مرحباً غادِر للسياحة، أود الاستفسار عن حجز رحلة توصيل في لبنان.";
        break;
      case "contact":
        mainMessage = "مرحباً غادِر للسياحة، أود التواصل مع فريق الدعم للاستفسار عن خدماتكم.";
        break;
      default:
        mainMessage = "مرحباً غادِر للسياحة، أود الاستفسار عن خدمات التوصيل والجولات السياحية في لبنان.";
    }
  } else if (lang === "fr") {
    switch (contextType) {
      case "airport_transfer":
        mainMessage = "Bonjour Ghader Tourism, je souhaite réserver un transfert privé de/vers l'aéroport de Beyrouth.";
        break;
      case "tour":
        mainMessage = itemName 
          ? `Bonjour Ghader Tourism, je souhaite me renseigner sur la réservation du circuit guidé privé : ${itemName}.`
          : "Bonjour Ghader Tourism, je souhaite me renseigner sur la réservation d'un circuit guidé privé au Liban.";
        break;
      case "vehicle":
        mainMessage = itemName 
          ? `Bonjour Ghader Tourism, je souhaite me renseigner sur la location avec chauffeur du véhicule : ${itemName}.`
          : "Bonjour Ghader Tourism, je souhaite me renseigner sur la location d'un véhicule avec chauffeur.";
        break;
      case "route":
        mainMessage = routeFromTo
          ? `Bonjour Ghader Tourism, je souhaite obtenir un devis de transfert privé de ${routeFromTo.from} à ${routeFromTo.to}.`
          : "Bonjour Ghader Tourism, je souhaite réserver un transfert privé au Liban.";
        break;
      case "contact":
        mainMessage = "Bonjour Ghader Tourism, je souhaite contacter votre service client pour une question.";
        break;
      default:
        mainMessage = "Bonjour Ghader Tourism, je souhaite me renseigner sur vos services de transfert privé et circuits au Liban.";
    }
  } else {
    // Default English
    switch (contextType) {
      case "airport_transfer":
        mainMessage = "Hello Ghader Tourism, I would like to book a private transfer to/from Beirut Airport.";
        break;
      case "tour":
        mainMessage = itemName 
          ? `Hello Ghader Tourism, I would like to inquire about booking the private guided tour: ${itemName}.`
          : "Hello Ghader Tourism, I would like to inquire about booking a private guided tour in Lebanon.";
        break;
      case "vehicle":
        mainMessage = itemName 
          ? `Hello Ghader Tourism, I would like to inquire about booking a private chauffeur with the: ${itemName}.`
          : "Hello Ghader Tourism, I would like to inquire about booking a private chauffeur service.";
        break;
      case "route":
        mainMessage = routeFromTo
          ? `Hello Ghader Tourism, I would like to get a private taxi quote from ${routeFromTo.from} to ${routeFromTo.to}.`
          : "Hello Ghader Tourism, I would like to inquire about booking a taxi transfer in Lebanon.";
        break;
      case "contact":
        mainMessage = "Hello Ghader Tourism, I would like to contact support for general inquiries.";
        break;
      default:
        mainMessage = "Hello Ghader Tourism, I would like to inquire about booking a private transfer or tour in Lebanon.";
    }
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mainMessage)}`;
}
