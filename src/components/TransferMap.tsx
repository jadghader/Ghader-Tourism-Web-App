import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Language } from "../types";
import { Compass, MapPin, Navigation, Info, Clock, AlertTriangle } from "lucide-react";

// Coordinates hugging actual highways of Lebanon
const HIGHWAY_ROUTES: Record<string, [number, number][]> = {
  beirut: [
    [33.8211, 35.4884], // Airport BEY
    [33.845, 35.495],  // Airport Road
    [33.869, 35.503],  // Cola
    [33.8971, 35.5054] // Beirut Downtown
  ],
  jounieh: [
    [33.8211, 35.4884], // Airport BEY
    [33.845, 35.495],
    [33.869, 35.503],
    [33.896, 35.525],  // Port
    [33.898, 35.545],  // Dora
    [33.916, 35.584],  // Antelias
    [33.945, 35.601],  // Dbayeh
    [33.9814, 35.6172] // Jounieh
  ],
  byblos: [
    [33.8211, 35.4884],
    [33.845, 35.495],
    [33.869, 35.503],
    [33.896, 35.525],
    [33.898, 35.545],
    [33.916, 35.584],
    [33.945, 35.601],
    [33.9814, 35.6172], // Jounieh
    [34.015, 35.642],  // Casino area
    [34.032, 35.629],  // Tabarja
    [34.095, 35.645],  // Fidar
    [34.1221, 35.6517] // Byblos
  ],
  batroun: [
    [33.8211, 35.4884],
    [33.845, 35.495],
    [33.869, 35.503],
    [33.896, 35.525],
    [33.898, 35.545],
    [33.916, 35.584],
    [33.945, 35.601],
    [33.9814, 35.6172], // Jounieh
    [34.015, 35.642],
    [34.032, 35.629],
    [34.095, 35.645],
    [34.1221, 35.6517], // Byblos
    [34.148, 35.648],  // Amchit
    [34.2541, 35.6582] // Batroun
  ],
  tripoli: [
    [33.8211, 35.4884],
    [33.845, 35.495],
    [33.869, 35.503],
    [33.896, 35.525],
    [33.898, 35.545],
    [33.916, 35.584],
    [33.945, 35.601],
    [33.9814, 35.6172], // Jounieh
    [34.015, 35.642],
    [34.032, 35.629],
    [34.095, 35.645],
    [34.1221, 35.6517], // Byblos
    [34.148, 35.648],
    [34.2541, 35.6582], // Batroun
    [34.331, 35.719],  // Chekka
    [34.359, 35.733],  // Enfeh
    [34.4361, 35.8497] // Tripoli
  ],
  sidon: [
    [33.8211, 35.4884], // Airport BEY
    [33.784, 35.479],   // Khalde
    [33.708, 35.448],   // Damour
    [33.654, 35.422],   // Jiyeh
    [33.606, 35.398],   // Rmeileh
    [33.5631, 35.3689]  // Sidon
  ],
  tyre: [
    [33.8211, 35.4884], // Airport BEY
    [33.784, 35.479],
    [33.708, 35.448],
    [33.654, 35.422],
    [33.606, 35.398],
    [33.5631, 35.3689], // Sidon
    [33.447, 35.289],   // Sarafand
    [33.401, 35.244],   // Adloun
    [33.2708, 35.1963]  // Tyre
  ],
  faraya: [
    [33.8211, 35.4884],
    [33.845, 35.495],
    [33.869, 35.503],
    [33.896, 35.525],
    [33.898, 35.545],
    [33.916, 35.584],
    [33.945, 35.601],
    [33.963, 35.611],  // Zouk
    [33.964, 35.696],  // Ajaltoun
    [33.953, 35.748],  // Kleiat
    [33.978, 35.779],  // Mayrouba
    [34.0150, 35.8083] // Faraya
  ],
  baalbek: [
    [33.8211, 35.4884],
    [33.827, 35.597],   // Kahale
    [33.805, 35.602],   // Aley
    [33.801, 35.651],   // Bhamdoun
    [33.799, 35.698],   // Sofar
    [33.815, 35.845],   // Chtaura
    [33.847, 35.897],   // Zahle
    [33.856, 35.998],   // Rayak
    [34.0058, 36.2062]  // Baalbek
  ]
};

export interface DestinationItem {
  id: string;
  name: { en: string; ar: string };
  lat: number;
  lng: number;
  distance: string;
  duration: string;
  routeType: { en: string; ar: string };
  keywords: string[];
}

