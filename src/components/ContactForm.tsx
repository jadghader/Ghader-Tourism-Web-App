import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import SocialSection from "./SocialSection";

interface ContactFormProps {
  currentLang: Language;
}

export default function ContactForm({ currentLang }: ContactFormProps) {
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
              <p className="text-sm font-black text-brand-text mt-1" dir="ltr">+961 3 460 865</p>
              <p className="text-[10px] text-brand-muted mt-1.5">24/7 Available for airport dispatch</p>
            </div>
          </div>

          {/* WhatsApp Block */}
          <div className="bg-brand-card border border-brand-border p-6 rounded-[24px] flex flex-col items-center text-center gap-4 hover:border-brand-accent/30 transition-all duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs text-brand-muted font-mono font-bold uppercase tracking-wider">{t.contactWhatsApp}</h4>
              <a
                href="https://wa.me/9613460865"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-black text-emerald-400 hover:underline mt-1 block"
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

      {/* Social Media Section */}
      <div className="pt-8 border-t border-brand-border">
        <SocialSection currentLang={currentLang} />
      </div>
    </div>
  );
}
