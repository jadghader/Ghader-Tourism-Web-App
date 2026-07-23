import React from "react";
import {
  Plane,
  Car,
  Compass,
  Snowflake,
  ShieldCheck,
  Hotel,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Language } from "../types";

interface UseCasesSectionProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
  onSelectVehicle?: (vehicleId: string) => void;
}

interface UseCaseItem {
  id: string;
  icon: React.ElementType;
  title: { en: string; ar: string };
  tag: { en: string; ar: string };
  desc: { en: string; ar: string };
  bullets: { en: string[]; ar: string[] };
  waMessage: { en: string; ar: string };
  targetView: string;
}

const USE_CASES: UseCaseItem[] = [
  {
    id: "airport",
    icon: Plane,
    tag: {
      en: "Arrivals & departures, 24/7",
      ar: "وصول ومغادرة على مدار الساعة",
    },
    title: { en: "Beirut Airport pickup", ar: "تاكسي مطار بيروت الدولي" },
    desc: {
      en: "A calm, pre-arranged welcome at Beirut Airport (BEY), with private transport to hotels, homes, and destinations across Lebanon.",
      ar: "توصيلة خاصة ومنسّقة من مطار بيروت إلى الفنادق والمنازل والوجهات في جميع أنحاء لبنان.",
    },
    bullets: {
      en: [
        "Clearly coordinated airport meeting point",
        "60 minutes free waiting time",
        "Real-time flight monitoring",
      ],
      ar: [
        "تنسيق واضح لنقطة اللقاء في المطار",
        "ساعة انتظار مجانية",
        "متابعة مباشرة لموعد وصول الرحلة",
      ],
    },
    waMessage: {
      en: "Hello Ghader Tourism, I would like to book a premium Beirut Airport VIP transfer.",
      ar: "مرحباً غادر للسياحة، أود حجز تاكسي مخصص وممتاز من وإلى مطار بيروت الدولي.",
    },
    targetView: "transfers",
  },
  {
    id: "chauffeur",
    icon: Car,
    tag: { en: "By the hour or by the day", ar: "تأجير يومي مخصص" },
    title: {
      en: "Private driver & chauffeur",
      ar: "خدمة سائق خاص VIP",
    },
    desc: {
      en: "Keep a trusted local driver with you for meetings, shopping, events, appointments, or a flexible day around Lebanon.",
      ar: "احجز سيارة خاصة مع سائق محترف لخدمتك طوال اليوم في اجتماعات العمل والتسوق والمناسبات والتنقل بين المناطق.",
    },
    bullets: {
      en: [
        "Professional Arabic- and English-speaking drivers",
        "Clean, air-conditioned vehicles based on availability",
        "Flexible routes, stops, and booking periods",
      ],
      ar: [
        "سائق محترف يتحدث العربية والإنجليزية",
        "سيارات نظيفة ومكيّفة بحسب التوفر",
        "مرونة في تحديد المسارات والمحطات ومدة الحجز",
      ],
    },
    waMessage: {
      en: "Hello Ghader Tourism, I am interested in hiring a private VIP chauffeur and luxury vehicle.",
      ar: "مرحباً غادر للسياحة، أنا مهتم باستئجار سيارة فاخرة مع سائق خاص لكبار الشخصيات.",
    },
    targetView: "fleet",
  },
  {
    id: "tours",
    icon: Compass,
    tag: { en: "Made around your interests", ar: "جولات سياحية مخصصة" },
    title: { en: "Private Lebanon tours", ar: "رحلات سياحية مع سائق محلي" },
    desc: {
      en: "See Lebanon at your pace—from ancient cities and mountain villages to the coast—with a local driver and a comfortable private vehicle.",
      ar: "اكتشف تاريخ لبنان وحضارته، من الآثار الرومانية العريقة إلى الشواطئ والمطاعم، برفقة سائق محلي.",
    },
    bullets: {
      en: [
        "Custom trips to Baalbek, Byblos, Jeita & Cedars",
        "Local drivers help you travel between stops",
        "Suitable for couples, families & groups",
      ],
      ar: [
        "رحلات مخصصة إلى بعلبك وجبيل وجعيتا والأرز",
        "سائق محلي يساعدك في التنقل بين المحطات",
        "مناسبة للعائلات والمجموعات والأزواج",
      ],
    },
    waMessage: {
      en: "Hello Ghader Tourism, I would like to arrange a custom private day trip across Lebanon with a car and driver.",
      ar: "مرحباً غادر للسياحة، أود ترتيب رحلة خاصة ومخصصة في لبنان مع سيارة وسائق.",
    },
    targetView: "tours",
  },
];

export default function UseCasesSection({
  currentLang,
  onNavigate,
}: UseCasesSectionProps) {
  const isRtl = currentLang === "ar";

  const t = {
    headerTag: { en: "How we can help", ar: "كيف يمكننا مساعدتك" },
    headerTitle: {
      en: "One local team for your whole Lebanon journey",
      ar: "فريق محلي واحد لكل رحلتك في لبنان",
    },
    headerSub: {
      en: "Arriving at Beirut Airport, planning a family day out, or travelling for business? Tell us what you need and we’ll arrange the driver, vehicle, and timing.",
      ar: "سواء كنت سائحاً ترغب باستكشاف التاريخ، أو رجل أعمال قادماً إلى بيروت، أو عائلة تستكشف لبنان، نحن نوفر لك الخدمة المثالية.",
    },
    inquireBtn: { en: "Inquire via WhatsApp", ar: "استفسار وحجز عبر واتساب" },
  };

  return (
    <div className="space-y-12" id="use-cases-section">
      {/* Section Header */}
      <div
        className={`text-center max-w-3xl mx-auto space-y-4 ${isRtl ? "text-right" : "text-left md:text-center"}`}
      >
        <span className="text-sm text-brand-accent font-bold inline-block">
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
              className="bg-brand-card border border-brand-border hover:border-brand-accent/40 rounded-[24px] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
              id={`usecase-${uc.id}`}
            >
              <div className="space-y-4">
                {/* Card icon */}
                <div
                  className={`flex ${isRtl ? "justify-end" : "justify-start"}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-bg border border-brand-border/80 text-brand-accent flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                </div>

                {/* Title & Description */}
                <div
                  className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}
                >
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
