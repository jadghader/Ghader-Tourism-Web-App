import React from "react";
import { Phone, Mail, MapPin, Award, Shield, Heart } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import logoImage from "../assets/images/logo.webp";

interface FooterProps {
  currentLang: Language;
  setActiveView: (view: string) => void;
  activeView: string;
}

export default function Footer({ currentLang, setActiveView, activeView }: FooterProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  const handleLinkClick = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-footer text-brand-muted text-xs border-t border-brand-footer-border py-8" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 ${isRtl ? "text-right" : "text-left"}`}>
          {/* Column 1: Brand details */}
          <div className="space-y-3">
            <div className={`flex items-center gap-2.5 ${isRtl ? "flex-row-reverse" : ""}`}>
              <img
                src={logoImage}
                alt="Ghader Tourism premium chauffeur service logo"
                className="h-10 w-10 rounded-full object-cover border border-brand-border shadow-sm"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="40"
                height="40"
              />
              <span className="text-brand-text font-extrabold text-base font-sans tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed font-medium">
              {translations[currentLang].aboutStoryBody.slice(0, 140)}...
            </p>
            <div className={`flex flex-wrap gap-2 pt-1 ${isRtl ? "justify-start flex-row-reverse" : ""}`}>
              <span className="bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-lg border border-brand-accent/20 text-[9px] font-mono font-bold">
                {t.yearsExperience}
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-lg border border-emerald-500/20 text-[9px] font-mono font-bold">
                24/7 Dispatch
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-xs tracking-wide">
              {currentLang === "ar" ? "روابط سريعة" : currentLang === "fr" ? "Navigation" : "Quick Navigation"}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-semibold">
              <button onClick={() => handleLinkClick("home")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navHome}
              </button>
              <button onClick={() => handleLinkClick("transfers")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {currentLang === "ar" ? "تاكسي وسائقون" : currentLang === "fr" ? "Taxi & Chauffeurs" : "Taxi & Drivers"}
              </button>
              <button onClick={() => handleLinkClick("tours")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navTours}
              </button>
              <button onClick={() => handleLinkClick("fleet")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navFleet}
              </button>

              <button onClick={() => handleLinkClick("about")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navAbout}
              </button>
              <button onClick={() => handleLinkClick("contact")} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navContact}
              </button>
            </div>
          </div>

          {/* Column 3: Contact info */}
          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-xs tracking-wide">
              {currentLang === "ar" ? "معلومات الاتصال" : currentLang === "fr" ? "Nous Contacter" : "Contact & Support"}
            </h3>
            <ul className="space-y-1.5 text-[11px] font-medium">
              <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span dir="ltr" className="font-bold">+961 3 460 865</span>
              </li>
              <li className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span className="font-mono">ghadertourism@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal mentions */}
        <div className="border-t border-brand-footer-border pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-brand-muted">
          <p>© {new Date().getFullYear()} {t.brandName} Lebanon. 25+ years of premium chauffeur services.</p>
          <div className="flex gap-3">
            <button onClick={() => handleLinkClick("about")} className="hover:text-brand-text transition-colors cursor-pointer">
              {t.navAbout}
            </button>
            <span className="opacity-20">|</span>
            <button onClick={() => handleLinkClick("contact")} className="hover:text-brand-text transition-colors cursor-pointer">
              {t.navContact}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
