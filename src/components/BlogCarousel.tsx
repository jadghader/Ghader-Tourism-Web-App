import React from "react";
import { Language } from "../types";
import landscapeImage1 from "../assets/images/landing_en-optimized.jpg";
import landscapeImage2 from "../assets/images/landing_ar-optimized.jpg";

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
            {currentLang === "ar" ? "مدونة غادر السياحية" : "Ghader Travel Stories"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text tracking-tight font-sans">
            {currentLang === "ar" ? "استكشف جمال وتاريخ لبنان" : "Lebanon Sightseeing Inspiration"}
          </h2>
        </div>
      </div>

      <div className="group relative w-full overflow-hidden rounded-[24px] border-2 border-brand-accent bg-brand-accent shadow-2xl transition-all duration-300 animate-fade-in sm:rounded-[32px] md:rounded-[40px]">
        <div className="relative w-full overflow-hidden">
          <img
            src={activeImage}
            alt={currentLang === "ar" ? "رحلات ومشاهد سياحية خاصة في لبنان من غادر للسياحة" : "Luxury Lebanon sightseeing and private tour experiences with Ghader Tourism"}
            className="block h-auto w-full transition-transform duration-[10000ms] ease-out group-hover:scale-[1.015]"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="1600"
            height="900"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
