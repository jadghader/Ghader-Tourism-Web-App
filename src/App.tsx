import React from "react";
import { ArrowUp, Clock, UserCheck, Car, Crown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import WhatsAppFAB from "./components/WhatsAppFAB";
import UseCasesSection from "./components/UseCasesSection";
import logoImage from "./assets/images/logo-optimized.webp";

import { Language } from "./types";
import { translations } from "./translations";
import { getWhatsAppLink } from "./utils/whatsapp";
import { trackPageView, trackEvent } from "./utils/analytics";

const ReviewsSection = React.lazy(() => import("./components/ReviewsSection"));
const ContactForm = React.lazy(() => import("./components/ContactForm"));
const BlogCarousel = React.lazy(() => import("./components/BlogCarousel"));
const FleetGrid = React.lazy(() => import("./components/FleetGrid"));
const TourCard = React.lazy(() => import("./components/TourCard"));
const TransfersSection = React.lazy(() => import("./components/TransfersSection"));
const SocialSection = React.lazy(() => import("./components/SocialSection"));
const VehicleGallery = React.lazy(() => import("./components/VehicleGallery"));

function DeferredRender({
  children,
  minHeight = 560,
}: {
  children: React.ReactNode;
  minHeight?: number;
}) {
  const [shouldRender, setShouldRender] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (shouldRender || !containerRef.current) return;
    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? (
        <React.Suspense fallback={<div aria-hidden="true" style={{ minHeight }} />}>
          {children}
        </React.Suspense>
      ) : null}
    </div>
  );
}

