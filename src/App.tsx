import React from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  Compass, 
  Clock, 
  Car, 
  Award, 
  CheckCircle, 
  Plane, 
  PhoneCall, 
  Sparkles,
  CalendarDays,
  UtensilsCrossed,
  Map,
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import BookingWizard from "./components/BookingWizard";
import FleetGrid, { FLEET_VEHICLES } from "./components/FleetGrid";
import TourCard, { FEATURED_TOURS } from "./components/TourCard";
import ReviewsSection from "./components/ReviewsSection";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";
import BlogCarousel from "./components/BlogCarousel";
import TransfersSection from "./components/TransfersSection";
import SocialSection from "./components/SocialSection";
import SEO from "./components/SEO";
import WhatsAppFAB from "./components/WhatsAppFAB";
import UseCasesSection from "./components/UseCasesSection";

import { Language, Booking } from "./types";
import { translations } from "./translations";

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
    }
  }, [currentLang]);
  const [activeView, setActiveView] = React.useState<string>("home");
  const [selectedVehicleId, setSelectedVehicleId] = React.useState<string | undefined>(undefined);
  const [lastBooking, setLastBooking] = React.useState<Booking | null>(null);
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
    setSelectedVehicleId(vehicleId);
    setActiveView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle standard tour booking
  const handleBookTour = (tourId: string) => {
    // Scroll to booking and set type
    setActiveView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  const handleBookingCompleted = (booking: Booking) => {
    setLastBooking(booking);
    // Refresh admin data automatically
  };

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-accent/30 selection:text-white ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Dynamic SEO Meta Tags via React Helmet Async */}
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
      <main className="flex-grow">
        
        {/* VIEW 1: HOME */}
        {activeView === "home" && (
          <div className="space-y-16 pb-20 animate-fade-in" id="home-view">
            {/* Elegant Hero */}
            <Hero currentLang={currentLang} onNavigate={setActiveView} />

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
                        <CheckCircle className="w-4 h-4 shrink-0 text-brand-accent" />
                        <span>No Hidden Airport Surcharges</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-accent">
                        <CheckCircle className="w-4 h-4 shrink-0 text-brand-accent" />
                        <span>Free Flight Delay Tracking</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual card on the right */}
                  <div className="bg-brand-input border border-brand-border p-8 rounded-[24px] space-y-4 shadow-2xl relative z-10">
                    <span className="text-[10px] text-brand-accent font-mono uppercase tracking-widest block font-bold">{t.bookingFormTitle}</span>
                    <h3 className="text-xl font-bold text-brand-text font-sans tracking-tight">{t.bookTransferBtn}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Select your travel dates, specify pickup coordinates, and complete reservation inside our high-speed interactive reservation wizard.
                    </p>
                    <button
                      onClick={() => setActiveView("booking")}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-black font-bold text-xs py-3.5 rounded-xl cursor-pointer shadow-lg text-center block transition-all"
                    >
                      {t.bookNow}
                    </button>
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
                  <span className="text-3xl font-black text-brand-text font-sans block">20+</span>
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
            <ContactForm currentLang={currentLang} />
          </div>
        )}

        {/* VIEW 8: BOOKING WIZARD PAGE */}
        {activeView === "booking" && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="booking-view">
            <BookingWizard 
              currentLang={currentLang} 
              onBookingCompleted={handleBookingCompleted}
              selectedVehicleId={selectedVehicleId}
            />
          </div>
        )}

        {/* VIEW 9: ADMIN PANEL */}
        {activeView === "admin" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in" id="admin-view">
            <AdminDashboard currentLang={currentLang} />
          </div>
        )}

      </main>

      {/* Dynamic Footer */}
      <Footer currentLang={currentLang} setActiveView={setActiveView} />

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

      {/* Floating WhatsApp Action Button for 24/7 direct booking and inquiry support */}
      <WhatsAppFAB currentLang={currentLang} />
    </div>
  );
}
