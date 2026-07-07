import React from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../types";
import { translations } from "../translations";
import { getWhatsAppLink } from "../utils/whatsapp";
import logoImage from "../assets/images/logo.webp";

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Header({ 
  currentLang, 
  setLang, 
  activeView, 
  setActiveView,
  theme,
  setTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[currentLang];

  const navItems = [
    { id: "home", label: t.navHome },
    { 
      id: "transfers", 
      label: currentLang === "ar" ? "تاكسي وسائقون" : currentLang === "fr" ? "Taxi & Chauffeurs" : "Taxi & Drivers" 
    },
    { id: "tours", label: t.navTours },
    { id: "fleet", label: t.navFleet },
    { id: "contact", label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isRtl = currentLang === "ar";
  const whatsappUrl = getWhatsAppLink({
    lang: currentLang,
    activeView,
    contextType: "general",
  });

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[999] bg-brand-header/95 backdrop-blur-lg text-brand-text shadow-md border-b border-brand-border" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className={`flex justify-between items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
          
          {/* Logo & Brand Info */}
          <div
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => handleNavClick("home")}
            id="brand-logo"
          >
            <img
              src={logoImage}
              alt="Ghader Tourism premium private chauffeur and airport transfer logo"
              className="h-10 w-10 rounded-full object-cover border border-brand-border shadow-sm"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width="40"
              height="40"
            />
            <div className={`flex flex-col ${isRtl ? "text-right" : "text-left"}`}>
              <span className="font-extrabold text-base leading-none tracking-tight font-sans text-brand-text">
                {t.brandName}
              </span>
              <span className="text-[9px] text-brand-muted font-mono tracking-wider mt-0.5">
                {currentLang === "ar" ? "نقل سياحي فاخر" : currentLang === "fr" ? "Transport de Prestige" : "Premium Lebanon Taxi & Drivers"}
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation - Highly compact pills */}
          <nav className={`hidden lg:flex items-center gap-1 ${isRtl ? "flex-row-reverse" : ""}`} id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  activeView === item.id
                    ? "bg-brand-accent text-brand-bg font-black shadow-sm"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-input"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Quick Controls & CTA - All in a single line (Desktop Only) */}
          <div className={`hidden lg:flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
            {/* Language Segmented Control */}
            <div className="flex items-center bg-brand-card p-0.5 rounded-full border border-brand-border text-[10px] font-mono font-bold shrink-0">
              {(["en", "ar", "fr"] as const).map((lang) => {
                const isActive = currentLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setLang(lang)}
                    className={`relative px-3.5 py-1.5 rounded-full uppercase cursor-pointer transition-colors duration-200 text-center select-none ${
                      isActive ? "text-brand-bg font-black" : "text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-lang-desktop"
                        className="absolute inset-0 bg-brand-accent rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{lang}</span>
                  </button>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-brand-card border border-brand-border hover:border-brand-accent text-brand-accent transition-all cursor-pointer flex items-center justify-center shrink-0"
              title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              id="theme-toggle-desktop"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-brand-card border border-brand-border text-brand-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            
            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-card border border-brand-border rounded-xl focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-card border-t border-brand-border px-5 py-5 space-y-4 animate-fade-in" id="mobile-menu">
          
          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all block cursor-pointer ${
                  activeView === item.id
                    ? "bg-brand-accent text-brand-bg font-black"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-input"
                } ${isRtl ? "text-right" : "text-left"}`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Row: Language Select */}
          <div className={`flex items-center justify-center pt-3 border-t border-brand-border/40 ${isRtl ? "flex-row-reverse" : ""}`}>
            
            {/* Language Segmented Control */}
            <div className="flex items-center bg-brand-input p-0.5 rounded-full border border-brand-border text-[10px] font-mono font-bold">
              {(["en", "ar", "fr"] as const).map((lang) => {
                const isActive = currentLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setLang(lang)}
                    className={`relative px-5 py-2 rounded-full uppercase cursor-pointer transition-colors duration-200 text-center select-none ${
                      isActive ? "text-brand-bg font-black" : "text-brand-muted hover:text-brand-text"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-lang-mobile"
                        className="absolute inset-0 bg-brand-accent rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{lang}</span>
                  </button>
                );
              })}
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
}
