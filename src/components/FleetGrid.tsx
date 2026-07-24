import React from "react";
import { Bluetooth, ShieldCheck, Snowflake, Sparkles, Usb, UserCheck, Users } from "lucide-react";
import { Language, Vehicle } from "../types";
import { translations } from "../translations";
import premiumSedanImage from "../assets/images/fleet-sedan.webp";
import versatileSuvImage from "../assets/images/fleet-versatile-suv.webp";
import luxurySuvImage from "../assets/images/fleet-luxury-suv.webp";
import familyMinivanImage from "../assets/images/fleet-minivan.webp";
import passengerVanImage from "../assets/images/fleet-passenger-van.webp";
import tourCoachImage from "../assets/images/fleet-tour-coach.webp";

interface FleetGridProps {
  currentLang: Language;
  onSelectVehicle: (vehicleId: string) => void;
  pageHeading?: boolean;
}

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Sedan",
    category: "Refined Everyday Travel",
    suitableFor: "1–3 Passengers",
    capacity: "1-3",
    luggage: "3",
    features: ["Quiet air-conditioned cabin", "Ideal for airport and city transfers", "Comfortable rear passenger seating"],
    description: "Comfortable private travel for airport pickups, city rides, and business trips.",
    image: premiumSedanImage,
    basePriceUSD: 0,
    type: "Sedan"
  },
  {
    id: "v2",
    name: "SUV",
    category: "Comfort & Capability",
    suitableFor: "1–5 Passengers",
    capacity: "1-5",
    luggage: "4",
    features: ["Spacious climate-controlled cabin", "Confident on city and mountain roads", "Flexible passenger and luggage space"],
    description: "Extra comfort and space for airport transfers, day trips, and mountain roads.",
    image: versatileSuvImage,
    basePriceUSD: 0,
    type: "SUV"
  },
  {
    id: "v3",
    name: "Luxury SUV",
    category: "Executive & VIP Travel",
    suitableFor: "1–6 Passengers",
    capacity: "1-6",
    luggage: "4",
    features: ["Premium interior and ride comfort", "Discreet chauffeur presentation", "Suited to executive and special occasions"],
    description: "Our highest-comfort option for executive travel, special occasions, and VIP guests.",
    image: luxurySuvImage,
    basePriceUSD: 0,
    type: "Caravan"
  },
  {
    id: "v4",
    name: "Minivan",
    category: "Families & Small Groups",
    suitableFor: "Up to 7 Passengers",
    capacity: "Up to 7",
    luggage: "6",
    features: ["Easy-access sliding doors", "Flexible family seating", "Generous luggage capacity"],
    description: "Easy access and flexible seating for families, small groups, and luggage.",
    image: familyMinivanImage,
    basePriceUSD: 0,
    type: "Minivan"
  },
  {
    id: "v5",
    name: "Van",
    category: "Medium Group Transport",
    suitableFor: "8–12 Passengers",
    capacity: "8-12",
    luggage: "10",
    features: ["High-roof passenger cabin", "Group-friendly boarding", "Practical luggage storage"],
    description: "Practical group transport for hotel transfers, gatherings, and private tours.",
    image: passengerVanImage,
    basePriceUSD: 0,
    type: "Van"
  },
  {
    id: "v6",
    name: "Bus",
    category: "Large Group Transport",
    suitableFor: "15–50 Passengers",
    capacity: "15-50",
    luggage: "Group luggage",
    features: ["Powerful cabin air conditioning", "Dedicated group luggage storage", "Suitable for tours, events, and delegations"],
    description: "Comfortable group travel for tours, events, conferences, and airport transfers.",
    image: tourCoachImage,
    basePriceUSD: 0,
    type: "Coach"
  }
];