const PILLARS_DATA = [
  {
    icon: Clock,
    title: {
      en: "A real person, 24/7",
      ar: "تواصل مباشر ٢٤/٧",
    },
    description: {
      en: "Message our local team any time. We monitor your flight and adjust the pickup when plans change.",
      ar: "متابعة وتواصل على مدار الساعة. نتابع رحلتك الجوية مباشرة لتعديل موعد الاستقبال مجاناً.",
    }
  },
  {
    icon: UserCheck,
    title: {
      en: "Local, experienced drivers",
      ar: "سائق خبير ومحترف",
    },
    description: {
      en: "Courteous drivers who know Lebanon well, communicate clearly, and put your comfort first.",
      ar: "سائق محترف يتميز باللباقة والخبرة الكاملة بجميع الطرق والمناطق اللبنانية.",
    }
  },
  {
    icon: Car,
    title: {
      en: "The right vehicle for your trip",
      ar: "أسطول سيارات موثوق وفاخر",
    },
    description: {
      en: "Clean, air-conditioned sedans, SUVs, and roomy vans for solo guests, families, and groups.",
      ar: "مركبات حديثة، مكيفة بالكامل، وتخضع لتعقيم شامل وصيانة دورية لرحلة آمنة ومترفة.",
    }
  },
  {
    icon: Crown,
    title: {
      en: "Care from arrival to drop-off",
      ar: "اهتمام من الوصول حتى الوجهة",
    },
    description: {
      en: "A coordinated airport meeting point, luggage help, thoughtful stops, and service shaped around you.",
      ar: "تنسيق واضح لنقطة اللقاء في المطار، ومساعدة في حمل الأمتعة، وخدمة تراعي تفاصيل رحلتك.",
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
const VALID_PATHS = new Set(["/", "/transfers", "/fleet", "/tours", "/about", "/contact", "/reviews"]);

function PageLoader({ currentLang }: { currentLang: Language }) {
  return (
    <div
      className="min-h-[52vh] flex items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-brand-accent/30"
            animate={{ scale: [0.9, 1.2], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-2 rounded-full bg-brand-accent/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white border border-brand-border shadow-xl p-0.5"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={logoImage} alt="" className="w-full h-full object-contain" width="64" height="64" />
          </motion.div>
        </div>

        <p className="mt-4 text-sm font-bold text-brand-text">
          {currentLang === "ar" ? "غادر للسياحة" : "Ghader Tourism"}
        </p>
        <div className="flex items-center gap-1.5 mt-3" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="w-2 h-2 rounded-full bg-brand-accent"
              animate={{ y: [0, -5, 0], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.14 }}
            />
          ))}
        </div>
        <span className="sr-only">
          {currentLang === "ar" ? "جاري تحميل الصفحة" : "Loading page"}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [currentLang, setLang] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ghader-lang");
      if (saved === "en" || saved === "ar") {
        return saved as Language;
      }
      // Detect browser language
      const languages = navigator.languages || [navigator.language];
      for (const lang of languages) {
        if (lang) {
          const lower = lang.toLowerCase();
          if (lower.startsWith("ar")) return "ar";
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
      const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
      if (!VALID_PATHS.has(normalizedPath)) {
        window.history.replaceState({ view: "home" }, "", "/");
      }
      setActiveView(getViewFromPath(window.location.pathname));
    };

    const initialPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (!VALID_PATHS.has(initialPath)) {
      window.history.replaceState({ view: "home" }, "", "/");
      setActiveView("home");
    }

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
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.18,
  });

  React.useEffect(() => {
    let frameId = 0;
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 400);
        frameId = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
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
    const vehicleNames: Record<string, string> = {
      v1: "Sedan",
      v2: "SUV",
      v3: "Luxury SUV",
      v4: "Minivan",
      v5: "Van",
      v6: "Bus",
    };
    const vehicleName = vehicleNames[vehicleId] || "Private Vehicle";
    
    // Track conversion event for vehicle selection
    trackEvent("select_vehicle", "Conversions", vehicleName);

    const url = getWhatsAppLink({
      lang: currentLang,
      activeView,
      contextType: "vehicle",
      itemName: vehicleName,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle standard tour booking
  const handleBookTour = (tourId: string, translatedName?: string) => {
    const tourName = translatedName || "Private Day Trip";

    // Track conversion event for tour booking
    trackEvent("book_tour", "Conversions", tourName);

    const url = getWhatsAppLink({
      lang: currentLang,
      activeView,
      contextType: "tour",
      itemName: tourName,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-accent/30 selection:text-white ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div
        className="fixed inset-x-0 top-0 z-[1000] h-1 bg-brand-border/40 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full bg-brand-accent shadow-[0_0_10px_var(--accent-color)] will-change-transform"
          style={{
            scaleX: smoothScrollProgress,
            transformOrigin: isRtl ? "right center" : "left center",
          }}
        />
      </div>
      <a href="#main-content" className="skip-link">
        {currentLang === "ar" ? "الانتقال إلى المحتوى الرئيسي" : "Skip to main content"}
      </a>
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
      <main id="main-content" className="flex-grow pt-[72px] sm:pt-[84px] md:pt-[92px] overflow-x-hidden">
        <React.Suspense fallback={<PageLoader currentLang={currentLang} />}>
        
        {/* VIEW 1: HOME */}
        {activeView === "home" && (
          <div className="space-y-10 sm:space-y-16 pb-16 sm:pb-20 animate-fade-in" id="home-view">
            {/* Elegant Hero */}
            <Hero currentLang={currentLang} onNavigate={setActiveView} />

            {/* Key Trust Pillars Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <UseCasesSection currentLang={currentLang} onNavigate={setActiveView} />
            </section>

            {/* Quick Pitch Callout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 deferred-section">
              <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="space-y-5">
                    <span className="text-brand-accent text-sm font-bold inline-block">
                      {t.airportAuthorized}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-brand-text font-sans tracking-tight leading-tight">
                      {currentLang === "ar" ? "من بوابة الوصول إلى وجهتك، نحن نهتم بالتفاصيل" : "From the arrivals gate to your destination, we take care of the details"}
                    </h2>
                    <p className="text-sm text-brand-muted leading-relaxed max-w-2xl">
                      {currentLang === "ar"
                        ? "ننسّق معك نقطة اللقاء في المطار، ونتابع موعد الرحلة لتعديل وقت الاستقبال بمرونة عند التأخير، ونساعدك في حمل الأمتعة. تحصل أيضاً على سعر شامل قبل الرحلة وساعة انتظار مجانية."
                        : "We coordinate the airport meeting point, help with luggage, and follow your flight so delayed pickups can adjust flexibly. You receive an all-inclusive quote before the ride and 60 minutes of complimentary waiting."}
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 pt-2 text-xs font-semibold ${isRtl ? "justify-start flex-row-reverse" : ""}`}>
                      <div className="flex items-center gap-1.5 text-brand-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"></span>
                        <span>{currentLang === "ar" ? "سعر واضح يُتفق عليه قبل الرحلة" : "Upfront quote before your ride"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"></span>
                        <span>{currentLang === "ar" ? "متابعة مباشرة لموعد وصول الرحلة" : "Live flight arrival monitoring"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual card on the right */}
                  <div className="bg-brand-raised border border-brand-border p-7 sm:p-8 rounded-[24px] space-y-4 shadow-lg relative z-10">
                    <span className="text-sm text-brand-accent font-bold block">{currentLang === "ar" ? "حجز بسيط ومباشر" : "Simple, direct booking"}</span>
                    <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">{currentLang === "ar" ? "خطّط رحلتك معنا عبر واتساب" : "Plan your ride with us on WhatsApp"}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {currentLang === "ar"
                        ? "تحدث معنا مباشرة عبر تطبيق الواتساب لتحديد تواريخ رحلتك، واختيار مركبتك المفضلة، وسيقوم فريقنا بتأكيد حجزك فوراً."
                        : "Tell us your date, pickup point, destination, and group size. A member of our team—not a bot—will confirm availability and send a clear quote."}
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
              </div>
            </section>

            {/* Key Trust Pillars Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 deferred-section" id="brand-pillars">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PILLARS_DATA.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
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
                        <p className="text-sm text-brand-muted leading-relaxed">
                          {pillar.description[currentLang]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* BLOG CAROUSEL SIGHTSEEING GALLERY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 deferred-section">
              <DeferredRender minHeight={420}>
                <BlogCarousel currentLang={currentLang} onNavigate={setActiveView} />
              </DeferredRender>
            </section>

            {/* IMAGES CAROUSEL GALLERY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 deferred-section">
              <DeferredRender minHeight={540}>
                <VehicleGallery currentLang={currentLang} />
              </DeferredRender>
            </section>

            {/* FLEET GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 deferred-section">
              <DeferredRender minHeight={900}>
                <FleetGrid currentLang={currentLang} onSelectVehicle={handleSelectVehicle} />
              </DeferredRender>
            </section>

            {/* FEATURED TOURS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 deferred-section">
              <DeferredRender minHeight={900}>
                <TourCard currentLang={currentLang} onBookTour={handleBookTour} />
              </DeferredRender>
            </section>

            {/* REVIEWS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 deferred-section">
              <div className="bg-brand-card border border-brand-border rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-md">
                <div className={isRtl ? "text-right" : "text-left"}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-accent">{currentLang === "ar" ? "تجارب الضيوف" : "Guest experiences"}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-text mt-1">{t.reviewsTitle}</h2>
                  <p className="text-xs text-brand-muted mt-2 max-w-xl">{currentLang === "ar" ? "اطّلع على آراء الضيوف حول خدمات المطار والجولات الخاصة." : "Read guest feedback about our airport transfers and private Lebanon tours."}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView("reviews")}
                  className="shrink-0 bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  {currentLang === "ar" ? "عرض التقييمات" : "View reviews"}
                </button>
              </div>
            </section>

            {/* SOCIAL MEDIA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 border-t border-brand-border/40 deferred-section">
              <SocialSection currentLang={currentLang} />
            </section>
          </div>
        )}

        {/* VIEW 2: FLEET */}
        {activeView === "fleet" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="fleet-view">
            <FleetGrid currentLang={currentLang} onSelectVehicle={handleSelectVehicle} pageHeading />
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
            <TourCard currentLang={currentLang} onBookTour={handleBookTour} pageHeading />
          </div>
        )}

        {/* VIEW 5: ABOUT */}
        {activeView === "about" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 animate-fade-in space-y-8 text-brand-text" id="about-view">
            <div className={`text-center space-y-2 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
              <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest">{t.yearsExperience}</span>
              <h1 className="text-3xl font-bold text-brand-text tracking-tight">{t.navAbout}</h1>
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
                  <span className="text-3xl font-black text-brand-text font-sans block">{isRtl ? "٢٥+" : "25+"}</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">
                    {isRtl ? "عاماً من الخبرة" : "Years of Experience"}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-black text-brand-text font-sans block">{isRtl ? "٢٤/٧" : "24/7"}</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">
                    {isRtl ? "خدمة المطار" : "Airport Service"}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-black text-brand-text font-sans block">{isRtl ? "خيارات" : "Flexible"}</span>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-mono font-bold block">
                    {isRtl ? "سيارات بحسب الحجز" : "Vehicles by Booking"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: REVIEWS */}
        {activeView === "reviews" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="reviews-view">
            <ReviewsSection currentLang={currentLang} pageHeading />
          </div>
        )}

        {/* VIEW 7: CONTACT */}
        {activeView === "contact" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="contact-view">
            <ContactForm currentLang={currentLang} activeView={activeView} />
          </div>
        )}
        </React.Suspense>
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
            title={currentLang === "ar" ? "الرجوع للأعلى" : "Scroll to Top"}
            aria-label={currentLang === "ar" ? "الرجوع للأعلى" : "Scroll to top"}
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
