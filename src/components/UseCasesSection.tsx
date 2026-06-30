import React from "react";
import { Plane, Car, Compass, Snowflake, ShieldCheck, Hotel, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Language } from "../types";

interface UseCasesSectionProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
  onSelectVehicle?: (vehicleId: string) => void;
}

interface UseCaseItem {
  id: string;
  icon: React.ElementType;
  title: { en: string; ar: string; fr: string };
  tag: { en: string; ar: string; fr: string };
  desc: { en: string; ar: string; fr: string };
  bullets: { en: string[]; ar: string[]; fr: string[] };
  waMessage: { en: string; ar: string; fr: string };
  targetView: string;
}

const USE_CASES: UseCaseItem[] = [
  {
    id: "airport",
    icon: Plane,
    tag: { en: "24/7 Arrivals & Departures", ar: "وصول ومغادرة على مدار الساعة", fr: "Arrivées & Départs 24/7" },
    title: { en: "Beirut Airport VIP Taxi & Transfer", ar: "تاكسي مطار بيروت الدولي والـ VIP", fr: "Taxi Aéroport VIP de Beyrouth" },
    desc: {
      en: "The most reliable private taxi service from Beirut Rafic Hariri Airport (BEY) to all major cities and luxury hotels in Lebanon.",
      ar: "أكثر خدمات التاكسي الخاص موثوقية وأماناً من مطار بيروت الدولي إلى جميع الفنادق والمدن والمناطق اللبنانية.",
      fr: "Le service de taxi privé le plus fiable de l'aéroport de Beyrouth vers toutes les grandes villes et hôtels de luxe au Liban."
    },
    bullets: {
      en: ["Driver waits inside arrival hall with nameboard", "60 minutes free waiting time", "Automated real-time flight tracking"],
      ar: ["سائق ينتظرك داخل صالة الوصول مع لوحة باسمك", "ساعة انتظار مجانية بالكامل", "تتبع مباشر لمواعيد هبوط الطائرات مجاناً"],
      fr: ["Accueil personnalisé en terminal avec pancarte", "60 minutes d'attente gratuites", "Suivi des vols en temps réel"]
    },
    waMessage: {
      en: "Hello Ghader Tourism, I would like to book a premium Beirut Airport VIP transfer.",
      ar: "مرحباً غادِر للسياحة، أود حجز تاكسي مخصص وممتاز من وإلى مطار بيروت الدولي.",
      fr: "Bonjour Ghader Tourism, je souhaite réserver un transfert privé de premier choix pour l'aéroport de Beyrouth."
    },
    targetView: "transfers"
  },
  {
    id: "chauffeur",
    icon: Car,
    tag: { en: "Executive Daily Hires", ar: "تأجير يومي مخصص", fr: "Chauffeur Privé à la Journée" },
    title: { en: "VIP Driver & Private Chauffeur", ar: "سائق خاص كبار الشخصيات VIP", fr: "Chauffeur Privé & Voiture de Luxe" },
    desc: {
      en: "Hire an elite local driver with a high-end luxury vehicle for business executives, shopping trips, diplomatic missions, or special events.",
      ar: "استأجر سيارة فاخرة حديثة مع سائق محترف لخدمتك طوال اليوم في اجتماعات العمل، التسوق، الجولات الدبلوماسية والمناسبات الخاصة.",
      fr: "Bénéficiez d'un chauffeur local d'élite avec un véhicule haut de gamme pour vos réunions d'affaires, shopping, délégations ou événements."
    },
    bullets: {
      en: ["Multilingual professional local drivers", "Pristine, sanitized Mercedes-Benz & SUVs", "100% customizable routing & hourly layouts"],
      ar: ["سائقون محترفون يتحدثون عدة لغات", "سيارات مرسيدس ودفع رباعي معقمة وحديثة", "مرونة كاملة في تحديد المسارات والوقفات"],
      fr: ["Chauffeurs bilingues courtois et discrets", "Mercedes-Benz & SUV récents et désinfectés", "Flexibilité absolue des trajets et horaires"]
    },
    waMessage: {
      en: "Hello Ghader Tourism, I am interested in hiring a private VIP chauffeur and luxury vehicle.",
      ar: "مرحباً غادِر للسياحة، أنا مهتم باستئجار سيارة فاخرة مع سائق خاص لكبار الشخصيات.",
      fr: "Bonjour Ghader Tourism, je suis intéressé par la location d'un véhicule de luxe avec chauffeur privé VIP."
    },
    targetView: "fleet"
  },
  {
    id: "tours",
    icon: Compass,
    tag: { en: "Custom Daily Sightseeing", ar: "جولات سياحية مخصصة", fr: "Circuits Touristiques Privés" },
    title: { en: "Guided Private Sightseeing Tours", ar: "رحلات سياحية مع سائق مرشد محلي", fr: "Excursions & Circuits Guidés" },
    desc: {
      en: "Explore Lebanon's deep heritage, from ancient Roman ruins to coastal beaches, inside our comfortable private vehicles.",
      ar: "اكتشف تاريخ وحضارة لبنان الخلابة، من الآثار الرومانية العريقة إلى الشواطئ والمطاعم، برفقة سائقين مرشدين محليين.",
      fr: "Explorez le riche patrimoine du Liban, des ruines romaines aux plages côtières, dans le confort absolu de nos véhicules."
    },
    bullets: {
      en: ["Custom trips to Baalbek, Byblos, Jeita & Cedars", "Local expert drivers sharing hidden tips", "Perfect for couples, families & tour groups"],
      ar: ["رحلات مخصصة إلى بعلبك، جبيل، جعيتا والأرز", "سائقون خبراء يشاركونك أسرار البلد والقصص", "مثالية للعائلات والمجموعات السياحية والأزواج"],
      fr: ["Excursions sur mesure à Baalbek, Byblos, Jeita & les Cèdres", "Chauffeurs experts partageant des conseils locaux", "Idéal pour les couples, familles et groupes"]
    },
    waMessage: {
      en: "Hello Ghader Tourism, I would like to design a custom guided sightseeing tour across Lebanon.",
      ar: "مرحباً غادِر للسياحة، أود تصميم جولة سياحية خاصة مخصصة وموجهة في لبنان.",
      fr: "Bonjour Ghader Tourism, je souhaite concevoir un circuit touristique privé sur mesure au Liban."
    },
    targetView: "tours"
  },
  {
    id: "luxury",
    icon: Hotel,
    tag: { en: "Elite Travel Management", ar: "إدارة وتنسيق السفر الفاخر", fr: "Gestion de Voyage Elite" },
    title: { en: "Beirut Airport VIP Salon & Hotel Setup", ar: "صالون الشرف بمطار بيروت وحجوزات الفنادق", fr: "Salon VIP Aéroport & Réservations" },
    desc: {
      en: "Skip the airport crowds with fast-track VIP Salon bookings and coordinate your premium hotel check-ins through our local travel desk.",
      ar: "تجنب الازدحام في صالون الشرف بمطار بيروت (VIP Salon) مع تسريع المعاملات، ونسق إقامتك الفندقية بأفضل الأسعار.",
      fr: "Évitez l'attente avec l'accès au Salon VIP de l'aéroport et coordonnez vos réservations d'hôtels prestigieux au meilleur tarif."
    },
    bullets: {
      en: ["Fast-track passport & airport clearance", "Exclusive access to Beirut Airport CIP lounge", "Preferential corporate rates at top hotels in Lebanon"],
      ar: ["تسريع معاملات الجوازات والجمارك", "دخول حصري لقاعة صالون الشرف والضيافة الراقية", "أسعار تفضيلية خاصة بالشركات في أرقى الفنادق"],
      fr: ["Formalités de passeport et douane prioritaires", "Accès exclusif au salon VIP / CIP de l'aéroport", "Tarifs préférentiels exclusifs dans les meilleurs hôtels"]
    },
    waMessage: {
      en: "Hello Ghader Tourism, I want to book Beirut Airport VIP Salon Access and request hotel assistance.",
      ar: "مرحباً غادِر للسياحة، أود حجز صالون الشرف الـ VIP في مطار بيروت وطلب مساعدة في حجز الفنادق.",
      fr: "Bonjour Ghader Tourism, je souhaite réserver l'accès au Salon VIP de l'aéroport de Beyrouth et solliciter votre aide pour l'hôtel."
    },
    targetView: "transfers"
  }
];

