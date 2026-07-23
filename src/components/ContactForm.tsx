import React from "react";
import { Phone } from "lucide-react";
import { Language } from "../types";
import { translations } from "../translations";
import SocialSection from "./SocialSection";
import { getWhatsAppLink } from "../utils/whatsapp";
import whatsappQrImage from "../assets/images/whatsapp-qr.png";

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
        <h1 className="text-3xl md:text-5xl font-black text-brand-text font-sans tracking-tight">
          {t.contactTitle}
        </h1>
        <p className="text-brand-muted text-sm leading-relaxed">
          {t.contactSub}
        </p>
      </div>

      {/* Direct contact options */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <p className="text-[10px] text-brand-muted mt-1.5">{currentLang === "ar" ? "اطلب حجزك عبر الاتصال" : "Request a reservation via call"}</p>
            </div>
          </div>

          {/* WhatsApp Block */}
          <div className="bg-brand-card border border-brand-border p-6 rounded-[24px] flex flex-col items-center text-center gap-4 hover:border-brand-accent/30 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.438-9.887 9.891-9.887a9.82 9.82 0 0 1 6.988 2.895 9.825 9.825 0 0 1 2.9 6.989c-.002 5.452-4.439 9.888-9.896 9.896m8.413-18.297A11.815 11.815 0 0 0 12.055 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.689 1.448h.005c6.557 0 11.893-5.335 11.896-11.893a11.82 11.82 0 0 0-3.488-8.413" />
              </svg>
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
                className="text-sm font-black text-brand-accent hover:text-brand-accent-hover mt-1 inline-block border-b-2 border-dashed border-brand-accent/30 hover:border-brand-accent transition-all duration-300"
                dir="ltr"
              >
                +961 3 460 865
              </a>
              <p className="text-[10px] text-brand-muted mt-1.5">{currentLang === "ar" ? "اطلب الحجز مباشرة عبر المحادثة" : "Request a reservation via chat"}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Locally stored QR: no third-party request at page load. */}
      <div className="max-w-md mx-auto bg-brand-card border border-brand-border rounded-[28px] p-6 sm:p-8 text-center shadow-lg">
        <h2 className="text-lg font-extrabold text-brand-text mb-4">
          {currentLang === "ar" ? "امسح الرمز لفتح واتساب" : "Scan for WhatsApp"}
        </h2>
        <div className="inline-flex bg-white p-3 rounded-2xl border border-brand-border shadow-sm">
          <img
            src={whatsappQrImage}
            alt={currentLang === "ar" ? "رمز واتساب الخاص بغادر للسياحة" : "Ghader Tourism WhatsApp QR code"}
            className="w-44 h-44 object-contain"
            loading="lazy"
            decoding="async"
            width="320"
            height="320"
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="pt-8 border-t border-brand-border">
        <SocialSection currentLang={currentLang} />
      </div>
    </div>
  );
}
