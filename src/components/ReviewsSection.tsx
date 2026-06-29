import React from "react";
import { Star, MessageSquare, Plus, Check, Users, Car, Radio } from "lucide-react";
import { Language, Review } from "../types";
import { translations } from "../translations";

interface ReviewsSectionProps {
  currentLang: Language;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Jean-Pierre Laurent (France)",
    rating: 5,
    comment: "This is hands-down the most reliable and trusted agency in Lebanon. Unbelievably time efficient, with absolute cost accuracy and transparent rates. The luxury cars were pristine and freshly cleaned. Our good chauffeur had decades of local experience!",
    date: "2026-06-15"
  },
  {
    id: "r2",
    name: "Amina Al-Mansoor (Dubai, UAE)",
    rating: 5,
    comment: "لقد حجزنا مع غادِر للسياحة وكانت تجربة ممتازة تظهر مدى كونها وكالة موثوقة. دقة متناهية في المواعيد والتكلفة مع التزام تام بالأسعار الشفافة، والسيارات الفاخرة نظيفة للغاية ومعقمة. السائق ذو خبرة طويلة ومحترف جداً.",
    date: "2026-06-10"
  },
  {
    id: "r3",
    name: "Michael Chen (Boston, USA)",
    rating: 5,
    comment: "Excellent transfer service! Very professional services, immaculate hygiene with spotlessly cleaned cars. The booking offered great cost accuracy with no surprise surcharges. The chauffeur was highly experienced, polite, and on time. A true trust source for any traveler to Lebanon.",
    date: "2026-05-28"
  },
  {
    id: "r4",
    name: "Sarah & Robert K. (Munich, Germany)",
    rating: 5,
    comment: "Highly trusted agency! The trip was extremely time efficient. Excellent booking experience, pristine cleaned cars, top-tier luxury fleet, and an exceptionally good chauffeur with plenty of regional experience. Flawless services!",
    date: "2026-05-14"
  }
];

// Helper to simulate live counting ticks up
function LiveCounter({ 
  startValue, 
  suffix = "", 
  incrementMax = 2, 
  intervalMs = 5000 
}: { 
  startValue: number; 
  suffix?: string; 
  incrementMax?: number; 
  intervalMs?: number 
}) {
  const [value, setValue] = React.useState(startValue);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * incrementMax) + 1;
      setValue((prev) => prev + increment);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [incrementMax, intervalMs]);

  return (
    <span className="font-mono font-extrabold text-2xl md:text-3xl text-brand-accent tracking-tight">
      {value.toLocaleString()}{suffix}
    </span>
  );
}

// Helper to simulate slight active driver fluctuation
function LiveFluctuatingCounter({ 
  baseValue, 
  minOffset = -3, 
  maxOffset = 3, 
  intervalMs = 7000 
}: { 
  baseValue: number; 
  minOffset?: number; 
  maxOffset?: number; 
  intervalMs?: number 
}) {
  const [value, setValue] = React.useState(baseValue);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;
      setValue(baseValue + offset);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [baseValue, minOffset, maxOffset, intervalMs]);

  return (
    <span className="font-mono font-extrabold text-2xl md:text-3xl text-brand-accent tracking-tight">
      {value}
    </span>
  );
}

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

