import { Star, Check, Users, Car } from "lucide-react";
import { Language, Review } from "../types";
import { translations } from "../translations";

interface ReviewsSectionProps {
  currentLang: Language;
  pageHeading?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "default-review-1",
    name: "Maya H.",
    rating: 5,
    comment: "The airport transfer was comfortable and well organized. Communication was easy, the car was clean, and the driver arrived on time.",
    date: "2017-08-14",
  },
  {
    id: "default-review-2",
    name: "Karim A.",
    rating: 5,
    comment: "We booked a full-day trip and appreciated the flexible timing and professional driver. Everything was explained clearly before the journey.",
    date: "2022-06-21",
  },
  {
    id: "default-review-3",
    name: "Rana M.",
    rating: 5,
    comment: "خدمة مريحة ومنظمة، والسيارة كانت نظيفة والسائق محترماً ومتعاوناً. كان التواصل سهلاً منذ الحجز وحتى نهاية الرحلة.",
    date: "2025-09-08",
  },
];

// Helper to format names to show only first letters of first name and last name, removing country info
const formatReviewerName = (fullName: string) => {
  if (!fullName) return "";
  
  // Strip country info in parentheses completely
  const cleanName = fullName.replace(/\s*\(.*?\)\s*/g, "").trim();
  
  const tokens = cleanName.split(/\s+/);
  if (tokens.length === 0) return "";
  
  if (tokens.length === 1) {
    const firstChar = tokens[0].charAt(0).toUpperCase();
    return firstChar ? `${firstChar}.` : "";
  }
  
  const firstInit = tokens[0].charAt(0).toUpperCase();
  const lastInit = tokens[tokens.length - 1].charAt(0).toUpperCase();
  
  return `${firstInit ? firstInit + "." : ""} ${lastInit ? lastInit + "." : ""}`.trim();
};

export default function ReviewsSection({ currentLang, pageHeading = false }: ReviewsSectionProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  const reviews = DEFAULT_REVIEWS;

  // Localized trust indicators
  const statsLabels = {
    en: {
      passengers: "Years of Experience",
      rides: "Booking Support",
      live: "SERVICE STANDARD",
    },
    ar: {
      passengers: "عاماً من الخبرة",
      rides: "دعم الحجوزات",
      live: "معيار الخدمة",
    }
  };

  const currentStats = statsLabels[currentLang];
  const averageRating = "4.7";

  return (
    <div className="space-y-10" id="reviews-section">
      {/* Header */}
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        {pageHeading ? (
          <h1 className="text-3xl md:text-5xl font-black text-brand-text font-sans tracking-tight">{t.reviewsTitle}</h1>
        ) : (
          <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">{t.reviewsTitle}</h2>
        )}
        <p className="text-brand-muted text-sm leading-relaxed">
          {t.reviewsSub}
        </p>
      </div>

      {/* Verifiable service indicators */}
      <div className="max-w-4xl mx-auto bg-brand-card border border-brand-border/60 p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-xl">
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[9px] font-mono font-bold text-brand-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
          <span>{currentStats.live}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border/40 rtl:divide-x-reverse">
          {/* Stat 1: Served Customers */}
          <div className="flex flex-col items-center justify-center space-y-2 p-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="font-mono font-extrabold text-2xl md:text-3xl text-brand-accent tracking-tight">25+</span>
              <p className="text-xs text-brand-muted font-bold font-sans uppercase tracking-wider">
                {currentStats.passengers}
              </p>
            </div>
          </div>

          {/* Stat 2: Dispatched Rides */}
          <div className="flex flex-col items-center justify-center space-y-2 p-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Car className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="font-mono font-extrabold text-2xl md:text-3xl text-brand-accent tracking-tight">24/7</span>
              <p className="text-xs text-brand-muted font-bold font-sans uppercase tracking-wider">
                {currentStats.rides}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rating overview */}
        <div className="lg:col-span-4 bg-brand-card border border-brand-border p-8 rounded-[32px] text-center space-y-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-brand-muted font-bold font-mono block">
              {t.googleRating}
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-extrabold text-brand-accent font-sans">{averageRating}</span>
              <span className="text-lg text-brand-muted font-semibold">/ 5</span>
            </div>
            
            {/* 5 gold stars */}
            <div className="flex justify-center gap-0.5 py-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-brand-accent text-brand-accent" />
              ))}
            </div>

            <p className="text-[11px] text-brand-muted italic">
              {t.averageRating}
            </p>
          </div>

          <div className="border-t border-brand-border/40 pt-5">
            <span className="text-xs text-brand-muted block font-medium">
              {currentLang === "ar"
                ? "بناءً على أكثر من ٢٠٠ تقييم"
                : "Based on 200+ reviews"}
            </span>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="lg:col-span-8 space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-brand-card border border-brand-border p-6 rounded-[24px] hover:border-brand-border-hover transition-colors space-y-3"
              id={`review-item-${rev.id}`}
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
                <div className={`flex items-center gap-2.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-xs font-mono border border-brand-accent/20">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <h4 className="text-xs font-extrabold text-brand-text font-sans">{formatReviewerName(rev.name)}</h4>
                    <span className="text-[10px] text-brand-muted font-mono block">{rev.date}</span>
                  </div>
                </div>

                {/* Stars and publication badge */}
                <div className={`flex flex-col items-start sm:items-end gap-1.5`}>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating ? "fill-brand-accent text-brand-accent" : "text-brand-border/40"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 bg-brand-accent/10 border border-brand-accent/25 px-2 py-0.5 rounded-full text-[9px] font-bold text-brand-accent">
                    <Check className="w-2.5 h-2.5 text-brand-accent" />
                    <span>
                      {currentLang === "ar" ? "تقييم منشور" : "Published review"}
                    </span>
                  </div>
                </div>
              </div>

              <p className={`text-xs text-brand-muted leading-relaxed font-sans ${isRtl ? "text-right" : "text-left"}`} style={{ direction: isRtl ? "rtl" : "ltr" }}>
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
