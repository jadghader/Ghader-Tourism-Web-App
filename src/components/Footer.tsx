import React from "react";
import { Phone, Mail, MapPin, Award, Shield, Heart } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import logoImage from "../assets/images/logo-optimized.jpg";

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
            <div className="flex items-center gap-2.5" dir={isRtl ? "rtl" : "ltr"}>
              <span className="h-14 w-14 rounded-xl overflow-hidden bg-white border border-brand-border shadow-sm flex items-center justify-center shrink-0 p-0.5">
                <img
                  src={logoImage}
                  alt={isRtl ? "شعار غادر للسياحة" : "Ghader Tourism logo"}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width="56"
                  height="56"
                />
              </span>
              <span className="text-brand-text font-extrabold text-base font-sans tracking-tight">
                {isRtl ? "غادر للسياحة" : t.brandName}
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed font-medium max-w-sm">
              {currentLang === "ar"
                ? "غادر للسياحة خدمة عائلية لبنانية بخبرة تتجاوز ٢٥ عاماً، نقدّم توصيلات المطار والنقل الخاص والجولات باهتمام شخصي وضيافة صادقة."
                : "Ghader Tourism is a Lebanese family-run service with 25+ years of experience, offering airport transfers, private transport, and tours with personal care and genuine hospitality."}
            </p>
            <div className={`flex flex-wrap gap-2 pt-1 ${isRtl ? "justify-start flex-row-reverse" : ""}`}>
              <span className="bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-lg border border-brand-accent/20 text-[9px] font-mono font-bold">
                {t.yearsExperience}
              </span>
              <span className="bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-lg border border-brand-accent/20 text-[9px] font-mono font-bold">
                {currentLang === "ar" ? "خدمة على مدار الساعة" : "24/7 Dispatch"}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-xs tracking-wide">
              {currentLang === "ar" ? "روابط سريعة" : "Quick Navigation"}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-semibold">
              <a href="/" onClick={(event) => { event.preventDefault(); handleLinkClick("home"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navHome}
              </a>
              <a href="/transfers" onClick={(event) => { event.preventDefault(); handleLinkClick("transfers"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navAirport}
              </a>
              <a href="/tours" onClick={(event) => { event.preventDefault(); handleLinkClick("tours"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navTours}
              </a>
              <a href="/fleet" onClick={(event) => { event.preventDefault(); handleLinkClick("fleet"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navFleet}
              </a>
              <a href="/reviews" onClick={(event) => { event.preventDefault(); handleLinkClick("reviews"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navReviews}
              </a>

              <a href="/about" onClick={(event) => { event.preventDefault(); handleLinkClick("about"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navAbout}
              </a>
              <a href="/contact" onClick={(event) => { event.preventDefault(); handleLinkClick("contact"); }} className="hover:text-brand-accent transition-all text-left block w-full cursor-pointer" style={{ textAlign: isRtl ? "right" : "left" }}>
                • {t.navContact}
              </a>
            </div>
          </div>

          {/* Column 3: Contact info */}
          <div className="space-y-2">
            <h3 className="text-brand-text font-bold text-xs tracking-wide">
              {currentLang === "ar" ? "معلومات الاتصال" : "Contact & Support"}
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
          <p>
            {isRtl
              ? `© ${new Date().getFullYear()} غادر للسياحة، لبنان. خبرة أكثر من ٢٥ عاماً في خدمات النقل الخاص.`
              : `© ${new Date().getFullYear()} ${t.brandName} Lebanon. 25+ years of premium chauffeur services.`}
          </p>
          <div className="flex gap-3">
            <a href="/about" onClick={(event) => { event.preventDefault(); handleLinkClick("about"); }} className="hover:text-brand-text transition-colors cursor-pointer">
              {t.navAbout}
            </a>
            <span className="opacity-20">|</span>
            <a href="/contact" onClick={(event) => { event.preventDefault(); handleLinkClick("contact"); }} className="hover:text-brand-text transition-colors cursor-pointer">
              {t.navContact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
