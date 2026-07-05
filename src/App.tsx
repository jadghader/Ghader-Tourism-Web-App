import React from "react";
import { ArrowUp, Clock, UserCheck, Car, Crown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FleetGrid, { FLEET_VEHICLES } from "./components/FleetGrid";
import TourCard, { FEATURED_TOURS } from "./components/TourCard";
import ReviewsSection from "./components/ReviewsSection";
import ContactForm from "./components/ContactForm";
import BlogCarousel from "./components/BlogCarousel";
import TransfersSection from "./components/TransfersSection";
import SocialSection from "./components/SocialSection";
import VehicleGallery from "./components/VehicleGallery";
import SEO from "./components/SEO";
import WhatsAppFAB from "./components/WhatsAppFAB";
import UseCasesSection from "./components/UseCasesSection";

import { Language } from "./types";
import { translations } from "./translations";
import { getWhatsAppLink } from "./utils/whatsapp";
import { trackPageView, trackEvent } from "./utils/analytics";

const PILLARS_DATA = [
  {
    icon: Clock,
    title: {
      en: "24/7 Premium Support",
      ar: "دعم متميز ٢٤/٧",
      fr: "Support Premium 24/7"
    },
    description: {
      en: "Round-the-clock dispatch & support. We track your flight in real-time and adapt instantly.",
      ar: "متابعة وتواصل على مدار الساعة. نتابع رحلتك الجوية مباشرة لتعديل موعد الاستقبال مجاناً.",
      fr: "Assistance et coordination en continu. Nous suivons votre vol en temps réel."
    }
  },
  {
    icon: UserCheck,
    title: {
      en: "Experienced Chauffeurs",
      ar: "سائقون خبراء ومحترفون",
      fr: "Chauffeurs Certifiés"
    },
    description: {
      en: "Highly experienced, polite, English-speaking professional drivers dedicated to your safety.",
      ar: "نخبة من السائقين المحترفين يتميزون باللباقة والخبرة الكاملة بجميع الطرق والمناطق اللبنانية.",
      fr: "Chauffeurs professionnels, courtois et multilingues dédiés à votre confort et sécurité."
    }
  },
  {
    icon: Car,
    title: {
      en: "Reliable Luxury Fleet",
      ar: "أسطول سيارات موثوق وفاخر",
      fr: "Flotte de Prestige"
    },
    description: {
      en: "Immaculately clean, fully air-conditioned modern executive sedans, SUVs, and spacious family vans.",
      ar: "مركبات حديثة، مكيفة بالكامل، وتخضع لتعقيم شامل وصيانة دورية لرحلة آمنة ومترفة.",
      fr: "Véhicules récents, climatisés et nettoyés méticuleusement avant chaque transfert."
    }
  },
  {
    icon: Crown,
    title: {
      en: "Elite VIP Experience",
      ar: "تجربة كبار الشخصيات الفخمة",
      fr: "Expérience VIP d'Élite"
    },
    description: {
      en: "VIP Salon coordinate services, premium luggage assistance, and customized tourism layouts.",
      ar: "استقبال خاص بالاسم في صالة المطار، مساعدة كاملة بالحقائب، وترتيبات حصرية لكبار الزوار.",
      fr: "Service d'accueil personnalisé, assistance bagages et services exclusifs VIP."
    }
  }
];

const getViewFromPath = (path = typeof window !== "undefined" ? window.location.pathname : "/") => {
  const normalizedPath = path.replace(/\/+$/, "") || "/";

  switch (normalizedPath) {
    case "/transfers":
      return "transfers";
    case "/fleet":
      return "fleet";
    case "/tours":
      return "tours";
    case "/about":
      return "about";
    case "/contact":
      return "contact";
    case "/reviews":
      return "reviews";
    default:
      return "home";
  }
};

const getRouteForView = (view: string) => (view === "home" ? "/" : `/${view}`);

export default function App() {
  const [currentLang, setLang] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ghader-lang");
      if (saved === "en" || saved === "ar" || saved === "fr") {
        return saved as Language;
      }
      // Detect browser language
      const languages = navigator.languages || [navigator.language];
      for (const lang of languages) {
        if (lang) {
          const lower = lang.toLowerCase();
          if (lower.startsWith("ar")) return "ar";
          if (lower.startsWith("fr")) return "fr";
          if (lower.startsWith("en")) return "en";
        }
      }
    }
    return "en";
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ghader-lang", currentLang);
      trackEvent("change_language", "Engagement", currentLang);
    }
  }, [currentLang]);

  const [activeView, setActiveView] = React.useState<string>(() => getViewFromPath());

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveView(getViewFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    const nextPath = getRouteForView(activeView);
    if (typeof window !== "undefined" && window.location.pathname !== nextPath) {
      window.history.pushState({ view: activeView }, "", nextPath);
    }
  }, [activeView]);

  // Scroll to top instantly when the active view changes to prevent layering or middle-of-page rendering issues
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const path = getRouteForView(activeView);
    const pageTitle = `Ghader Tourism - ${activeView.charAt(0).toUpperCase() + activeView.slice(1)}`;
    trackPageView(path, pageTitle);
  }, [activeView]);

  const [theme, setTheme] = React.useState<"light" | "dark" | any>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ghader-theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("ghader-theme", theme);
  }, [theme]);

  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  // Handle vehicle quote request
  const handleSelectVehicle = (vehicleId: string) => {
    const vehicle = FLEET_VEHICLES.find(v => v.id === vehicleId);
    const vehicleName = vehicle ? vehicle.name : "Luxury Car";
    
    // Track conversion event for vehicle selection
    trackEvent("select_vehicle", "Conversions", vehicleName);

    const url = getWhatsAppLink({
      lang: currentLang,
      activeView,
      contextType: "vehicle",
      itemName: vehicleName,
    });
    window.open(url, "_blank");
  };

  // Handle standard tour booking
  const handleBookTour = (tourId: string, translatedName?: string) => {
    const tour = FEATURED_TOURS.find(t => t.id === tourId);
    const tourName = translatedName || (tour ? tour.name : "Guided Tour");

    // Track conversion event for tour booking
    trackEvent("book_tour", "Conversions", tourName);

    const url = getWhatsAppLink({
      lang: currentLang,
      activeView,
      contextType: "tour",
      itemName: tourName,
    });
    window.open(url, "_blank");
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-accent/30 selection:text-white ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Subtle fixed scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Dynamic SEO Meta Tags */}
      <SEO currentLang={currentLang} activeView={activeView} />

      {/* Dynamic Header */}
      <Header 
        currentLang={currentLang} 
        setLang={setLang} 
        activeView={activeView} 
        setActiveView={setActiveView} 
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-[72px] sm:pt-[84px] md:pt-[92px] overflow-x-hidden">
        
        {/* VIEW 1: HOME */}
        {activeView === "home" && (
          <div className="space-y-10 sm:space-y-16 pb-16 sm:pb-20 animate-fade-in" id="home-view">
            {/* Elegant Hero */}
            <Hero currentLang={currentLang} onNavigate={setActiveView} />

            {/* Key Trust Pillars Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4" id="brand-pillars">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PILLARS_DATA.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-brand-card border border-brand-border hover:border-brand-accent/30 rounded-[28px] p-6 space-y-4 shadow-md hover:shadow-xl transition-all relative overflow-hidden group/pillar"
                    >
                      {/* Decorative corner ambient glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl group-hover/pillar:bg-brand-accent/10 transition-colors pointer-events-none" />

                      {/* Icon container */}
                      <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0 group-hover/pillar:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-brand-text tracking-tight group-hover/pillar:text-brand-accent transition-colors">
                          {pillar.title[currentLang]}
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {pillar.description[currentLang]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Quick Pitch Callout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="space-y-5">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 inline-block uppercase tracking-wider">
                      {t.airportAuthorized}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-text font-sans tracking-tight leading-tight">
                      {currentLang === "ar" ? "خدمات توصيل آمنة ومريحة من وإلى مطار بيروت الدولي" : currentLang === "fr" ? "Transferts Aéroport Sécurisés de Beyrouth" : "Seamless Airport Transfers directly from Beirut International Terminal"}
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                      {currentLang === "ar" 
                        ? "نحن نوفر لعملائنا استقبالاً خاصاً ومميزاً داخل صالة الوصول، مع تتبع رحلات الطيران في الوقت الفعلي لتعديل مواعيد التوصيل مجاناً في حال التأخير. استمتع بساعة انتظار مجانية وسائق محترف متاح طوال اليوم لمساعدتك بالحقائب."
                        : "Ghader Tourism provides premium private airport transfers in Lebanon. We offer terminal meet & greet, real-time flight delay tracking with automatic adjustment, 60 minutes free waiting time, and premium luggage assistance."}
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 pt-2 text-xs font-semibold ${isRtl ? "justify-start flex-row-reverse" : ""}`}>
                      <div className="flex items-center gap-1.5 text-brand-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"></span>
                        <span>No Hidden Airport Surcharges</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"></span>
                        <span>Free Flight Delay Tracking</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual card on the right */}
                  <div className="bg-brand-input border border-brand-border p-8 rounded-[24px] space-y-4 shadow-2xl relative z-10">
                    <span className="text-[10px] text-brand-accent font-mono uppercase tracking-widest block font-bold">{currentLang === "ar" ? "تواصل مباشر وحجز سريع" : currentLang === "fr" ? "Réservation Directe" : "Direct Support & Quick Booking"}</span>
                    <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">{currentLang === "ar" ? "حجز فوري عبر واتساب" : currentLang === "fr" ? "Réserver sur WhatsApp" : "Instant WhatsApp Booking"}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {currentLang === "ar"
                        ? "تحدث معنا مباشرة عبر تطبيق الواتساب لتحديد تواريخ رحلتك، واختيار مركبتك المفضلة، وسيقوم فريقنا بتأكيد حجزك فوراً."
                        : "Connect with us instantly on WhatsApp. Specify your travel dates, choose your preferred luxury vehicle, and get an immediate booking confirmation."}
                    </p>
                    <a
                      href={getWhatsAppLink({
                        lang: currentLang,
                        activeView,
                        contextType: "general"
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-bold text-xs py-3.5 rounded-xl cursor-pointer shadow-lg text-center block transition-all"
                    >
                      {t.contactWhatsApp}
                    </a>
                  </div>
                </div>

                {/* Decorative glow element */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px]"></div>
              </div>
            </section>

            {/* USE CASES SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <UseCasesSection currentLang={currentLang} onNavigate={setActiveView} />
            </section>

            {/* BLOG CAROUSEL SIGHTSEEING GALLERY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <BlogCarousel currentLang={currentLang} onNavigate={setActiveView} />
            </section>

            {/* IMAGES CAROUSEL GALLERY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
              <VehicleGallery currentLang={currentLang} />
            </section>

            {/* FLEET GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <FleetGrid currentLang={currentLang} onSelectVehicle={handleSelectVehicle} />
            </section>

            {/* FEATURED TOURS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <TourCard currentLang={currentLang} onBookTour={handleBookTour} />
            </section>

            {/* REVIEWS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <ReviewsSection currentLang={currentLang} />
            </section>

            {/* SOCIAL MEDIA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 border-t border-brand-border/40">
              <SocialSection currentLang={currentLang} />
            </section>
          </div>
        )}

        {/* VIEW 2: FLEET */}
        {activeView === "fleet" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="fleet-view">
            <FleetGrid currentLang={currentLang} onSelectVehicle={handleSelectVehicle} />
          </div>
        )}

        {/* VIEW 3: PRIVATE & VIP TRANSFERS */}
        {activeView === "transfers" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="transfers-view">
            <TransfersSection currentLang={currentLang} setActiveView={setActiveView} />
          </div>
        )}

        {/* VIEW 4: TOURS */}
        {activeView === "tours" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in space-y-16" id="tours-view">
            {/* Standard Tours Grid */}
            <TourCard currentLang={currentLang} onBookTour={handleBookTour} />
          </div>
        )}

        {/* VIEW 5: ABOUT */}
        {activeView === "about" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 animate-fade-in space-y-8 text-brand-text" id="about-view">
            <div className={`text-center space-y-2 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
              <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest">{t.yearsExperience}</span>
              <h2 className="text-3xl font-bold text-brand-text tracking-tight">{t.navAbout}</h2>
            </div>

            <div className="bg-brand-card border border-brand-border p-8 md:p-10 rounded-[32px] space-y-6 leading-relaxed">
              <h3 className="text-xl font-bold text-brand-accent font-sans">
                {t.brandName} — {translations[currentLang].tagline}
              </h3>

              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {translations[currentLang].aboutStoryBody}
              </p>

              <div className="border-t border-brand-border pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-1">
                  <span className="text-3xl font-black text-brand-text font-sans block">25+</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">Years of Excellence</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-black text-brand-text font-sans block">24/7</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">Airport Dispatch</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-black text-brand-text font-sans block">100%</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">Premium fleet</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: REVIEWS */}
        {activeView === "reviews" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="reviews-view">
            <ReviewsSection currentLang={currentLang} />
          </div>
        )}

        {/* VIEW 7: CONTACT */}
        {activeView === "contact" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="contact-view">
            <ContactForm currentLang={currentLang} activeView={activeView} />
          </div>
        )}

      </main>

      {/* Dynamic Footer */}
      <Footer currentLang={currentLang} setActiveView={setActiveView} activeView={activeView} />

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 z-50 p-3 bg-brand-accent text-brand-bg hover:bg-brand-accent-hover rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none border border-brand-accent/20 flex items-center justify-center group ${
              isRtl ? "right-6" : "left-6"
            }`}
            title={currentLang === "ar" ? "الرجوع للأعلى" : currentLang === "fr" ? "Retour en haut" : "Scroll to Top"}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB currentLang={currentLang} activeView={activeView} />
    </div>
  );
}
