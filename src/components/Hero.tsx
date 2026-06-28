import React from "react";
import { Phone, Calendar, Compass, ShieldCheck } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";

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

  // Use the generated hero image
  const bgImage = "/src/assets/images/lebanon_luxury_chauffeur_hero_1782464049590.jpg";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden text-white rounded-[32px] border border-neutral-800 shadow-2xl" id="app-hero">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Luxury Chauffeur Services Lebanon"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-8 md:px-12 py-12">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isRtl ? "text-right" : "text-left"}`}>
            
            <div className="lg:col-span-8 space-y-6">
              {/* Beirut Local Time & Status */}
              <div className={`inline-flex items-center gap-2.5 bg-[#141414]/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-xs font-semibold text-white shadow-lg ${isRtl ? "flex-row-reverse" : ""}`}>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-brand-accent">{currentLang === "ar" ? "توقيت بيروت المباشر:" : currentLang === "fr" ? "Heure de Beyrouth :" : "Beirut Local Time:"}</span>
                <span className="font-mono text-gray-200 font-bold" dir="ltr">{localTime || "00:00:00 PM"}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight">
                {t.heroTitle.split("&").map((part, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="text-gradient bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent">& {part}</span> : part}
                  </span>
                ))}
              </h1>

              {/* Subhead */}
              <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                {t.heroSubhead}
              </p>

              {/* Features list */}
              <div className={`flex flex-wrap gap-3 pt-2 text-xs text-neutral-300 ${isRtl ? "justify-start flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>{t.expTitle}</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>{t.airportAuthorized}</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className={`flex flex-col sm:flex-row gap-3 pt-4 ${isRtl ? "sm:flex-row-reverse justify-start" : ""}`}>
                <button
                  onClick={() => onNavigate("booking")}
                  className="bg-brand-accent hover:bg-brand-accent-hover text-black font-bold text-sm px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-book-airport"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  {t.bookTransferBtn}
                </button>

                <a
                  href="https://wa.me/9613460865?text=Hello%20Ghader%20Tourism,%20I'm%20interested%20in%20private%20transfers%20and%20tours%20in%20Lebanon."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                  id="hero-whatsapp-contact"
                >
                  <Phone className="w-4 h-4" />
                  {t.contactWhatsAppBtn}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