export const POPULAR_DESTINATIONS: DestinationItem[] = [
  {
    id: "beirut",
    name: {
      en: "Beirut (Downtown)",
      ar: "وسط بيروت"
    },
    lat: 33.8971,
    lng: 35.5054,
    distance: "10 km",
    duration: "15 mins",
    routeType: {
      en: "Airport Highway",
      ar: "طريق مطار بيروت"
    },
    keywords: ["beirut", "بيروت", "downtown", "وسط البلد", "الحمرا", "hamra", "ashrafieh", "الأشرفية"]
  },
  {
    id: "jounieh",
    name: {
      en: "Jounieh",
      ar: "جونيه"
    },
    lat: 33.9814,
    lng: 35.6172,
    distance: "28 km",
    duration: "30 mins",
    routeType: {
      en: "Northern Coastal Highway",
      ar: "الأوتوستراد الساحلي الشمالي"
    },
    keywords: ["jounieh", "جونيه", "jouny", "kaslik", "الكسليك"]
  },
  {
    id: "byblos",
    name: {
      en: "Byblos (Jbeil)",
      ar: "جبيل"
    },
    lat: 34.1221,
    lng: 35.6517,
    distance: "42 km",
    duration: "45 mins",
    routeType: {
      en: "Northern Coastal Highway",
      ar: "الأوتوستراد الساحلي الشمالي"
    },
    keywords: ["byblos", "jbeil", "جبيل", "جبييل", "ببلوس"]
  },
  {
    id: "batroun",
    name: {
      en: "Batroun",
      ar: "البترون"
    },
    lat: 34.2541,
    lng: 35.6582,
    distance: "58 km",
    duration: "55 mins",
    routeType: {
      en: "Northern Coastal Highway",
      ar: "الأوتوستراد الساحلي الشمالي"
    },
    keywords: ["batroun", "البترون", "batroune", "بترون"]
  },
  {
    id: "tripoli",
    name: {
      en: "Tripoli",
      ar: "طرابلس"
    },
    lat: 34.4361,
    lng: 35.8497,
    distance: "85 km",
    duration: "1 hr 15 mins",
    routeType: {
      en: "Northern Coastal Highway",
      ar: "أوتوستراد طرابلس الساحلي"
    },
    keywords: ["tripoli", "طرابلس", "trablos", "mina", "الميناء"]
  },
  {
    id: "sidon",
    name: {
      en: "Sidon (Saida)",
      ar: "صيدا"
    },
    lat: 33.5631,
    lng: 35.3689,
    distance: "45 km",
    duration: "40 mins",
    routeType: {
      en: "Southern Coastal Highway",
      ar: "الأوتوستراد الساحلي الجنوبي"
    },
    keywords: ["sidon", "saida", "صيدا", "صيدون"]
  },
  {
    id: "tyre",
    name: {
      en: "Tyre (Sour)",
      ar: "صور"
    },
    lat: 33.2708,
    lng: 35.1963,
    distance: "83 km",
    duration: "1 hr 15 mins",
    routeType: {
      en: "Southern Coastal Highway",
      ar: "طريق الجنوب السريع"
    },
    keywords: ["tyre", "sour", "صور", "tyr"]
  },
  {
    id: "faraya",
    name: {
      en: "Faraya (Mzaar)",
      ar: "فاريا كفردبيان"
    },
    lat: 34.0150,
    lng: 35.8083,
    distance: "52 km",
    duration: "1 hr 10 mins",
    routeType: {
      en: "Mount Lebanon Highway",
      ar: "طريق جبل لبنان الجبلية"
    },
    keywords: ["faraya", "mzaar", "فاريا", "kfardebian", "كفردبيان", "عيون السيمان", "فقرا"]
  },
  {
    id: "baalbek",
    name: {
      en: "Baalbek",
      ar: "بعلبك"
    },
    lat: 34.0058,
    lng: 36.2062,
    distance: "90 km",
    duration: "1 hr 45 mins",
    routeType: {
      en: "Damascus Highway",
      ar: "طريق الشام الدولي / البقاع"
    },
    keywords: ["baalbek", "بعلبك", "balbek", "bekaa", "البقاع", "زحلة", "zahle"]
  }
];

interface TransferMapProps {
  currentLang: Language;
  currentDestinationText: string;
  onSelectDestination: (destinationName: string) => void;
}

