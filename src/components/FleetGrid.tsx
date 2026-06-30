import React from "react";
import { CheckCircle, Info } from "lucide-react";
import { Language, Vehicle } from "../types";
import { translations } from "../translations";
import VehicleGallery from "./VehicleGallery";

interface FleetGridProps {
  currentLang: Language;
  onSelectVehicle: (vehicleId: string) => void;
}

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Comfort Sedan",
    category: "Sedan",
    suitableFor: "4–5 Passengers",
    capacity: "4-5",
    luggage: "3",
    features: ["Full Air Conditioning (A/C)", "Perfect for Airport Transfers", "Matches your trip budget perfectly"],
    description: "Comfortable, clean, and budget-friendly A/C car matching your daily trip needs and swift airport transfers perfectly.",
    image: "/images/cars/sedan_2025.jpg",
    basePriceUSD: 0,
    type: "Sedan"
  },
  {
    id: "v2",
    name: "Luxurious SUV",
    category: "Luxury SUV",
    suitableFor: "VIP, Corporate & Executive Travel",
    capacity: "4-6",
    luggage: "4",
    features: ["Advanced Dual Climate A/C", "VIP Chauffeur Experience", "All-Wheel Drive Performance"],
    description: "Prestige luxury SUV with robust mountain capabilities and exceptional cabin comfort.",
    image: "/images/cars/suv_2025.jpg",
    basePriceUSD: 0,
    type: "SUV"
  },
  {
    id: "v3",
    name: "Premium Caravan",
    category: "Caravan",
    suitableFor: "Families & Small Groups (6–7 Pax)",
    capacity: "6-7",
    luggage: "6",
    features: ["High-Output Air Conditioning", "Spacious Modular Seating", "Comfortable for Family Roadtrips"],
    description: "Comfortable and roomy caravan designed to make long family journeys easy and stress-free.",
    image: "/images/cars/caravan_2025.jpg",
    basePriceUSD: 0,
    type: "Caravan"
  },
  {
    id: "v4",
    name: "Executive Minivan",
    category: "Minivan",
    suitableFor: "Up to 12 Passengers",
    capacity: "Up to 12",
    luggage: "10",
    features: ["Tri-Zone Climate Control", "Sliding Doors", "Comfortable for Medium Groups"],
    description: "Extra-spacious van ideal for corporate transfers or mid-sized tourist groups exploring Lebanon.",
    image: "/images/cars/minivan_2025.jpg",
    basePriceUSD: 0,
    type: "Minivan"
  },
  {
    id: "v5",
    name: "Buses",
    category: "Group Bus",
    suitableFor: "Large Groups & Delegations",
    capacity: "15-50",
    luggage: "Heavy Bags",
    features: ["High-Capacity A/C System", "Tourism Group Friendly", "Maximum Passenger Comfort"],
    description: "Heavy-duty modern buses perfect for large events, conferences, and tours.",
    image: "/images/cars/bus_2025.jpg",
    basePriceUSD: 0,
    type: "Buses"
  }
];

