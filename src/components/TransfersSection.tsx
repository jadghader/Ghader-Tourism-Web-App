import React from "react";
import {
  ShieldCheck,
  Clock,
  Plane,
  MapPin,
  Users,
  Car,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  PhoneCall,
  UserCheck,
  CheckCircle,
  Hotel,
  Crown
} from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import { getWhatsAppLink } from "../utils/whatsapp";

interface TransfersSectionProps {
  currentLang: Language;
  setActiveView: (view: string) => void;
}

export default function TransfersSection({ currentLang, setActiveView }: TransfersSectionProps) {
  const isRtl = currentLang === "ar";
  const t = translations[currentLang];

  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const POPULAR_ROUTES = [
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Faraya", ar: "فاريا" },
      time: "1h 15m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Beirut Downtown", ar: "وسط بيروت" },
      time: "20m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Byblos", ar: "جبيل" },
      time: "45m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Tripoli", ar: "طرابلس" },
      time: "1h 15m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Sidon", ar: "صيدا" },
      time: "45m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Tyre", ar: "صور" },
      time: "1h 20m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي" },
      to: { en: "Baalbek", ar: "بعلبك" },
      time: "1h 40m"
    }
  ];

  const FAQS = [
    {
      q: {
        en: "What is included in the premium Airport Meet & Greet service?",
        ar: "ماذا تشمل خدمة الاستقبال والترحيب المميزة في المطار؟"
      },
      a: {
        en: "Your professional driver coordinates a clear meeting point with you at Beirut Airport, helps with your luggage, and takes you to your private vehicle.",
        ar: "ينسّق السائق المحترف معك نقطة لقاء واضحة في مطار بيروت، ويساعدك في حمل الأمتعة، ثم يرافقك إلى سيارتك الخاصة."
      }
    },
    {
      q: {
        en: "Are the rates fixed, or are there extra fees for flight delays?",
        ar: "هل الأسعار ثابتة، أم هناك رسوم إضافية في حال تأخر الرحلة؟"
      },
      a: {
        en: "Rates are fixed and agreed in advance, including fuel, tolls, and parking. We monitor flight timing and adjust delayed-flight pickups flexibly without adding a delay charge.",
        ar: "نتفق معك مسبقاً على سعر ثابت يشمل الوقود ورسوم الطرق والمواقف. نتابع موعد الرحلة ونعدّل وقت الاستقبال بمرونة عند التأخير من دون إضافة رسوم بسبب تأخر الرحلة."
      }
    },
    {
      q: {
        en: "Is this a shared taxi or a fully private ride?",
        ar: "هل هذه خدمة تاكسي مشترك أم توصيلة خاصة بالكامل؟"
      },
      a: {
        en: "Ghader Tourism does not offer shared transport. Your sedan, SUV, minivan, or group vehicle is reserved only for you and your travel companions.",
        ar: "لا تقدم غادر للسياحة خدمة نقل مشترك. تُحجز سيارة السيدان أو الدفع الرباعي أو الميني فان أو سيارة المجموعة لك ولمرافقيك فقط."
      }
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-16 animate-fade-in" id="transfers-section-view">

      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] border border-brand-border bg-brand-card px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
        <div className={`relative text-center max-w-3xl mx-auto space-y-4 ${isRtl ? "text-right md:text-center" : "text-left md:text-center"}`}>
        <span className="text-[10px] sm:text-xs text-brand-accent font-mono font-bold uppercase tracking-widest bg-brand-accent/10 px-3.5 py-1.5 rounded-full border border-brand-accent/20 inline-block">
          {currentLang === "ar" ? "توصيلات مطار بيروت الخاصة • متاحة ٢٤/٧" : "Private Beirut Airport Transfers • 24/7"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight leading-tight">
            {currentLang === "ar" ? "تاكسي مطار بيروت وسائق خاص" : "Beirut Airport Taxi & Private Drivers"}
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {currentLang === "ar"
            ? "احجز توصيلة خاصة من أو إلى مطار بيروت مع تنسيق نقطة اللقاء، ومتابعة الرحلة، والمساعدة في حمل الأمتعة، وسعر واضح قبل موعد السفر."
            : "Pre-book a private arrival or departure with flight monitoring, a personal welcome, luggage assistance, and a clear quote before you travel."}
        </p>
        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
          <a
            href={getWhatsAppLink({
              lang: currentLang,
              activeView: "transfers",
              contextType: "airport_transfer"
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-xs font-extrabold text-brand-btn-text shadow-lg transition-colors hover:bg-brand-accent-hover"
          >
            <span>{currentLang === "ar" ? "احصل على سعر عبر واتساب" : "Get a WhatsApp Quote"}</span>
            <ArrowRight className="h-4 w-4" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
          </a>
          <button
            type="button"
            onClick={() => setActiveView("fleet")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-6 py-3 text-xs font-bold text-brand-text transition-colors hover:border-brand-accent/40"
          >
            <Car className="h-4 w-4 text-brand-accent" />
            <span>{currentLang === "ar" ? "استعرض السيارات" : "View Our Vehicles"}</span>
          </button>
        </div>
        <p className="pt-1 text-[10px] font-semibold text-brand-muted">
          {currentLang === "ar" ? "يرد عليك أحد أفراد فريقنا المحلي — وليس نظاماً آلياً." : "A local team member replies—not a bot."}
        </p>
        </div>
      </div>

      {/* Strict Quality & Private VIP Clarification Banner */}
      <div className="bg-brand-card border border-brand-accent/30 rounded-[28px] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent border border-brand-accent/30 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className={`space-y-1.5 ${isRtl ? "text-right" : "text-left"}`}>
          <h4 className="font-extrabold text-sm md:text-base text-brand-text flex items-center gap-2" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
            <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
            <span>{currentLang === "ar" ? "خدمة خاصة بالكامل لراحتك وخصوصيتك" : "A fully private service, reserved for you"}</span>
          </h4>
          <p className="text-[11px] md:text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "تقدم غادر للسياحة خدمات نقل خاصة بخبرة تزيد عن ٢٥ عاماً. لا نقدم نقلاً مشتركاً؛ كل حجز مخصص لك ولمرافقيك ويشمل سيارة نظيفة وسائقاً محترفاً."
              : "Ghader Tourism provides private transport with 25+ years of experience. We do not offer shared rides—each booking includes a clean private vehicle and professional driver for you and your group."}
          </p>
        </div>
      </div>

      {/* Service Modes Split (Airport Pickups vs Daily Drivers) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 pt-2">

        {/* Mode 1: Private Airport Taxi */}
        <div className="bg-brand-card border border-brand-border p-6 sm:p-8 rounded-[28px] space-y-5 relative overflow-hidden group hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors"></div>
          <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "استقبال منسّق في مطار بيروت" : "Coordinated Beirut Airport Pickup"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "ينسّق السائق معك نقطة اللقاء في المطار، ويساعدك في حمل الأمتعة، ويتابع موعد هبوط الطائرة لتعديل وقت الاستقبال بمرونة عند التأخير."
              : "Your driver coordinates the airport meeting point, helps with luggage, and follows your flight timing so the pickup can adjust flexibly if you are delayed."}
          </p>
          <ul className="space-y-2.5 text-[11px] text-brand-text/90 font-medium pt-2">
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "تنسيق واضح لنقطة اللقاء في المطار" : "Clearly coordinated airport meeting point"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "متابعة وتحديث مواعيد الطيران تلقائياً" : "Automated real-time flight status monitoring"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "ساعة انتظار مجانية تماماً لتخليص الإجراءات" : "60 minutes complimentary waiting time for arrivals"}</span>
            </li>
          </ul>
        </div>

        {/* Mode 2: Executive Drivers & VIP Private Taxi */}
        <div className="bg-brand-card border border-brand-border p-6 sm:p-8 rounded-[28px] space-y-5 relative overflow-hidden group hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors"></div>
          <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "سيارة خاصة مع سائق محترف" : "Private Car with a Professional Driver"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "احجز سيارة خاصة مع سائق محترف يتحدث العربية والإنجليزية ليكون في خدمتك طوال اليوم. الخدمة مناسبة لاجتماعات العمل والتسوق والمناسبات والتنقل المرن بين المناطق اللبنانية."
              : "Keep a professional local driver at your disposal for meetings, shopping, private visits, or flexible travel along Lebanon’s coast and mountain roads."}
          </p>
          <ul className="space-y-2.5 text-[11px] text-brand-text/90 font-medium pt-2">
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "سائق محترف يتحدث العربية والإنجليزية" : "Professional Arabic- and English-speaking drivers"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "مرونة كاملة في التوجيه والمسارات والمواقف" : "Complete routing flexibility with custom stops"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "مركبات حديثة ومعقمة ومكيفة بالكامل" : "Impeccably clean, air-conditioned luxury vehicles"}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* VIP Premium Benefits */}
      <section className="space-y-7">
        <div className={`max-w-2xl ${isRtl ? "text-right" : "text-left"}`}>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">
            {currentLang === "ar" ? "مشمول مع خدمة الاستقبال" : "Included with your airport pickup"}
          </span>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-brand-text md:text-3xl">
            {currentLang === "ar" ? "تفاصيل صغيرة تجعل الوصول أسهل" : "The details that make arrival easier"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-brand-card border border-brand-border p-7 rounded-[24px] text-center space-y-4 hover:border-brand-accent/30 transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "انتظار مجاني ٦٠ دقيقة" : "60 Minutes Free Waiting"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "خذ وقتك الكافي لإنهاء إجراءات المعاملات، التدقيق، واستلام الحقائب. نوفر لك ساعة كاملة من الانتظار مجاناً."
              : "Take your time passing through customs, passport checks, and luggage carousels. We provide an hour of free waiting."}
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border p-7 rounded-[24px] text-center space-y-4 hover:border-brand-accent/30 transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "تتبع مباشر للرحلات" : "Live Flight Tracking"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "يقوم مركز التوزيع لدينا بتتبع تفاصيل هبوط رحلتك تلقائياً لضمان تواجد السائق في الموعد الفعلي تماماً."
              : "Our live dispatch desk monitors and updates pickup times based on your real-time flight landing schedules."}
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border p-7 rounded-[24px] text-center space-y-4 hover:border-brand-accent/30 transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "سائق محترف وذو خبرة" : "Experienced Drivers"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "سائقنا محترف ويحمل المستندات القانونية اللازمة لنقل الركاب، وينسّق معك نقطة الاستقبال المناسبة في المطار."
              : "Our professional drivers carry the legal documents required for passenger transport and coordinate a suitable airport meeting point with you."}
          </p>
        </div>

        </div>
      </section>

      {/* Premium Travel Add-ons: Hotel Bookings & Beirut Airport VIP Salon */}
      <div className="bg-gradient-to-br from-brand-accent/5 via-brand-card to-brand-accent/10 border border-brand-accent/25 rounded-[32px] p-6 sm:p-8 md:p-10 space-y-8">
        <div className={`text-center max-w-2xl mx-auto space-y-2 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
          <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest bg-brand-accent/20 px-3.5 py-1 rounded-full border border-brand-accent/30 inline-block">
            {currentLang === "ar" ? "خدماتنا الإضافية المميزة" : "Premium Travel Add-ons"}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brand-text tracking-tight">
            {currentLang === "ar" ? "مساعدة إضافية عند الحاجة" : "Extra help when you need it"}
          </h2>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "نساعدك عند الطلب في ترتيبات الفندق وخدمة صالون المطار بحسب التوفر."
              : "When requested, we can help arrange hotel reservations and airport salon access, subject to availability."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Hotel Booking */}
          <div className="bg-brand-card border border-brand-border p-6 md:p-8 rounded-[24px] space-y-4 hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border">
                <Hotel className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-brand-text font-sans">
                {currentLang === "ar" ? "حجوزات الفنادق الميسرة" : "Seamless Hotel Bookings"}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                {currentLang === "ar"
                  ? "يمكننا مساعدتك في حجز فندق مناسب لإقامتك والاستفادة من الأسعار والعروض المتاحة لدينا. أرسل متطلباتك عبر واتساب لنتحقق من الخيارات المتوفرة."
                  : "We can help reserve a suitable hotel and check the rates and offers available to us. Send your requirements on WhatsApp so we can confirm the available options."}
              </p>
            </div>
            <div className="pt-4">
              <a
                href={`https://wa.me/9613460865?text=${encodeURIComponent(
                  currentLang === "ar"
                    ? "مرحباً غادر للسياحة، أود المساعدة في حجز فندق لإقامتي في لبنان."
                    : "Hello Ghader Tourism, I would like assistance with booking a hotel for my stay in Lebanon."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-btn-text px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all inline-flex items-center gap-2 border border-brand-accent/20 w-fit"
              >
                <span>{currentLang === "ar" ? "احجز فندقك عبر واتساب" : "Book Hotel via WhatsApp"}</span>
                <ArrowRight className="w-3.5 h-3.5" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
              </a>
            </div>
          </div>

          {/* Card 2: Beirut Airport VIP Salon */}
          <div className="bg-brand-card border border-brand-border p-6 md:p-8 rounded-[24px] space-y-4 hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-brand-text font-sans">
                {currentLang === "ar" ? "صالون الشرف بمطار بيروت (VIP Salon)" : "Beirut Airport VIP Salon Access"}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                {currentLang === "ar"
                  ? "يمكننا عادةً المساعدة في ترتيب الدخول إلى صالون الشرف في مطار بيروت عند الوصول أو المغادرة، بحسب التوفر وتأكيد الحجز."
                  : "We can usually help arrange Beirut Airport VIP Salon access for arrival or departure, subject to availability and booking confirmation."}
              </p>
            </div>
            <div className="pt-4">
              <a
                href={`https://wa.me/9613460865?text=${encodeURIComponent(
                  currentLang === "ar"
                    ? "مرحباً غادر للسياحة، أنا مهتم بحجز صالون الشرف الـ VIP في مطار بيروت."
                    : "Hello Ghader Tourism, I'm interested in booking Beirut Airport VIP Salon access."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-btn-text px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all inline-flex items-center gap-2 border border-brand-accent/20 w-fit"
              >
                <span>{currentLang === "ar" ? "احجز صالون المطار الـ VIP" : "Book VIP Salon Access"}</span>
                <ArrowRight className="w-3.5 h-3.5" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Intercity Routes and Quotes Table */}
      <section className="overflow-hidden bg-brand-card border border-brand-border rounded-[32px] shadow-sm">
        <div className={`flex flex-col gap-4 border-b border-brand-border bg-gradient-to-r from-brand-accent/10 via-brand-card to-brand-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
          <div className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              <Plane className="h-4 w-4" />
              {currentLang === "ar" ? "من مطار بيروت الدولي" : "From Beirut International Airport"}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-brand-text tracking-tight">
              {currentLang === "ar" ? "الوجهات الأكثر طلباً" : "Popular airport destinations"}
            </h2>
            <p className="max-w-2xl text-xs leading-6 text-brand-muted">
              {currentLang === "ar"
                ? "أوقات سفر تقريبية وقد تختلف بحسب حركة السير. اضغط على وجهتك للحصول على سعر واضح لسيارة خاصة."
                : "Estimated travel times may vary with traffic. Select a destination to request a clear private-transfer quote."}
            </p>
          </div>
          <div className={`flex shrink-0 items-center gap-2 rounded-xl border border-brand-accent/20 bg-brand-accent/10 px-3 py-2 text-[10px] font-bold text-brand-accent ${isRtl ? "self-end sm:self-auto" : "self-start sm:self-auto"}`}>
            <ShieldCheck className="h-4 w-4" />
            {currentLang === "ar" ? "سعر مؤكد قبل الرحلة" : "Quote confirmed before travel"}
          </div>
        </div>

        {/* Mobile destination cards */}
        <div className="grid gap-3 p-4 sm:p-6 md:hidden">
          {POPULAR_ROUTES.map((route) => (
            <a
              key={route.to.en}
              href={getWhatsAppLink({
                lang: currentLang,
                activeView: "transfers",
                contextType: "route",
                routeFromTo: {
                  from: currentLang === "ar" ? "مطار بيروت الدولي" : "Beirut Airport",
                  to: route.to[currentLang]
                }
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-brand-border bg-brand-bg/40 p-4 transition-colors hover:border-brand-accent/40 hover:bg-brand-accent/5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className={isRtl ? "text-right" : "text-left"}>
                  <span className="block text-sm font-extrabold text-brand-text">{route.to[currentLang]}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-brand-muted">
                    <Clock className="h-3.5 w-3.5 text-brand-accent" />
                    {route.time}
                  </span>
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent/20 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-brand-btn-text">
                <ArrowRight className="h-4 w-4" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
              </span>
            </a>
          ))}
        </div>

        {/* Desktop routes table */}
        <div className="hidden overflow-x-auto p-6 md:block lg:p-8">
          <table className="w-full border-separate border-spacing-0 text-xs text-brand-text" dir={isRtl ? "rtl" : "ltr"}>
            <thead className="text-[10px] uppercase tracking-wider text-brand-muted">
              <tr>
                <th className={`border-b border-brand-border px-5 py-3 font-bold ${isRtl ? "text-right" : "text-left"}`}>{currentLang === "ar" ? "المسار" : "Route"}</th>
                <th className={`border-b border-brand-border px-5 py-3 font-bold ${isRtl ? "text-right" : "text-left"}`}>{currentLang === "ar" ? "وقت السفر التقريبي" : "Estimated travel time"}</th>
                <th className={`border-b border-brand-border px-5 py-3 font-bold ${isRtl ? "text-left" : "text-right"}`}>{currentLang === "ar" ? "الحجز" : "Booking"}</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {POPULAR_ROUTES.map((route) => (
                <tr key={route.to.en} className="group transition-colors hover:bg-brand-accent/5">
                  <td className="border-b border-brand-border/50 px-5 py-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-extrabold text-brand-text">{route.to[currentLang]}</span>
                        <span className="mt-0.5 block text-[10px] text-brand-muted">{route.from[currentLang]}</span>
                      </span>
                    </span>
                  </td>
                  <td className="border-b border-brand-border/50 px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-brand-bg px-3 py-2 font-mono font-bold text-brand-muted">
                      <Clock className="h-3.5 w-3.5 text-brand-accent" />
                      {route.time}
                    </span>
                  </td>
                  <td className={`border-b border-brand-border/50 px-5 py-4 ${isRtl ? "text-left" : "text-right"}`}>
                    <a
                      href={getWhatsAppLink({
                        lang: currentLang,
                        activeView: "transfers",
                        contextType: "route",
                        routeFromTo: {
                          from: currentLang === "ar" ? "مطار بيروت الدولي" : "Beirut Airport",
                          to: route.to[currentLang]
                        }
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-accent/20 bg-brand-accent/10 px-4 py-2 font-sans text-xs font-bold text-brand-accent transition-colors hover:bg-brand-accent hover:text-brand-btn-text"
                    >
                      <span>{currentLang === "ar" ? "طلب تسعيرة" : "Get quote"}</span>
                      <ArrowRight className="h-3.5 w-3.5" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inline FAQs section */}
      <div className="space-y-6">
        <div className={`space-y-1.5 ${isRtl ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold text-brand-text tracking-tight">
            {currentLang === "ar" ? "الأسئلة الشائعة حول النقل والتوصيل في لبنان" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xs text-brand-muted">
            {currentLang === "ar" ? "كل ما تريد معرفته عن خدمات النقل والتاكسي الفاخرة لدينا" : "Everything you need to know about our premium transit and chauffeur services."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-brand-card border border-brand-border rounded-[24px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-brand-bg/20 transition-colors cursor-pointer"
                  style={{ textAlign: isRtl ? "right" : "left", flexDirection: isRtl ? "row-reverse" : "row" }}
                >
                  <div className="flex items-center gap-3" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
                    <HelpCircle className="w-5 h-5 text-brand-accent shrink-0" />
                    <h4 className="font-extrabold text-brand-text text-sm md:text-base leading-tight">
                      {faq.q[currentLang]}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-accent" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    className="px-6 pb-6 pt-1 text-xs md:text-sm text-brand-muted leading-relaxed animate-fade-in"
                    style={{ textAlign: isRtl ? "right" : "left", paddingRight: isRtl ? "3.5rem" : "1.5rem", paddingLeft: isRtl ? "1.5rem" : "3.5rem" }}
                  >
                    {faq.a[currentLang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Book Taxi / Contact block */}
      <div className="bg-brand-card border border-brand-accent/30 rounded-[32px] p-8 md:p-12 relative overflow-hidden text-center space-y-6">
        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans">
          {currentLang === "ar" ? "جاهز لحجز توصيلتك الخاصة؟" : "Ready to book your private transfer?"}
        </h2>
        <p className="text-brand-muted text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          {currentLang === "ar"
            ? "أرسل رقم الرحلة والتاريخ والوجهة وعدد الركاب عبر واتساب، وسيتواصل معك فريقنا لتأكيد السيارة والسعر."
            : "Send your flight number, date, destination, and group size on WhatsApp. Our team will confirm the vehicle and quote with you."}
        </p>

        <div className="flex justify-center pt-2">
          <a
            href={getWhatsAppLink({
              lang: currentLang,
              activeView: "transfers",
              contextType: "airport_transfer"
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-extrabold text-xs px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-center"
          >
            <span>{t.bookNow}</span>
            <ArrowRight className="w-4 h-4 text-brand-btn-text" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
          </a>
        </div>
      </div>

    </div>
  );
}
