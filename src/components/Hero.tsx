import React from "react";
import { Phone, Calendar, Compass, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../types";
import { translations } from "../translations";
import heroImage from "../assets/images/lebanon_luxury_chauffeur_hero_1782464049590.jpg";

interface HeroProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
}

export default function Hero({ currentLang, onNavigate }: HeroProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";
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

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
      <section className="relative min-h-[520px] h-[72vh] sm:h-[600px] flex items-center justify-center overflow-hidden text-white rounded-[24px] sm:rounded-[32px] border border-neutral-800 shadow-2xl" id="app-hero">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Luxury private chauffeur and airport transfer service in Beirut, Lebanon"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-10000"
            loading="eager"
            decoding="async"
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
                className={`inline-flex items-center gap-2.5 bg-[#141414]/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-xs font-semibold text-white shadow-lg ${isRtl ? "" : ""}`}
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-brand-accent">{currentLang === "ar" ? "توقيت بيروت المباشر:" : currentLang === "fr" ? "Heure de Beyrouth :" : "Beirut Local Time:"}</span>
                <span className="font-mono text-gray-200 font-bold" dir="ltr">{localTime || "00:00:00 PM"}</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight"
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
                className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed ${
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
                className={`flex flex-wrap gap-3 pt-2 text-xs text-neutral-300 ${isRtl ? "justify-start" : "justify-start"}`}
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
                className="flex pt-4 justify-start"
              >
                <a
                  href={`https://wa.me/9613460865?text=${encodeURIComponent(
                    currentLang === "ar"
                      ? "مرحباً غادِر للسياحة، أود حجز تاكسي مخصص من وإلى مطار بيروت الدولي."
                      : currentLang === "fr"
                      ? "Bonjour Ghader Tourism, je souhaite réserver un transfert de/vers l'aéroport de Beyrouth."
                      : "Hello Ghader Tourism, I would like to book a private transfer to/from Beirut Airport."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-black text-sm px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center"
                  id="hero-book-airport"
                >
                  <Calendar className="w-4 h-4 text-brand-btn-text" />
                  {t.bookTransferBtn}
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