export default function TransferMap({
  currentLang,
  currentDestinationText,
  onSelectDestination
}: TransferMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const destinationMarkerRef = useRef<L.Marker | null>(null);
  const airportMarkerRef = useRef<L.Marker | null>(null);
  const isRtl = currentLang === "ar";

  const [activeRouteId, setActiveRouteId] = useState<string>("beirut");
  const [mapReady, setMapReady] = useState(false);

  // Determine active route based on user typing
  useEffect(() => {
    if (!currentDestinationText) return;
    
    const textLower = currentDestinationText.toLowerCase();
    const matched = POPULAR_DESTINATIONS.find((dest) =>
      dest.keywords.some((kw) => textLower.includes(kw)) ||
      dest.id.toLowerCase() === textLower
    );

    if (matched && matched.id !== activeRouteId) {
      setActiveRouteId(matched.id);
    }
  }, [currentDestinationText, activeRouteId]);

  // Handle map initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Remove old instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center covers Beirut Airport and Beirut Central
    const map = L.map(mapContainerRef.current, {
      center: [33.85, 35.58],
      zoom: 10,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Beautiful slate/dark carto maps that matches the app theme
    // We check if HTML has .light class for light theme map
    const isLight = document.documentElement.classList.contains("light");
    const tileUrl = isLight
      ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    // Initial load markers
    // BEY Airport Marker (pulsing brand-red ring)
    const airportHtml = `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="absolute inline-flex h-full w-full rounded-full bg-brand-accent/30 animate-ping opacity-75"></span>
        <div class="relative w-6 h-6 bg-brand-accent border border-brand-accent rounded-full flex items-center justify-center shadow-lg text-brand-btn-text font-extrabold text-[11px]">
          ✈️
        </div>
      </div>
    `;

    const airportIcon = L.divIcon({
      html: airportHtml,
      className: "custom-airport-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const airportMarker = L.marker([33.8211, 35.4884], { icon: airportIcon })
      .addTo(map)
      .bindPopup(
        currentLang === "ar"
          ? "<b>مطار بيروت رفيق الحريري الدولي (BEY)</b><br/>نقطة الانطلاق الرئيسية"
          : "<b>Beirut Rafic Hariri Airport (BEY)</b><br/>Main pickup point"
      );

    airportMarkerRef.current = airportMarker;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map polyline and zoom when active route changes
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear previous polyline
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    // Clear previous destination marker
    if (destinationMarkerRef.current) {
      map.removeLayer(destinationMarkerRef.current);
      destinationMarkerRef.current = null;
    }

    const route = POPULAR_DESTINATIONS.find(r => r.id === activeRouteId);
    if (!route) return;

    // Get the points path
    const pathPoints = HIGHWAY_ROUTES[activeRouteId] || [
      [33.8211, 35.4884],
      [route.lat, route.lng]
    ];

    // Create custom polyline with glow effect
    const routePolyline = L.polyline(pathPoints, {
      color: "#a71c07", // Brand primary
      weight: 4,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(map);

    polylineRef.current = routePolyline;

    // Add Destination Marker (Gold pin)
    const destHtml = `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="absolute inline-flex h-full w-full rounded-full bg-amber-400/20 animate-pulse opacity-75"></span>
        <div class="relative w-6 h-6 bg-amber-500 border border-amber-600 rounded-full flex items-center justify-center shadow-md text-white font-bold text-[11px]">
          📍
        </div>
      </div>
    `;

    const destIcon = L.divIcon({
      html: destHtml,
      className: "custom-dest-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const destName = route.name[currentLang] || route.name.en;

    const destMarker = L.marker([route.lat, route.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #1c1917;">
          <h4 style="margin: 0 0 4px; font-weight: 800; color: #a71c07;">${destName}</h4>
          <p style="margin: 0 0 2px;"><b>Distance:</b> ${route.distance}</p>
          <p style="margin: 0;"><b>Est. Time:</b> ${route.duration}</p>
        </div>
      `);

    destinationMarkerRef.current = destMarker;

    // Auto-fit bounds to show the entire route with nice padding
    const bounds = L.latLngBounds([
      [33.8211, 35.4884],
      [route.lat, route.lng]
    ]);
    
    map.fitBounds(bounds, {
      padding: [40, 40],
      animate: true,
      duration: 1.2
    });

    // Briefly open popup
    setTimeout(() => {
      if (destMarker && mapInstanceRef.current) {
        destMarker.openPopup();
      }
    }, 1200);

  }, [activeRouteId, mapReady, currentLang]);

  const activeRoute = POPULAR_DESTINATIONS.find(r => r.id === activeRouteId) || POPULAR_DESTINATIONS[0];

  const handleRouteSelect = (route: DestinationItem) => {
    setActiveRouteId(route.id);
    const destName = route.name[currentLang] || route.name.en;
    onSelectDestination(destName);
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-xl" id="interactive-route-map">
      <div className="p-4 border-b border-brand-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-brand-input/40">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-accent animate-spin-slow" />
            <h4 className="font-extrabold text-sm md:text-base text-brand-text">
              {currentLang === "ar" ? "دليل المسافات والمسارات التفاعلي" : "Interactive Distance & Route Map"}
            </h4>
          </div>
          <p className="text-[11px] text-brand-muted mt-0.5">
            {currentLang === "ar"
              ? "موقع مطار بيروت رفيق الحريري الدولي (BEY) بالنسبة لأبرز المدن والمناطق اللبنانية."
              : "Visualize the transfer path and distance from Beirut Airport (BEY) to key regions."}
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 self-start sm:self-center bg-brand-accent/10 border border-brand-accent/20 px-2 py-1 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-brand-accent">BEY Airport</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Route Selector Panel */}
        <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-brand-border/40 max-h-[350px] overflow-y-auto space-y-2 order-2 lg:order-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted block mb-2 px-1">
            {currentLang === "ar" ? "اختر وجهة سياحية:" : "Select popular transfer:"}
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {POPULAR_DESTINATIONS.map((route) => {
              const isActive = route.id === activeRouteId;
              const nameText = route.name[currentLang] || route.name.en;
              const routeText = route.routeType[currentLang] || route.routeType.en;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleRouteSelect(route)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isActive
                      ? "bg-brand-accent/10 border-brand-accent shadow-sm"
                      : "bg-brand-input/40 border-brand-border hover:bg-brand-input"
                  }`}
                  style={{ textAlign: isRtl ? "right" : "left" }}
                >
                  <div className="flex items-start justify-between gap-1.5 w-full">
                    <span className="font-extrabold text-xs md:text-sm text-brand-text truncate block">{nameText}</span>
                    <span className="text-[9px] font-mono shrink-0 bg-brand-border px-1.5 py-0.5 rounded-md text-brand-muted font-bold">
                      {route.distance}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between gap-1 mt-2 text-[10px] w-full ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                    <span className="text-brand-muted truncate block max-w-[120px] lg:max-w-none">{routeText}</span>
                    <span className="text-brand-accent font-bold font-mono shrink-0 flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-7 relative h-[260px] sm:h-[300px] lg:h-auto min-h-[260px] order-1 lg:order-2 bg-brand-input">
          <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-10" />
          
          {/* Overlay Info Panel */}
          {activeRoute && (
            <div className={`absolute bottom-3 ${isRtl ? "right-3" : "left-3"} z-20 max-w-[280px] bg-brand-card/95 backdrop-blur-md border border-brand-border rounded-xl p-3 shadow-xl pointer-events-none`}>
              <span className="text-[8px] uppercase tracking-wider font-bold text-brand-accent block mb-0.5">
                {currentLang === "ar" ? "تفاصيل المسار النشط" : "Active Route details"}
              </span>
              <h5 className="font-extrabold text-xs text-brand-text">
                Beirut Airport (BEY) ➔ {activeRoute.name[currentLang] || activeRoute.name.en}
              </h5>
              
              <div className="grid grid-cols-2 gap-2 mt-2 pt-1.5 border-t border-brand-border/40">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-brand-muted block">{currentLang === "ar" ? "المسافة" : "Distance"}</span>
                  <span className="text-xs font-bold font-mono text-brand-text">{activeRoute.distance}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-brand-muted block">{currentLang === "ar" ? "الوقت المتوقع" : "Est. Duration"}</span>
                  <span className="text-xs font-bold font-mono text-brand-text">{activeRoute.duration}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-brand-input/20 border-t border-brand-border/40 flex items-start gap-2">
        <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5 animate-pulse" />
        <p className="text-[10px] md:text-xs text-brand-muted">
          {currentLang === "ar"
            ? "الأسعار المعروضة في الخطوة التالية مبنية على المسافة والمنطقة المختارة. يشمل الحجز تنسيق نقطة اللقاء في المطار ومتابعة الرحلة والرسوم."
            : "Distance rates are integrated seamlessly. Your premium airport transfer always includes professional meet & greet, standard flight monitoring, and highway toll fees."}
        </p>
      </div>
    </div>
  );
}