export default function FleetGrid({ currentLang, onSelectVehicle }: FleetGridProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  return (
    <div className="space-y-16" id="fleet-grid">
      {/* 3D Portrait Carousel Gallery First */}
      <VehicleGallery currentLang={currentLang} />

      <div className="border-t border-brand-border/40 pt-16 space-y-8">
        <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
          <h2 className="text-xl md:text-2xl font-bold text-brand-text font-sans tracking-tight">
            {currentLang === "ar" ? "تفاصيل المواصفات والأسعار التقديرية" : currentLang === "fr" ? "Spécifications & Tarifs Estimés" : "Technical Specifications & Estimations"}
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            {currentLang === "ar" 
              ? "قارن بين السعات وتفاصيل الراحة لكل مركبة لاختيار الأنسب لرحلتك" 
              : currentLang === "fr" 
              ? "Comparez les capacités et options pour sélectionner le véhicule parfait" 
              : "Compare capacities, premium characteristics, and passenger comfort properties below."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FLEET_VEHICLES.map((vehicle) => {
          // Translate dynamic fields
          let categoryLabel: string = vehicle.category;
          let suitableForLabel = vehicle.suitableFor;
          let descLabel = vehicle.description;
          let featuresList = vehicle.features;
          let vehicleName = vehicle.name;

          if (currentLang === "ar") {
            if (vehicle.id === "v1") {
              vehicleName = "سيارة سيدان مريحة";
              categoryLabel = "سيدان";
              suitableForLabel = "٤ إلى ٥ ركاب";
              descLabel = "سيارة سيدان مريحة واقتصادية مع مكيف هواء، ممتازة لتوصيلات المطار وتناسب ميزانية رحلتك تماماً.";
              featuresList = ["مكيف هواء كامل (A/C)", "مثالية لتوصيلات المطار", "تناسب ميزانية رحلتك تماماً"];
            } else if (vehicle.id === "v2") {
              vehicleName = "سيارة دفع رباعي فاخرة (SUV)";
              categoryLabel = "دفع رباعي فاخرة";
              suitableForLabel = "كبار الشخصيات، رجال الأعمال، جولات جبلية";
              descLabel = "سيارة رياضية متعددة الاستخدامات فخمة للغاية ومثالية لكبار الشخصيات والجولات الجبلية.";
              featuresList = ["تحكم حراري مزدوج ومطور", "تجربة سائق فاخرة (VIP)", "أداء فائق على الطرقات الجبلية"];
            } else if (vehicle.id === "v3") {
              vehicleName = "كرفان عائلي واسع";
              categoryLabel = "كرفان";
              suitableForLabel = "العائلات والمجموعات الصغيرة (٦-٧ ركاب)";
              descLabel = "كرفان مريح وواسع يتسع لـ ٦ إلى ٧ ركاب مع مساحة أمتعة ممتازة لسفر عائلي مريح.";
              featuresList = ["مكيف هواء عالي الكفاءة", "مقاعد مرنة وواسعة", "مثالي للرحلات العائلية الطويلة"];
            } else if (vehicle.id === "v4") {
              vehicleName = "ميني فان تنفيذي";
              categoryLabel = "ميني فان";
              suitableForLabel = "مجموعات سياحية متوسطة وتوصيلات جماعية (حتى ١٢ راكب)";
              descLabel = "حافلة ميني فان واسعة تتسع لما يصل إلى ١٢ راكباً، ممتازة للتنقل الجماعي المريح.";
              featuresList = ["تحكم مناخي ثلاثي المناطق", "أبواب منزلقة سهلة الاستخدام", "مريحة جداً للمجموعات المتوسطة"];
            } else if (vehicle.id === "v5") {
              vehicleName = "باصات سياحية";
              categoryLabel = "حافلة مجموعات";
              suitableForLabel = "المجموعات الكبيرة والوفود السياحية";
              descLabel = "باصات سياحية مجهزة وممتازة للمجموعات الكبيرة، المؤتمرات، والوفود الرسمية.";
              featuresList = ["مكيف هواء مركزي عالي القدرة", "مثالي للأفواج السياحية الكبيرة", "أقصى مساحة لتخزين الأمتعة"];
            }
          } else if (currentLang === "fr") {
            if (vehicle.id === "v1") {
              vehicleName = "Berline Confortable";
              categoryLabel = "Berline";
              suitableForLabel = "4–5 Passagers";
              descLabel = "Berline confortable et économique avec climatisation, idéale pour vos transferts aéroport et vos trajets quotidiens.";
              featuresList = ["Climatisation Complète (A/C)", "Idéal pour Transferts Aéroport", "S'adapte parfaitement à votre budget"];
            } else if (vehicle.id === "v2") {
              vehicleName = "SUV de Luxe";
              categoryLabel = "SUV de Prestige";
              suitableForLabel = "VIP, Voyageurs d'Affaires, Montagne";
              descLabel = "SUV de prestige avec d'excellentes capacités en montagne et un confort exceptionnel.";
              featuresList = ["Climatisation Bizone Avancée", "Service Chauffeur VIP", "Performance 4x4 Supérieure"];
            } else if (vehicle.id === "v3") {
              vehicleName = "Caravane Spacieuse";
              categoryLabel = "Caravane";
              suitableForLabel = "Familles & Petits Groupes (6-7 Pax)";
              descLabel = "Caravane confortable et spacieuse conçue pour 6 à 7 passagers avec tout le confort moderne.";
              featuresList = ["Climatisation Haute Performance", "Sièges Modulables Confortables", "Idéal pour les road trips en famille"];
            } else if (vehicle.id === "v4") {
              vehicleName = "Minivan Exécutif";
              categoryLabel = "Minivan";
              suitableForLabel = "Groupes & Transferts (Jusqu'à 12 Pax)";
              descLabel = "Grand minivan idéal pour les transferts d'affaires ou les groupes de touristes au Liban.";
              featuresList = ["Climatisation Tri-zone", "Portes Coulissantes Pratiques", "Très confortable pour les groupes moyens"];
            } else if (vehicle.id === "v5") {
              vehicleName = "Bus de Tourisme";
              categoryLabel = "Bus de Groupe";
              suitableForLabel = "Grands Groupes & Délégations";
              descLabel = "Grands bus de tourisme modernes parfaits pour les événements de groupe.";
              featuresList = ["Climatisation Centrale Haute Capacité", "Idéal pour Groupes de Tourisme", "Max d'Espace pour Bagages"];
            }
          }

          return (
            <div
              key={vehicle.id}
              className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden hover:border-brand-border-hover transition-all duration-300 flex flex-col group h-full shadow-lg"
              id={`fleet-card-${vehicle.id}`}
            >
              {/* Premium Upload Path Placeholder for Vehicles */}
              <div className="relative h-44 w-full bg-gradient-to-br from-[#121212] to-[#070707] border-b border-brand-border flex flex-col items-center justify-center p-6 shrink-0 group/img text-center">
                <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                
                <div className="absolute top-3 right-3 bg-neutral-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-800 text-[10px] font-mono font-bold text-brand-accent">
                  {vehicle.type || "Chauffeur Service"}
                </div>

                <div className="relative z-10 space-y-2 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-sm group-hover/img:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-brand-accent font-mono font-bold tracking-wider block uppercase">
                      {currentLang === "ar" ? "مسار رفع الصورة" : currentLang === "fr" ? "Chemin de l'image" : "Image Upload Path"}
                    </span>
                    <code className="text-[10px] text-brand-muted bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800 font-mono select-all block">
                      {vehicle.image}
                    </code>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className={`p-6 md:p-8 flex-1 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-brand-accent font-mono tracking-wider font-extrabold uppercase">
                      {categoryLabel}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-brand-text mt-0.5 group-hover:text-brand-accent transition-colors">
                      {vehicleName}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {descLabel}
                  </p>

                  <div className="border-t border-neutral-900 pt-4 space-y-2.5">
                    <div className={`flex items-center gap-2 text-xs text-neutral-300 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Info className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>
                        <strong>{t.suitableFor}</strong> {suitableForLabel}
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {featuresList.map((feat, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-1.5 text-[11px] text-neutral-300 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 relative group/btn">
                  {/* Subtle pulsing background glow to draw attention */}
                  <div className="absolute inset-x-0 bottom-0 top-8 bg-brand-accent/25 rounded-2xl blur-md opacity-60 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200 animate-pulse pointer-events-none"></div>
                  
                  <div className="relative">
                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-extrabold text-xs py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 relative z-10"
                      id={`select-btn-${vehicle.id}`}
                    >
                      <span>{t.requestQuote}</span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </button>
                  </div>

                  {/* Multi-lingual Animated Tooltip */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent border border-brand-accent-hover text-brand-btn-text text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 flex items-center gap-1">
                    <span>⚡</span>
                    <span>
                      {currentLang === "ar"
                        ? "رد فوري عبر واتساب"
                        : currentLang === "fr"
                        ? "Réponse WhatsApp"
                        : "Instant WhatsApp"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}
