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
  CheckCircle
} from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";

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
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Faraya", ar: "فاريا", fr: "Faraya" },
      time: "1h 15m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Beirut Downtown", ar: "وسط بيروت", fr: "Beyrouth Centre" },
      time: "20m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Byblos", ar: "جبيل", fr: "Byblos" },
      time: "45m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Tripoli", ar: "طرابلس", fr: "Tripoli" },
      time: "1h 15m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Sidon", ar: "صيدا", fr: "Sidon" },
      time: "45m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Tyre", ar: "صور", fr: "Tyr" },
      time: "1h 20m"
    },
    {
      from: { en: "Beirut Airport", ar: "مطار بيروت الدولي", fr: "Aéroport de Beyrouth" },
      to: { en: "Baalbek", ar: "بعلبك", fr: "Baalbek" },
      time: "1h 40m"
    }
  ];

  const FAQS = [
    {
      q: {
        en: "What is included in the premium Airport Meet & Greet service?",
        ar: "ماذا تشمل خدمة الاستقبال والترحيب المميزة في المطار؟",
        fr: "Qu'est-ce qui est inclus dans le service d'accueil Premium à l'aéroport ?"
      },
      a: {
        en: "Our professional chauffeur will wait for you inside the passenger arrival terminal with a personalized name placard. They will assist with your luggage and guide you to your private executive vehicle parked in the VIP zone.",
        ar: "سينتظرك سائقنا المحترف داخل صالة وصول المسافرين حاملاً لافتة باسمك الشخصي. سيساعدك في حمل الأمتعة ويوجهك إلى مركبتك الخاصة الفاخرة المركونة في المنطقة المخصصة لكبار الشخصيات.",
        fr: "Notre chauffeur professionnel vous attendra à l'intérieur du terminal des arrivées avec une pancarte personnalisée. Il vous aidera avec vos bagages et vous guidera vers votre véhicule privé haut de gamme stationné dans la zone VIP."
      }
    },
    {
      q: {
        en: "Are the rates fixed, or are there extra fees for flight delays?",
        ar: "هل الأسعار ثابتة، أم هناك رسوم إضافية في حال تأخر الرحلة؟",
        fr: "Les tarifs sont-ils fixes ou y a-t-il des frais supplémentaires en cas de retard de vol ?"
      },
      a: {
        en: "All rates are fully fixed and agreed upon in advance. We monitor flight landing times in real-time. If your flight is delayed, your pickup schedule is adjusted automatically with absolutely no extra charges.",
        ar: "جميع أسعارنا ثابتة ومحددة مسبقاً. نحن نتابع مواعيد هبوط الرحلات في الوقت الفعلي. إذا تأخرت رحلتك، يتم تعديل موعد الاستقبال تلقائياً دون أي رسوم إضافية على الإطلاق.",
        fr: "Tous nos tarifs sont strictement fixes et convenus à l'avance. Nous suivons l'état des vols en temps réel. Si votre vol est retardé, l'heure de prise en charge est ajustée automatiquement sans aucun frais supplémentaire."
      }
    },
    {
      q: {
        en: "Is this a shared taxi or a fully private ride?",
        ar: "هل هذه خدمة تاكسي مشترك أم توصيلة خاصة بالكامل؟",
        fr: "S'agit-il d'un taxi partagé ou d'un trajet entièrement privé ?"
      },
      a: {
        en: "Ghader Tourism does not operate public or shared transport. All of our services are 100% private. You will have a dedicated luxury sedan, SUV, or premium executive van entirely to yourself and your travel companions.",
        ar: "لا تقدم شركة غادِر للسياحة خدمات نقل مشترك أو عامة. جميع رحلاتنا خاصة بنسبة ١٠٠٪. ستحصل على سيارة سيدان فاخرة، أو سيارة دفع رباعي، أو فان عائلي مخصص بالكامل لك ولمرافقيك فقط.",
        fr: "Ghader Tourism ne propose pas de transport collectif ou partagé. Tous nos services sont 100% privés. Vous disposerez d'une berline, d'un SUV ou d'un van premium entièrement dédié à vous et vos compagnons de voyage."
      }
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in" id="transfers-section-view">
      
      {/* Header */}
      <div className={`text-center max-w-3xl mx-auto space-y-4 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest bg-brand-accent/10 px-3.5 py-1 rounded-full border border-brand-accent/20 inline-block animate-pulse">
          {currentLang === "ar" ? "نقل المطار والتوصيلات الخاصة كبار الشخصيات" : currentLang === "fr" ? "Transferts Aéroport VIP & Privés" : "Private VIP & Airport Transfers"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-text tracking-tight leading-tight">
          {currentLang === "ar" ? "توصيلات المطار الفاخرة وسائق خاص كبار الشخصيات" : currentLang === "fr" ? "Transferts Aéroport VIP & Chauffeur de Prestige" : "Premium Airport Pickups & VIP Chauffeur"}
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          {currentLang === "ar" 
            ? "تجنب عشوائية وسائل النقل العامة وسيارات الأجرة التقليدية في المطار. تقدم غادِر للسياحة خدمات استقبال وتوصيل خاصة فاخرة وسائقين محترفين متاحين على مدار الساعة لخدمتك في جميع أنحاء لبنان."
            : "Avoid the hassle of shared transport or fluctuating street cabs. Ghader Tourism provides elite private transfers, terminal meet & greet, and highly professional chauffeur services for worry-free travel across Lebanon."}
        </p>
      </div>

      {/* Strict Quality & Private VIP Clarification Banner */}
      <div className="bg-brand-card/60 backdrop-blur-md border border-brand-accent/30 rounded-[28px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent border border-brand-accent/30 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className={`space-y-1.5 ${isRtl ? "text-right" : "text-left"}`}>
          <h4 className="font-extrabold text-sm md:text-base text-brand-text uppercase tracking-wider flex items-center gap-2" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
            <span>{currentLang === "ar" ? "تنبيه هام: التزامنا بالنقل الخاص والفاخر الـ VIP فقط" : currentLang === "fr" ? "Service Exclusivement Privé & VIP" : "Important Notice: Exclusively Private & VIP Transport"}</span>
          </h4>
          <p className="text-[11px] md:text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "نود التوضيح بأن غادِر للسياحة لا تعمل كخدمة تاكسي عمومي أو نقل مشترك في الشوارع. نحن شركة نقل سياحي خاصة معتمدة بخبرة ٢٥+ عاماً. جميع سياراتنا فخمة وحديثة وسائقونا يرتدون زياً رسمياً لضمان أعلى مستويات الأمان والخصوصية والراحة لرحلتك."
              : "Please note that Ghader Tourism does not operate public street cabs or shared transit. We are a registered luxury tourism transportation company with over 25 years of heritage. Every booking is completely private and secure, utilizing top-tier executive vehicles and certified professional chauffeurs."}
          </p>
        </div>
      </div>

      {/* Service Modes Split (Airport Pickups vs Daily Chauffeur) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        
        {/* Mode 1: Private Airport Transfers */}
        <div className="bg-brand-card border border-brand-border p-8 rounded-[32px] space-y-5 relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors"></div>
          <div className={`flex justify-between items-start ${isRtl ? "flex-row-reverse" : ""}`}>
            <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-lg border border-brand-accent/20 uppercase tracking-widest font-mono">
              {currentLang === "ar" ? "توصيلات المطار الممتازة" : currentLang === "fr" ? "Transferts Aéroport de Prestige" : "Premium Airport Pickups & Drop-offs"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "خدمة استقبال وتوصيل المطار الـ VIP" : currentLang === "fr" ? "Accueil & Transfert VIP Aéroport" : "VIP Airport Meet & Greet Transfer"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "استقبال خاص بالاسم داخل صالة الوصول، المساعدة الكاملة في حمل الحقائب والأمتعة، وتتبع هبوط الطائرة في الوقت الفعلي لتعديل موعد الاستقبال تلقائياً ومجاناً في حال حدوث أي تأخير لرحلتك."
              : "Includes professional greeting inside the arrival terminal with a custom placard, direct luggage assistance, and real-time flight tracking with zero delay surcharges. Seamless rides to any hotel or city."}
          </p>
          <ul className="space-y-2.5 text-[11px] text-brand-text/90 font-medium pt-2">
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "سائق بانتظارك داخل صالة الوصول" : "Chauffeur waiting inside arrival terminal with placard"}</span>
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

        {/* Mode 2: Executive Chauffeur & VIP Private Driver */}
        <div className="bg-brand-card border border-brand-border p-8 rounded-[32px] space-y-5 relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors"></div>
          <div className={`flex justify-between items-start ${isRtl ? "flex-row-reverse" : ""}`}>
            <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-lg border border-brand-accent/20 uppercase tracking-widest font-mono">
              {currentLang === "ar" ? "خدمة السائق الخاص اليومية" : currentLang === "fr" ? "Chauffeur Privé à la Journée" : "Daily Private Driver & Chauffeur"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "تأجير سيارة خاصة مع سائق محترف" : currentLang === "fr" ? "Chauffeur Privé et Véhicule de Prestige" : "Premium Chauffeur & Executive Taxi Service"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-medium">
            {currentLang === "ar"
              ? "استأجر سيارة فاخرة مع سائق محترف يتحدث عدة لغات ليكون في خدمتك طوال اليوم. مثالية لرحلات العمل، الجولات الدبلوماسية، التسوق، أو استكشاف الجبال والبلدات اللبنانية بمرونة تامة."
              : "Hire a premium luxury vehicle with a professional, multilingual local chauffeur at your disposal for business meetings, diplomatic transfers, private shopping, or exploring the mountain and coastal routes of Lebanon."}
          </p>
          <ul className="space-y-2.5 text-[11px] text-brand-text/90 font-medium pt-2">
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "سائقون محليون يتحدثون الإنجليزية والفرنسية" : "Multilingual, local expert professional drivers"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "مرونة كاملة في التوجيه والمسارات والمواقف" : "Complete routing flexibility with custom stops"}</span>
            </li>
            <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
              <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{currentLang === "ar" ? "أسطول سيارات حديث ومعقم ومكيف بالكامل" : "Impeccably clean, air-conditioned luxury fleet"}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* VIP Premium Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-brand-card border border-brand-border p-8 rounded-[32px] text-center space-y-4 hover:border-brand-border-hover transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "انتظار مجاني ٦٠ دقيقة" : currentLang === "fr" ? "60 Min d'Attente Gratuite" : "60 Mins Free Wait Time"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "خذ وقتك الكافي لإنهاء إجراءات المعاملات، التدقيق، واستلام الحقائب. نوفر لك ساعة كاملة من الانتظار مجاناً."
              : "Take your time passing through customs, passport checks, and luggage carousels. We provide an hour of free waiting."}
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border p-8 rounded-[32px] text-center space-y-4 hover:border-brand-border-hover transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "تتبع مباشر للرحلات" : currentLang === "fr" ? "Suivi de Vol en Direct" : "Live Flight Tracking"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "يقوم مركز التوزيع لدينا بتتبع تفاصيل هبوط رحلتك تلقائياً لضمان تواجد السائق في الموعد الفعلي تماماً."
              : "Our live dispatch desk monitors and updates pickup times based on your real-time flight landing schedules."}
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border p-8 rounded-[32px] text-center space-y-4 hover:border-brand-border-hover transition-all duration-300 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-accent border border-brand-border mx-auto">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "سائقون محترفون وذوو خبرة" : currentLang === "fr" ? "Chauffeurs Qualifiés" : "Experienced Chauffeurs"}
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            {currentLang === "ar"
              ? "سائقونا ذوو خبرة واسعة ولديهم تصاريح دخول صالة المطار وتسهيل حركتك بمرونة تامة وأمان."
              : "Our dedicated chauffeurs hold official airport access clearances and offer smooth pickup directly from security gates."}
          </p>
        </div>

      </div>

      {/* Popular Intercity Routes and Quotes Table */}
      <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 md:p-10 space-y-6">
        <div className={`space-y-1.5 ${isRtl ? "text-right" : "text-left"}`}>
          <h2 className="text-xl md:text-2xl font-bold text-brand-text tracking-tight">
            {currentLang === "ar" ? "الوجهات الشهيرة من مطار بيروت" : currentLang === "fr" ? "Destinations Populaires depuis l'Aéroport" : "Popular Destinations from Beirut Airport"}
          </h2>
          <p className="text-xs text-brand-muted">
            {currentLang === "ar"
              ? "الأوقات التقريبية من مطار بيروت الدولي. اضغط على طلب تسعيرة للحصول على عرض فوري لسيارتك الخاصة."
              : "Estimated travel times from Beirut Rafic Hariri Airport. Click below to request an instant private transfer quote."}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-brand-text">
            <thead className="text-[10px] bg-brand-bg text-brand-muted uppercase tracking-wider font-mono border-b border-brand-border">
              <tr>
                <th className="px-4 py-3">{currentLang === "ar" ? "نقطة الانطلاق" : "From"}</th>
                <th className="px-4 py-3">{currentLang === "ar" ? "الوجهة" : "Destination"}</th>
                <th className="px-4 py-3">{currentLang === "ar" ? "المدة التقريبية" : "Est. Time"}</th>
                <th className="px-4 py-3 text-right">{currentLang === "ar" ? "طلب تسعيرة" : "Quote Request"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 font-medium">
              {POPULAR_ROUTES.map((route, idx) => (
                <tr key={idx} className="hover:bg-brand-bg/40 transition-colors">
                  <td className="px-4 py-3.5 text-brand-text font-bold">
                    {route.from[currentLang]}
                  </td>
                  <td className="px-4 py-3.5 text-brand-accent font-bold">
                    {route.to[currentLang]}
                  </td>
                  <td className="px-4 py-3.5 text-brand-muted font-mono">
                    {route.time}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => {
                        setActiveView("booking");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-bg px-4 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1 border border-brand-accent/20"
                    >
                      <span>
                        {currentLang === "ar" ? "طلب تسعيرة" : currentLang === "fr" ? "Obtenir un devis" : "Get Quote"}
                      </span>
                      <span>→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
      <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 md:p-12 relative overflow-hidden text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans">
          {currentLang === "ar" ? "جاهز لحجز توصيلتك الخاصة والـ VIP الآن؟" : "Ready to Book Your VIP Transfer?"}
        </h2>
        <p className="text-brand-muted text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          {currentLang === "ar"
            ? "املأ نموذج الحجز التفاعلي البسيط والآمن وسيتصل بك فريقنا في غضون دقائق لتأكيد الموعد وإرسال بيانات السائق."
            : "Complete our seamless online reservation form, select your premium vehicle class, and enjoy a professional stress-free transportation service in Lebanon."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setActiveView("booking");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-extrabold text-xs px-6 py-4 rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>{t.bookNow}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="https://wa.me/9613460865?text=Hello%20Ghader%20Tourism,%20I'm%20interested%20in%20booking%20a%20private%20VIP%20transfer."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-4 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-md"
          >
            <span>{currentLang === "ar" ? "احجز عبر واتساب فوراً" : "WhatsApp Fast Booking"}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