export default function UseCasesSection({ currentLang, onNavigate }: UseCasesSectionProps) {
  const isRtl = currentLang === "ar";

  const t = {
    headerTag: { en: "OUR SERVICE USE CASES", ar: "حالات وخدمات الاستخدام", fr: "NOS CAS D'UTILISATION" },
    headerTitle: { en: "Bespoke Private Transit for Every Scenario", ar: "توصيلات ونقل سياحي مخصص لكل مناسبة", fr: "Le Transport Privé pour Chaque Occasion" },
    headerSub: {
      en: "Whether you are a tourist seeking ancient ruins, a business executive landing in Beirut, or a family exploring Lebanon, we have the perfect custom setup for you.",
      ar: "سواء كنت سائحاً ترغب باستكشاف التاريخ، أو رجل أعمال قادماً إلى بيروت، أو عائلة تستكشف لبنان، نحن نوفر لك الخدمة المثالية.",
      fr: "Que vous soyez un touriste à la recherche d'histoire, un homme d'affaires ou une famille explorant le Liban, nous avons le service idéal pour vous."
    },
    inquireBtn: { en: "Inquire via WhatsApp", ar: "استفسار وحجز عبر واتساب", fr: "S'informer via WhatsApp" }
  };

  return (
    <div className="space-y-12" id="use-cases-section">
      {/* Section Header */}
      <div className={`text-center max-w-3xl mx-auto space-y-4 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest bg-brand-accent/10 px-3.5 py-1 rounded-full border border-brand-accent/20 inline-block">
          {t.headerTag[currentLang]}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-brand-text tracking-tight leading-tight">
          {t.headerTitle[currentLang]}
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">
          {t.headerSub[currentLang]}
        </p>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USE_CASES.map((uc) => {
          const IconComponent = uc.icon;
          return (
            <div
              key={uc.id}
              className="bg-brand-card border border-brand-border hover:border-brand-accent/30 rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] group"
              id={`usecase-${uc.id}`}
            >
              <div className="space-y-4">
                {/* Header tag & Icon */}
                <div className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-11 h-11 rounded-xl bg-brand-bg border border-brand-border/80 text-brand-accent flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-accent/85 bg-brand-accent/5 px-2.5 py-1 rounded-lg border border-brand-accent/10">
                    {uc.tag[currentLang]}
                  </span>
                </div>

                {/* Title & Description */}
                <div className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}>
                  <h3 className="font-extrabold text-base sm:text-lg text-brand-text font-sans tracking-tight">
                    {uc.title[currentLang]}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed font-medium">
                    {uc.desc[currentLang]}
                  </p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 pt-2 border-t border-brand-border/40">
                  {uc.bullets[currentLang].map((bullet, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-[11px] text-brand-text/90 font-medium ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                    >
                      <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conversion Buttons */}
              <div className="pt-6">
                <a
                  href={`https://wa.me/9613460865?text=${encodeURIComponent(uc.waMessage[currentLang])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md border border-brand-accent/15"
                >
                  <MessageSquare className="w-4 h-4 text-brand-bg" />
                  <span>{t.inquireBtn[currentLang]}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
