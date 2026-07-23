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
  
  let mainMessage = "";

  if (lang === "ar") {
    switch (contextType) {
      case "airport_transfer":
        mainMessage = "مرحباً غادر للسياحة، أود حجز تاكسي مخصص من وإلى مطار بيروت الدولي.";
        break;
      case "tour":
        mainMessage = itemName 
          ? `مرحباً غادر للسياحة، أود الاستفسار عن حجز رحلة سياحية خاصة: ${itemName}.`
          : "مرحباً غادر للسياحة، أود الاستفسار عن حجز رحلة سياحية مخصصة في لبنان.";
        break;
      case "vehicle":
        mainMessage = itemName 
          ? `مرحباً غادر للسياحة، أود الاستفسار عن حجز سيارة فاخرة مع سائق: ${itemName}.`
          : "مرحباً غادر للسياحة، أود الاستفسار عن حجز سيارة مع سائق.";
        break;
      case "route":
        mainMessage = routeFromTo
          ? `مرحباً غادر للسياحة، أود الاستفسار عن تسعيرة توصيلة خاصة من ${routeFromTo.from} إلى ${routeFromTo.to}.`
          : "مرحباً غادر للسياحة، أود الاستفسار عن حجز رحلة توصيل في لبنان.";
        break;
      case "contact":
        mainMessage = "مرحباً غادر للسياحة، أود التواصل مع فريق الدعم للاستفسار عن خدماتكم.";
        break;
      default:
        mainMessage = "مرحباً غادر للسياحة، أود الاستفسار عن خدمات التوصيل والجولات السياحية في لبنان.";
    }
  } else {
    // Default English
    switch (contextType) {
      case "airport_transfer":
        mainMessage = "Hello Ghader Tourism, I would like to book a private transfer to/from Beirut Airport.";
        break;
      case "tour":
        mainMessage = itemName 
          ? `Hello Ghader Tourism, I would like to inquire about booking this private day trip with a car and driver: ${itemName}.`
          : "Hello Ghader Tourism, I would like to arrange a private day trip in Lebanon with a car and driver.";
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
