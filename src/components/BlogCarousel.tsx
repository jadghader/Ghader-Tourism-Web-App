import React from "react";
import { Language } from "../types";
import landscapeImage1 from "../assets/images/landing_en.png";
import landscapeImage2 from "../assets/images/landing_ar.png";

interface BlogCarouselProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
}

export default function BlogCarousel({ currentLang }: BlogCarouselProps) {
  const isRtl = currentLang === "ar";
  const activeImage = currentLang === "ar" ? landscapeImage2 : landscapeImage1;

  return (
    <div className="space-y-6" id="blog-carousel-section">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
        <div>
          <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest block mb-1">
            {currentLang === "ar" ? "مدونة غادِر السياحية" : currentLang === "fr" ? "Blog de Voyage Liban" : "Ghader Travel Stories"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text tracking-tight font-sans">
            {currentLang === "ar" ? "استكشف جمال وتاريخ لبنان" : currentLang === "fr" ? "Explorez le Charme du Liban" : "Lebanon Sightseeing Inspiration"}
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[52px] border-2 sm:border-[2.5px] md:border-3 border-brand-accent bg-[#0a0a0a] shadow-2xl aspect-video sm:aspect-auto sm:h-[560px] md:h-[720px] flex items-center justify-center group transition-all duration-300 animate-fade-in">
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[36px]">
          <img
            src={activeImage}
            alt={currentLang === "ar" ? "Ghader Tourism Lebanon Arabic story" : "Ghader Tourism Lebanon story"}
            className="w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
