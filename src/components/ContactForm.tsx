import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import SocialSection from "./SocialSection";
import { getWhatsAppLink } from "../utils/whatsapp";

interface ContactFormProps {
  currentLang: Language;
  activeView: string;
}

export default function ContactForm({ currentLang, activeView }: ContactFormProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  return (
    <div className="space-y-16" id="contact-form">
      {/* Header */}
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">
          {t.contactTitle}
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">
          {t.contactSub}
        </p>
      </div>

      {/* Centered 3-Column Contact Cards */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Block */}
          <div className="bg-brand-card border border-brand-border p-6 rounded-[24px] flex flex-col items-center text-center gap-4 hover:border-brand-accent/30 transition-all duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs text-brand-muted font-mono font-bold uppercase tracking-wider">{t.phoneLabel}</h4>
              <a
                href="tel:+9613460865"
                className="text-sm font-black text-brand-text hover:text-brand-accent mt-1 inline-block border-b border-dashed border-brand-border hover:border-brand-accent transition-all duration-300"
                dir="ltr"
              >
                +961 3 460 865
              </a>
              <p className="text-[10px] text-brand-muted mt-1.5">24/7 Available for airport dispatch</p>
            </div>
          </div>

          {/* WhatsApp Block */}
          <div className="bg-brand-card border border-brand-border p-6 rounded-[24px] flex flex-col items-center text-center gap-4 hover:border-brand-accent/30 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs text-brand-muted font-mono font-bold uppercase tracking-wider">{t.contactWhatsApp}</h4>
              <a
                href={getWhatsAppLink({
                  lang: currentLang,
                  activeView,
                  contextType: "contact"
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-black text-emerald-400 hover:text-emerald-300 mt-1 inline-block border-b-2 border-dashed border-emerald-400/30 hover:border-emerald-300 hover:scale-105 transition-all duration-300 animate-pulse"
                dir="ltr"
              >
                +961 3 460 865
              </a>
              <p className="text-[10px] text-brand-muted mt-1.5">Immediate reservations via chat</p>
            </div>
          </div>

          {/* Email Block */}
          <div className="bg-brand-card border border-brand-border p-6 rounded-[24px] flex flex-col items-center text-center gap-4 hover:border-brand-accent/30 transition-all duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="w-full">
              <h4 className="text-xs text-brand-muted font-mono font-bold uppercase tracking-wider">{t.emailLabel}</h4>
              <p className="text-sm font-black text-brand-text mt-1 break-all select-all">ghadertourism@gmail.com</p>
              <p className="text-[10px] text-brand-muted mt-1.5">Corporate agreements & custom quotes</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Quick Connect Section */}
      <div className="max-w-xl mx-auto bg-brand-card border border-brand-border rounded-[32px] p-8 text-center space-y-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
        <div className="space-y-2">
          <span className="text-[10px] text-brand-accent font-mono uppercase tracking-widest font-bold block">
            {currentLang === "ar" ? "اتصال سريع ذكي" : currentLang === "fr" ? "Connexion Rapide" : "Smart Quick Connect"}
          </span>
          <h3 className="text-xl font-extrabold text-brand-text font-sans">
            {currentLang === "ar" ? "امسح رمز الاستجابة السريعة (QR)" : currentLang === "fr" ? "Scanner le Code QR" : "Scan to Chat Instantly"}
          </h3>
          <p className="text-brand-muted text-xs leading-relaxed max-w-sm mx-auto">
            {currentLang === "ar"
              ? "افتح كاميرا هاتفك وامسح الرمز لفتح محادثة واتساب آمنة وتأكيد الحجز فوراً."
              : currentLang === "fr"
              ? "Ouvrez l'appareil photo de votre téléphone pour scanner et démarrer une conversation WhatsApp sécurisée."
              : "Open your phone's camera and scan the code below to start an instant, secure WhatsApp consultation."}
          </p>
        </div>

        <div className="relative inline-block bg-white p-4 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwa.me%2F9613460865&color=059669&bgcolor=ffffff"
            alt="WhatsApp QR Code"
            className="w-40 h-40 object-contain block mx-auto"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-mono font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
            {currentLang === "ar" ? "واتساب مباشر" : currentLang === "fr" ? "WhatsApp Direct" : "WhatsApp Direct"}
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="pt-8 border-t border-brand-border">
        <SocialSection currentLang={currentLang} />
      </div>
    </div>
  );
}
