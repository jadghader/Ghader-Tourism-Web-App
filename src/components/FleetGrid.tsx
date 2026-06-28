import React from "react";
import { Users, Briefcase, CheckCircle, Info } from "lucide-react";
import { Language, Vehicle } from "../types";
import { translations } from "../translations";
import VehicleGallery from "./VehicleGallery";

interface FleetGridProps {
  currentLang: Language;
  onSelectVehicle: (vehicleId: string) => void;
  isLoading?: boolean;
}

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Comfort Standard Sedan",
    category: "Economy Sedan",
    suitableFor: "1–3 Passengers",
    capacity: "3",
    luggage: "2",
    features: ["Air Conditioning", "Comfortable Seating", "Airport Transfers", "City Transportation"],
    description: "Reliable, modern, and highly fuel-efficient sedan perfectly designed for daily commutes and swift airport transfers across Lebanese towns.",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
    basePriceUSD: 0,
    type: "Sedan"
  },
  {
    id: "v2",
    name: "Executive Chauffeur Sedan",
    category: "Executive Sedan",
    suitableFor: "Business Travelers, Executive Transportation",
    capacity: "3",
    luggage: "3",
    features: ["Premium Interior", "Comfortable Ride", "Professional Chauffeur", "Climate Control"],
    description: "Experience premium comfort and elegance. The ideal executive sedan representing prestige, perfect for corporate clients and luxury travelers.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    basePriceUSD: 0,
    type: "Sedan"
  },
  {
    id: "v3",
    name: "Elite VIP Prestige SUV",
    category: "Luxury Vehicle",
    suitableFor: "VIP Clients, Luxury Transfers",
    capacity: "3",
    luggage: "3",
    features: ["Luxury Experience", "Executive Service", "Premium Comfort", "Ambient Lighting"],
    description: "For those who demand nothing but the absolute finest. Experience ultimate luxury and class with our modern flagship SUV and elite personal security details.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    basePriceUSD: 0,
    type: "SUV"
  },
  {
    id: "v4",
    name: "Premium Family Minivan",
    category: "Minivan",
    suitableFor: "Families, Small Groups",
    capacity: "Up to 7",
    luggage: "5",
    features: ["Large Luggage Space", "Comfortable Travel", "Adjustable Seating", "USB Chargers"],
    description: "Extremely spacious family minivan with generous legroom, large luggage compartment, and sliding doors for comfortable long-distance exploration.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
    basePriceUSD: 0,
    type: "Luxury Minivan"
  },
  {
    id: "v5",
    name: "VIP Executive Tour Van",
    category: "Van",
    suitableFor: "Tour Groups, Airport Group Transfers",
    capacity: "8–15",
    luggage: "12",
    features: ["Group Transportation", "Comfortable Long-Distance Travel", "WiFi Onboard", "Heavy Luggage Rack"],
    description: "The ultimate group travel machine. Fully customized luxury van with high-roof seating, personal entertainment systems, and heavy-duty baggage space.",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800",
    basePriceUSD: 0,
    type: "Buses"
  }
];