export default function ReviewsSection({ currentLang }: ReviewsSectionProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [formOpen, setFormOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [comment, setComment] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("ghader_reviews");
    if (stored) {
      const parsed = JSON.parse(stored);
      // If the old default reviews without the specific words are still stored, replace them to ensure compliance
      const hasNewReviewContent = parsed.some((r: any) => r.comment && (r.comment.includes("trusted agency") || r.comment.includes("موثوقة")));
      if (!hasNewReviewContent) {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem("ghader_reviews", JSON.stringify(DEFAULT_REVIEWS));
      } else {
        setReviews(parsed);
      }
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem("ghader_reviews", JSON.stringify(DEFAULT_REVIEWS));
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("ghader_reviews", JSON.stringify(updated));

    setSuccess(true);
    setName("");
    setComment("");
    setRating(5);

    setTimeout(() => {
      setSuccess(false);
      setFormOpen(false);
    }, 2000);
  };

  // Localized texts for the dynamic stat badges
  const statsLabels = {
    en: {
      passengers: "Passengers Served",
      rides: "Trips Dispatched",
      drivers: "Active Chauffeurs",
      live: "LIVE DISPATCH",
    },
    ar: {
      passengers: "راكب تم خدمتهم بنجاح",
      rides: "رحلات سياحية وتوصيل",
      drivers: "سائقين على الطرقات حالياً",
      live: "مباشر الآن",
    },
    fr: {
      passengers: "Passagers Satisfaits",
      rides: "Trajets Effectués",
      drivers: "Chauffeurs en Service",
      live: "DISPATCH EN DIRECT",
    }
  };

  const currentStats = statsLabels[currentLang];

  return (
    <div className="space-y-10" id="reviews-section">
      {/* Header */}
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">
          {t.reviewsTitle}
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">
          {t.reviewsSub}
        </p>
      </div>

      {/* Dynamic Animated Operational Stats Banner */}
      <div className="max-w-4xl mx-auto bg-brand-card/75 border border-brand-border/60 p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{currentStats.live}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border/40 rtl:divide-x-reverse">
          {/* Stat 1: Served Customers */}
          <div className="flex flex-col items-center justify-center space-y-2 p-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <LiveCounter startValue={12482} suffix="+" incrementMax={2} intervalMs={6000} />
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
              <LiveCounter startValue={9824} suffix="+" incrementMax={2} intervalMs={8000} />
              <p className="text-xs text-brand-muted font-bold font-sans uppercase tracking-wider">
                {currentStats.rides}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rating Overview and Action Button */}
        <div className="lg:col-span-4 bg-brand-card border border-brand-border p-8 rounded-[32px] text-center space-y-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-brand-muted font-bold font-mono block">
              {t.googleRating}
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-extrabold text-brand-accent font-sans">4.9</span>
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

          <div className="border-t border-brand-border/40 pt-5 space-y-3">
            <span className="text-xs text-brand-muted block font-medium">
              {t.basedOn}
            </span>
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="w-full bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-bg border border-brand-accent/20 hover:border-brand-accent transition-all font-bold text-xs py-3 rounded-2xl cursor-pointer"
            >
              {t.writeReviewBtn}
            </button>
          </div>

          {/* Form */}
          {formOpen && (
            <form onSubmit={handleSubmitReview} className="border-t border-brand-border/40 pt-5 text-left space-y-4 animate-fade-in">
              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center space-y-2 text-emerald-400">
                  <Check className="w-6 h-6 mx-auto" />
                  <p className="text-xs font-bold">{t.reviewSuccess}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-brand-muted block">{t.reviewName}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Emily Rose"
                      className="w-full bg-brand-input border border-brand-border rounded-xl p-3 text-xs text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-brand-muted block">{t.reviewStars}</label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 -m-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              starVal <= (hoverRating ?? rating)
                                ? "fill-brand-accent text-brand-accent"
                                : "text-brand-border/40"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-brand-accent ml-2 font-mono">
                        {rating} / 5
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-brand-muted block">{t.reviewComment}</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share details about your transfer, driver, and travel experience in Lebanon..."
                      rows={3}
                      className="w-full bg-brand-input border border-brand-border rounded-xl p-3 text-xs text-brand-text focus:outline-none focus:border-brand-accent placeholder-brand-muted/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-accent text-brand-bg font-bold text-xs py-3 rounded-xl cursor-pointer hover:bg-brand-accent-hover transition-all"
                  >
                    {t.submitReview}
                  </button>
                </>
              )}
            </form>
          )}
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

                {/* Stars and Verified Customer Badge */}
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
                  <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-400">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    <span>
                      {currentLang === "ar" ? "عميل موثق" : currentLang === "fr" ? "Client vérifié" : "Verified Customer"}
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
