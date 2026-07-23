import { motion } from "motion/react";
import { Language } from "../types";
import { trackEvent } from "../utils/analytics";

interface WhatsAppFABProps {
  currentLang: Language;
  activeView: string;
}

const WHATSAPP_URL = "https://wa.me/9613460865";

export default function WhatsAppFAB({ currentLang, activeView }: WhatsAppFABProps) {
  const isRtl = currentLang === "ar";
  const label = currentLang === "ar" ? "افتح واتساب" : "Open WhatsApp";

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("click_whatsapp", "Conversions", `${activeView}_floating_button`)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={`fixed bottom-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-colors border border-white/20 cursor-pointer focus:outline-none ${
        isRtl ? "left-6" : "right-6"
      }`}
      title={label}
      aria-label={label}
      id="whatsapp-floating-action"
    >
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.438-9.887 9.891-9.887a9.82 9.82 0 0 1 6.988 2.895 9.825 9.825 0 0 1 2.9 6.989c-.002 5.452-4.439 9.888-9.896 9.896m8.413-18.297A11.815 11.815 0 0 0 12.055 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.689 1.448h.005c6.557 0 11.893-5.335 11.896-11.893a11.82 11.82 0 0 0-3.488-8.413" />
      </svg>
    </motion.a>
  );
}
