import React from "react";
import { createPortal } from "react-dom";
import { Calendar, ShieldCheck, X, LoaderCircle, Clock, Plane, MessageSquare, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";
import { translations } from "../translations";
import heroImage from "../assets/images/hero.webp";
import { trackEvent } from "../utils/analytics";
import CalendarDatePicker from "./CalendarDatePicker";

interface HeroProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
}

export default function Hero({ currentLang, onNavigate }: HeroProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [bookingDate, setBookingDate] = React.useState("");
  const [bookingTime, setBookingTime] = React.useState("");
  const [flightNumber, setFlightNumber] = React.useState("");
  const [bookingError, setBookingError] = React.useState("");
  const [isBooking, setIsBooking] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const wasBookingModalOpen = React.useRef(false);
  const scrollPosition = React.useRef(0);

  const [localTime, setLocalTime] = React.useState("");

  React.useEffect(() => {
    // Show Beirut Time (UTC+3 / Eastern European Summer Time depending on DST, let's calculate based on UTC offset or standard Beirut local time)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Beirut",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat(currentLang === "ar" ? "ar-LB" : "en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const bgImage = heroImage;

  const handleOpenBookingModal = () => {
    trackEvent("open_booking", "Conversions", "hero_airport_transfer");
    setBookingModalOpen(true);
  };

  const handleBookNow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bookingDate || !bookingTime) {
      setBookingError(
        currentLang === "ar"
          ? "يرجى اختيار تاريخ الرحلة ووقت الاستقبال."
          : "Please select your travel date and pickup time."
      );
      return;
    }

    setBookingError("");
    setIsBooking(true);

    const cleanFlightNumber = flightNumber.trim().toUpperCase();
    const message = currentLang === "ar"
      ? [
          "مرحباً غادر للسياحة، أود حجز تاكسي خاص من أو إلى مطار بيروت.",
          "",
          "تفاصيل الحجز:",
          `• التاريخ: ${bookingDate}`,
          `• وقت الاستقبال (بتوقيت بيروت): ${bookingTime}`,
          ...(cleanFlightNumber ? [`• رقم الرحلة: ${cleanFlightNumber}`] : []),
          "",
          "يرجى تأكيد التوفر وإرسال عرض السعر."
        ].join("\n")
      : [
          "Hello Ghader Tourism, I would like to book a private taxi to or from Beirut Airport.",
          "",
          "Booking details:",
          `• Date: ${bookingDate}`,
          `• Pickup time (Beirut local time): ${bookingTime}`,
          ...(cleanFlightNumber ? [`• Flight code: ${cleanFlightNumber}`] : []),
          "",
          "Please confirm availability and send me a quote."
        ].join("\n");

    const url = `https://wa.me/9613460865?text=${encodeURIComponent(message)}`;
    trackEvent("click_whatsapp", "Conversions", "hero_airport_transfer");
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setBookingModalOpen(false);
      setIsBooking(false);
      setBookingDate('');
      setBookingTime('');
      setFlightNumber('');
      setBookingError('');
    }, 800);
  };

  // Handle keyboard events for accessibility
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && bookingModalOpen) {
        setBookingModalOpen(false);
      }
    };

    if (bookingModalOpen) {
      // Keep the page at the exact scroll position where the dialog was opened.
      scrollPosition.current = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.addEventListener('keydown', handleKeyDown);
      document.getElementById('booking-modal-title')?.focus({ preventScroll: true });
    } else if (wasBookingModalOpen.current) {
      // Return focus to the trigger button when modal closes
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasBookingModalOpen.current = bookingModalOpen;
    
    // Cleanup function
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (bookingModalOpen) {
        window.scrollTo({ top: scrollPosition.current, behavior: 'instant' });
      }
    };
  }, [bookingModalOpen]);

  return (
    <>
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
      <section className="relative min-h-[520px] h-[72vh] sm:h-[600px] flex items-center justify-center overflow-hidden text-white rounded-[24px] sm:rounded-[32px] border border-neutral-800 shadow-2xl" id="app-hero">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Luxury private chauffeur overlooking the Jounieh bay in Lebanon at sunset"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-10000"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="1600"
            height="960"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${isRtl ? "bg-gradient-to-l from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/45" : "bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-transparent"}`} />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 py-8 sm:py-12">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isRtl ? "text-right" : "text-left"}`}>
            
            <div className="lg:col-span-8 space-y-6">
              {/* Beirut Local Time & Status */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`inline-flex items-center gap-2.5 bg-[#141414]/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-xs font-semibold text-white shadow-lg`}
              >
                <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                <span className="font-semibold text-brand-accent">{currentLang === "ar" ? "توقيت بيروت المباشر:" : "Beirut Local Time:"}</span>
                <span className="font-mono text-gray-200 font-bold" dir="ltr">{localTime || "00:00:00 PM"}</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight [will-change:transform,opacity]"
              >
                {t.heroTitle.split("&").map((part, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="text-gradient bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent">& {part}</span> : part}
                  </span>
                ))}
              </motion.h1>

              {/* Subhead */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed [will-change:transform,opacity] ${
                  isRtl ? "text-neutral-100 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "text-neutral-300"
                }`}
              >
                {t.heroSubhead}
              </motion.p>

              {/* Features list */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`flex flex-wrap gap-3 pt-2 text-xs text-neutral-300 [will-change:transform,opacity] ${isRtl ? "justify-start" : "justify-start"}`}
              >
                <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>{t.expTitle}</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>{t.airportAuthorized}</span>
                </div>
              </motion.div>

              {/* Call to Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row pt-4 justify-start items-stretch sm:items-center gap-3 [will-change:transform,opacity]"
              >
                <button
                  onClick={handleOpenBookingModal}
                  className="w-full sm:w-auto bg-brand-accent text-brand-btn-text font-black text-sm px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center touch-manipulation [@media(hover:hover)]:hover:bg-brand-accent-hover [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98]"
                  id="hero-book-airport"
                  ref={triggerRef}
                >
                  <Calendar className="w-4 h-4 text-brand-btn-text" />
                  {t.bookTransferBtn}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("tours")}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/25 font-bold text-sm px-6 py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  {currentLang === "ar" ? "استكشف الجولات الخاصة" : "Explore private tours"}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    {typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-[1000] flex items-center justify-center p-4 overscroll-contain"
            onClick={() => setBookingModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-brand-card border border-brand-border rounded-[28px] p-5 sm:p-6 w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl space-y-5 relative"
              onClick={(e) => e.stopPropagation()}
              dir={isRtl ? "rtl" : "ltr"}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className={`flex justify-between items-center ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-accent/10 border border-brand-accent/20 rounded-lg flex items-center justify-center text-brand-accent">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 id="booking-modal-title" tabIndex={-1} className="font-black text-lg text-brand-text outline-none">{t.bookTransferBtn}</h3>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      {currentLang === "ar" ? "أدخل التفاصيل وسنجهز رسالة واتساب للحجز." : "Add your details and we’ll prepare your WhatsApp booking message."}
                    </p>
                  </div>
                </div>
                <button onClick={() => setBookingModalOpen(false)} className="p-1 text-brand-muted hover:text-brand-text" aria-label={currentLang === "ar" ? "إغلاق نافذة الحجز" : "Close booking dialog"}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBookNow} className="space-y-5">
                <div>
                  <label className={`text-xs font-extrabold text-brand-text flex items-center gap-2 mb-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    <span>{currentLang === "ar" ? "اختر تاريخ الرحلة" : "Choose your travel date"}</span>
                  </label>
                  <CalendarDatePicker selectedDate={bookingDate} onChange={(date) => { setBookingDate(date); setBookingError(""); }} currentLang={currentLang} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="booking-time-input" className={`text-xs font-extrabold text-brand-text flex items-center gap-2 mb-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                      <Clock className="w-4 h-4 text-brand-accent" />
                      <span>{currentLang === "ar" ? "وقت الاستقبال" : "Pickup time"}</span>
                    </label>
                    <input
                      id="booking-time-input"
                      type="time"
                      required
                      value={bookingTime}
                      onChange={(event) => { setBookingTime(event.target.value); setBookingError(""); }}
                      className="w-full bg-brand-input border border-brand-border rounded-xl p-3 text-sm text-brand-text focus:outline-none focus:border-brand-accent"
                    />
                    <p className="text-[9px] text-brand-muted mt-1.5">{currentLang === "ar" ? "بتوقيت بيروت المحلي" : "Beirut local time"}</p>
                  </div>

                  <div>
                    <label htmlFor="booking-flight-input" className={`text-xs font-extrabold text-brand-text flex items-center gap-2 mb-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                      <Plane className="w-4 h-4 text-brand-accent" />
                      <span>{currentLang === "ar" ? "رقم الرحلة (اختياري)" : "Flight number (optional)"}</span>
                    </label>
                    <input
                      id="booking-flight-input"
                      type="text"
                      value={flightNumber}
                      onChange={(event) => setFlightNumber(event.target.value.toUpperCase())}
                      placeholder={currentLang === "ar" ? "مثال: MEA 204" : "e.g. MEA 204"}
                      autoCapitalize="characters"
                      maxLength={12}
                      className="w-full bg-brand-input border border-brand-border rounded-xl p-3 text-sm text-brand-text uppercase focus:outline-none focus:border-brand-accent placeholder-brand-muted/40"
                    />
                    <p className="text-[9px] text-brand-muted mt-1.5">{currentLang === "ar" ? "يساعدنا على متابعة موعد الوصول" : "Helps us monitor your arrival"}</p>
                  </div>
                </div>

                {bookingError && (
                  <p role="alert" className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    {bookingError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-black text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait shadow-lg"
                >
                  {isBooking ? (
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                  ) : (
                    <><MessageSquare className="w-4 h-4" />{currentLang === "ar" ? "المتابعة والحجز عبر واتساب" : "Continue to WhatsApp"}</>
                  )}
                </button>
                <p className="text-center text-[10px] text-brand-muted mt-2">
                  {
                    currentLang === 'ar'
                    ? 'سيتم فتح واتساب مع رسالة جاهزة.'
                    : 'This will open WhatsApp with a pre-filled message.'
                  }
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
    </>
  );
}
