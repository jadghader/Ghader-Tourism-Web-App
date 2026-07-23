import React from "react";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { Language } from "../types";

// Custom Tiktok SVG Icon since older lucide-react might not export Tiktok
function TiktokIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

interface SocialSectionProps {
  currentLang: Language;
}

export default function SocialSection({ currentLang }: SocialSectionProps) {
  const isRtl = currentLang === "ar";

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@ghadertourism",
      icon: Instagram,
      url: "https://instagram.com/ghadertourism",
      color: "hover:border-pink-500/30 hover:shadow-pink-950/10 hover:text-pink-400",
      iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    },
    {
      name: "Facebook",
      handle: "Ghader Tourism",
      icon: Facebook,
      url: "https://facebook.com/ghadertourism",
      color: "hover:border-blue-500/30 hover:shadow-blue-950/10 hover:text-blue-400",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      cta: { en: "Like our page", ar: "أعجب بصفحتنا" },
    },
    {
      name: "TikTok",
      handle: "@ghadertourism",
      icon: TiktokIcon,
      url: "https://tiktok.com/@ghadertourism",
      color: "hover:border-teal-400/30 hover:shadow-teal-950/10 hover:text-teal-400",
      iconBg: "bg-teal-400/10 text-teal-400 border-teal-400/20"
    }
  ];

  const sectionTitle = {
    en: "Connect with Us on Social Media",
    ar: "تواصل معنا عبر وسائل التواصل الاجتماعي"
  };

  const sectionSub = {
    en: "Explore stunning sightseeing highlights, look inside our premium private fleet, and watch our recent tours across Lebanon.",
    ar: "استكشف أبرز المعالم السياحية المذهلة، وتعرّف على أسطولنا الفاخر، وشاهد جولاتنا الأخيرة في جميع أنحاء لبنان."
  };

  const followBtn = {
    en: "Follow Us",
    ar: "تابعنا"
  };

  return (
    <div className="space-y-8" id="social-media-section">
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest bg-brand-accent/10 px-3.5 py-1 rounded-full border border-brand-accent/20 inline-block">
          {currentLang === "ar" ? "تابع رحلاتنا" : "Follow Our Journeys"}
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">
          {sectionTitle[currentLang]}
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">
          {sectionSub[currentLang]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-brand-card border border-brand-border p-6 rounded-[32px] flex flex-col justify-between gap-6 transition-all duration-300 group shadow-lg ${social.color}`}
              id={`social-card-${social.name.toLowerCase()}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl ${social.iconBg} flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-bg/60 border border-brand-border flex items-center justify-center text-brand-muted group-hover:text-brand-text group-hover:border-brand-accent/30 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className={`space-y-1.5 ${isRtl ? "text-right" : "text-left"}`}>
                  <h3 className="font-extrabold text-lg text-brand-text font-sans">
                    {social.name}
                  </h3>
                  <p className="text-xs text-brand-accent font-mono font-semibold">
                    {social.handle}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase ${isRtl ? "justify-start flex-row-reverse" : "justify-start"}`}>
                <span>{social.cta?.[currentLang] || followBtn[currentLang]}</span>
                <span className="text-brand-accent font-black">→</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