export default function FleetGrid({ currentLang, onSelectVehicle, isLoading = false }: FleetGridProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  if (isLoading) {
    return (
      <div className="space-y-8" id="fleet-grid-skeleton">
        <div className={`max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
          <div className="h-8 bg-neutral-800/80 rounded-xl w-3/4 md:mx-auto animate-pulse"></div>
          <div className="h-4 bg-neutral-800/40 rounded-lg w-1/2 md:mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-brand-card border border-brand-border/60 rounded-[32px] overflow-hidden flex flex-col h-full animate-pulse"
            >
              <div className="relative h-56 w-full bg-neutral-800/50 shrink-0"></div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-800/80 rounded-md w-1/4"></div>
                    <div className="h-6 bg-neutral-800 rounded-lg w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-800/40 rounded-md w-full"></div>
                    <div className="h-3 bg-neutral-800/40 rounded-md w-5/6"></div>
                  </div>
                  <div className="border-t border-neutral-900 pt-4 space-y-3">
                    <div className="h-4 bg-neutral-800/50 rounded-md w-2/3"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-neutral-800/50 rounded-md w-1/4"></div>
                      <div className="h-4 bg-neutral-800/50 rounded-md w-1/4"></div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="h-11 bg-neutral-800 rounded-2xl w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

          if (currentLang === "ar") {
            if (vehicle.id === "v1") {
              categoryLabel = t.economySedan;
              suitableForLabel = "١ إلى ٣ ركاب";
              descLabel = t.economySedanDesc;
              featuresList = ["مكيف هواء ممتاز", "مقاعد مريحة", "توصيل مطار", "تنقل داخل المدينة"];
            } else if (vehicle.id === "v2") {
              categoryLabel = t.executiveSedan;
              suitableForLabel = "رجال الأعمال، كبار الزوار، نقل تنفيذي";
              descLabel = t.executiveSedanDesc;
              featuresList = ["مقصورة داخلية فاخرة", "رحلة مريحة وهادئة", "سائق تنفيذي خاص", "تحكم حراري منفصل"];
            } else if (vehicle.id === "v3") {
              categoryLabel = t.luxuryVehicle;
              suitableForLabel = "كبار الشخصيات، حفلات زفاف، نقل فاخر";
              descLabel = t.luxuryVehicleDesc;
              featuresList = ["تجربة كبار الشخصيات الفخمة", "سائق خاص برتبة ضابط صف", "راحة قصوى ومقاعد جلدية", "إضاءة محيطية هادئة"];
            } else if (vehicle.id === "v4") {
              categoryLabel = t.minivan;
              suitableForLabel = "العائلات، المجموعات الصغيرة";
              descLabel = t.minivanDesc;
              featuresList = ["مساحة أمتعة وحقائب واسعة", "سفر عائلي مريح للغاية", "مقاعد قابلة للتعديل", "شواحن للهواتف المحمولة"];
            } else if (vehicle.id === "v5") {
              categoryLabel = t.van;
              suitableForLabel = "مجموعات سياحية، توصيل أفواج كبيرة";
              descLabel = t.vanDesc;
              featuresList = ["نقل جماعي آمن", "مريح للرحلات الطويلة والمناطق الجبلية", "شبكة واي فاي مجانية", "حامل أمتعة علوي ضخم"];
            }
          } else if (currentLang === "fr") {
            if (vehicle.id === "v1") {
              categoryLabel = t.economySedan;
              suitableForLabel = "1–3 Passagers";
              descLabel = t.economySedanDesc;
              featuresList = ["Climatisation", "Sièges Confortables", "Transferts Aéroport", "Transport Urbain"];
            } else if (vehicle.id === "v2") {
              categoryLabel = t.executiveSedan;
              suitableForLabel = "Voyageurs d'Affaires, Transport Exécutif";
              descLabel = t.executiveSedanDesc;
              featuresList = ["Intérieur Premium", "Trajet Grand Confort", "Chauffeur Privé Professionnel", "Climatisation Bizone"];
            } else if (vehicle.id === "v3") {
              categoryLabel = t.luxuryVehicle;
              suitableForLabel = "Clients VIP, Transferts de Prestige";
              descLabel = t.luxuryVehicleDesc;
              featuresList = ["Prestations VIP Élite", "Service Chauffeur Privé", "Confort Ultime Cuir", "Éclairage d'Ambiance"];
            } else if (vehicle.id === "v4") {
              categoryLabel = t.minivan;
              suitableForLabel = "Familles, Petits Groupes de Voyage";
              descLabel = t.minivanDesc;
              featuresList = ["Coffre Volumineux", "Voyage Familial Confortable", "Sièges Modulables", "Prises USB"];
            } else if (vehicle.id === "v5") {
              categoryLabel = t.van;
              suitableForLabel = "Groupes de Tourisme, Transferts collectifs";
              descLabel = t.vanDesc;
              featuresList = ["Transport de Groupe", "Idéal Longue Distance & Montagne", "Connexion WiFi", "Galerie Bagages Renforcée"];
            }
          }

          return (
            <div
              key={vehicle.id}
              className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden hover:border-brand-border-hover transition-all duration-300 flex flex-col group h-full"
              id={`fleet-card-${vehicle.id}`}
            >
              {/* Image with referrerPolicy */}
              <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800 text-[11px] font-mono font-bold text-brand-accent">
                  {vehicle.type || "Chauffeur Service"}
                </div>
              </div>

              {/* Card Body */}
              <div className={`p-8 flex-1 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-brand-accent font-mono tracking-wider font-extrabold uppercase">
                      {categoryLabel}
                    </span>
                    <h3 className="text-xl font-bold text-brand-text mt-0.5 group-hover:text-brand-accent transition-colors">
                      {vehicle.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {descLabel}
                  </p>

                  <div className="border-t border-neutral-900 pt-4 space-y-2.5">
                    <div className={`flex items-center gap-2 text-xs text-neutral-300 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Info className="w-4 h-4 text-brand-accent" />
                      <span>
                        <strong>{t.suitableFor}</strong> {suitableForLabel}
                      </span>
                    </div>

                    <div className={`flex gap-4 text-xs text-neutral-400 font-medium ${isRtl ? "flex-row-reverse" : ""}`}>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-neutral-500" />
                        {vehicle.capacity} {t.capacityPax}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-neutral-500" />
                        {vehicle.luggage} {t.capacityLuggage}
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
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

                <div className="pt-8">
                  <button
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="w-full bg-brand-accent hover:bg-brand-accent-hover text-black font-bold text-xs py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg"
                    id={`select-btn-${vehicle.id}`}
                  >
                    {t.requestQuote}
                  </button>
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