export default function FleetGrid({ currentLang, onSelectVehicle, pageHeading = false }: FleetGridProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";
  const fleetStandards = [
    {
      icon: Sparkles,
      en: "Deep-cleaned before every booking",
      ar: "تنظيف وتعقيم قبل كل حجز",
    },
    {
      icon: UserCheck,
      en: "Professional, well-presented driver",
      ar: "سائق محترف وحسن المظهر",
    },
    {
      icon: Snowflake,
      en: "Air-conditioned comfort",
      ar: "تكييف هواء لراحة كاملة",
    },
    {
      icon: Usb,
      en: "Phone charging available",
      ar: "شحن للهاتف عند الطلب وبحسب تجهيز السيارة",
    },
    {
      icon: ShieldCheck,
      en: "Hygiene essentials on board",
      ar: "مستلزمات النظافة بحسب تجهيز السيارة",
    },
    {
      icon: Bluetooth,
      en: "Bluetooth where equipped",
      ar: "بلوتوث حسب تجهيز المركبة",
    },
  ];

  return (
    <div className="space-y-16" id="fleet-grid">
      <div className="space-y-8">
        <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
          {pageHeading ? (
            <h1 className="text-3xl md:text-5xl font-black text-brand-text font-sans tracking-tight">{t.fleetHeaderTitle}</h1>
          ) : (
            <h2 className="text-xl md:text-2xl font-bold text-brand-text font-sans tracking-tight">
              {currentLang === "ar" ? "تفاصيل المركبات وخيارات الرحلة" : "Vehicles for Every Group Size"}
            </h2>
          )}
          <p className="text-brand-muted text-sm leading-relaxed">
            {currentLang === "ar"
              ? "قارن بين السعات وتفاصيل الراحة لكل مركبة لاختيار الأنسب لرحلتك"
              : "Choose the right level of comfort, space, and luggage capacity for your journey."}
          </p>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-[24px] p-5 sm:p-6">
          <div className={`mb-4 ${isRtl ? "text-right" : "text-left"}`}>
            <h3 className="text-lg font-extrabold text-brand-text">
              {currentLang === "ar" ? "معاييرنا في جميع المركبات" : "Our standard in every vehicle"}
            </h3>
            <p className="text-sm text-brand-muted mt-1">
              {currentLang === "ar"
                ? "كل ضيف يحصل على خدمة راقية، مركبة نظيفة وسائق يهتم بالتفاصيل."
                : "Every guest receives thoughtful service, a spotless vehicle, and a driver who cares about the details."}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {fleetStandards.map(({ icon: Icon, en, ar }) => (
              <div key={en} className={`flex items-center gap-2 text-xs text-brand-text/90 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                <Icon className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{currentLang === "ar" ? ar : en}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FLEET_VEHICLES.map((vehicle) => {
          let vehicleName = vehicle.name;
          let vehicleDescription = vehicle.description;

          if (currentLang === "ar") {
            if (vehicle.id === "v1") {
              vehicleName = "سيدان";
              vehicleDescription = "تنقّل خاص مريح لاستقبال المطار والرحلات داخل المدينة ومواعيد العمل.";
            } else if (vehicle.id === "v2") {
              vehicleName = "سيارة SUV";
              vehicleDescription = "راحة ومساحة إضافية لتوصيلات المطار والجولات والطرق الجبلية.";
            } else if (vehicle.id === "v3") {
              vehicleName = "سيارة SUV فاخرة";
              vehicleDescription = "أعلى مستوى من الراحة لرحلات رجال الأعمال والمناسبات وضيوف VIP.";
            } else if (vehicle.id === "v4") {
              vehicleName = "ميني فان";
              vehicleDescription = "دخول سهل ومقاعد مرنة للعائلات والمجموعات الصغيرة والأمتعة.";
            } else if (vehicle.id === "v5") {
              vehicleName = "فان";
              vehicleDescription = "نقل عملي للمجموعات وتوصيلات الفنادق والتجمعات والجولات الخاصة.";
            } else if (vehicle.id === "v6") {
              vehicleName = "باص";
              vehicleDescription = "سفر مريح للمجموعات والجولات والمناسبات والمؤتمرات وتوصيلات المطار.";
            }
          }

          return (
            <div
              key={vehicle.id}
              className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden hover:border-brand-border-hover transition-all duration-300 flex flex-col group h-full shadow-lg"
              id={`fleet-card-${vehicle.id}`}
            >
              <div className="relative h-44 w-full bg-gradient-to-br from-[#121212] to-[#070707] border-b border-brand-border overflow-hidden shrink-0 group/img">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} for private chauffeur service, airport transfer, and luxury travel in Lebanon`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Card Body */}
              <div className={`p-6 md:p-8 flex-1 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                      {vehicleName}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed mt-1.5">
                      {vehicleDescription}
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 text-sm text-brand-muted ${isRtl ? "flex-row-reverse" : ""}`}>
                    <Users className="w-4 h-4 text-brand-accent" />
                    <span>
                      {currentLang === "ar" ? "السعة:" : "Capacity:"} {vehicle.capacity}
                    </span>
                  </div>
                </div>

                <div className="pt-8 relative group/btn">
                  {/* Subtle pulsing background glow to draw attention */}
                  <div className="absolute inset-x-0 bottom-0 top-8 bg-brand-accent/15 rounded-2xl opacity-60 group-hover/btn:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <div className="relative">
                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text font-extrabold text-xs py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 relative z-10"
                      id={`select-btn-${vehicle.id}`}
                    >
                      <span>{t.requestQuote}</span>
                      <span className="flex h-2 w-2 relative">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                      </span>
                    </button>
                  </div>

                  {/* Multi-lingual Animated Tooltip */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent border border-brand-accent-hover text-brand-btn-text text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 flex items-center gap-1">
                    <span>⚡</span>
                    <span>
                      {currentLang === "ar" ? "رد فوري عبر واتساب" : "Instant WhatsApp"}
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
