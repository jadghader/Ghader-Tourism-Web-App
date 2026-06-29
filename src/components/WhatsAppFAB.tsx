import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";

interface WhatsAppFABProps {
  currentLang: Language;
}

const WHATSAPP_CONFIG = {
  phone: "9613460865", // +961 3 460 865
  messages: {
    en: "Hello Ghader Tourism, I would like to inquire about booking a premium private transfer or tour in Lebanon.",
    ar: "مرحباً غادِر للسياحة، أود الاستفسار عن حجز توصيلة خاصة أو جولة سياحية في لبنان.",
    fr: "Bonjour Ghader Tourism, je souhaite me renseigner sur la réservation d'un transfert privé ou d'un circuit au Liban."
  },
  labels: {
    en: "Chat with Us 24/7",
    ar: "تواصل معنا ٢٤/٧",
    fr: "Contactez-nous 24/7"
  },
  subtext: {
    en: "Instant Booking",
    ar: "حجز فوري",
    fr: "Réservation Instantanée"
  }
};

export default function WhatsAppFAB({ currentLang }: WhatsAppFABProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = currentLang === "ar";

  // Auto-collapse after 6 seconds to keep UI clean and unobtrusive
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const message = WHATSAPP_CONFIG.messages[currentLang] || WHATSAPP_CONFIG.messages.en;
  const label = WHATSAPP_CONFIG.labels[currentLang] || WHATSAPP_CONFIG.labels.en;
  const subtext = WHATSAPP_CONFIG.subtext[currentLang] || WHATSAPP_CONFIG.subtext.en;
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(message)}`;

  // Determine if label ribbon should be open
  const showRibbon = isExpanded || isHovered;

  return (
    <div 
      className={`fixed bottom-6 z-50 flex items-center gap-2 pointer-events-auto ${
        isRtl ? "left-6 flex-row-reverse" : "right-6 flex-row"
      }`}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
      id="whatsapp-floating-action"
    >
      {/* Animated Localized Label Ribbon */}
      <AnimatePresence>
        {showRibbon && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, width: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, width: "auto", x: 0 }}
            exit={{ opacity: 0, width: 0, x: isRtl ? -20 : 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={`flex flex-col justify-center px-4 py-2 bg-brand-card/95 hover:bg-brand-card border border-brand-accent/30 hover:border-brand-accent/50 rounded-2xl shadow-xl whitespace-nowrap min-w-[120px] transition-colors cursor-pointer select-none backdrop-blur-md`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-brand-accent">
              {subtext}
            </span>
            <span className="text-[12px] font-sans font-bold text-brand-text leading-tight">
              {label}
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Pulsing Trigger Button */}
      <div className="relative">
        {/* Double animated ambient halo glow */}
        <span className="absolute inset-0 rounded-full bg-brand-accent/20 animate-ping duration-1000 pointer-events-none scale-125" />
        <span className="absolute inset-0 rounded-full bg-brand-accent/10 animate-pulse duration-1500 pointer-events-none scale-150" />

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg rounded-full shadow-2xl flex items-center justify-center transition-all border border-brand-accent/30 cursor-pointer focus:outline-none"
          title={label}
        >
          {/* Authentic WhatsApp Logo */}
          <svg 
            className="w-7 h-7 fill-brand-bg drop-shadow-md" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 2c-5.523 0-10 4.477-10 10 0 1.777.465 3.492 1.348 5.008L2 22l5.12-1.343c1.472.805 3.125 1.233 4.904 1.233 5.523 0 10-4.477 10-10s-4.477-10-10-10zm5.836 14.12c-.244.688-1.21 1.26-1.68 1.332-.423.064-.972.108-1.564-.08-1.04-.33-2.313-.888-3.414-1.854-1.085-.953-1.802-1.92-2.128-2.454-.326-.534-.344-.73-.024-1.055.244-.247.48-.564.72-.848.24-.284.32-.484.48-.808.16-.324.08-.604-.04-.848-.12-.244-1.04-2.508-1.428-3.444-.376-.912-.76-.788-1.04-.804-.268-.012-.576-.016-.884-.016-.308 0-.808.116-1.232.58-.424.464-1.62 1.584-1.62 3.864s1.66 4.48 1.892 4.792c.232.312 3.268 4.992 7.92 7 1.108.476 1.972.76 2.644.972 1.112.352 2.128.3 2.932.18.896-.132 2.76-.128 3.148-1.096.388-.968.388-1.8.272-1.972-.116-.172-.424-.276-.904-.516z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
