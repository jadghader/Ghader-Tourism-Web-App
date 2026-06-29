import { Compass, Clock, MapPin, CheckCircle } from "lucide-react";
import { Language, Tour } from "../types";
import { translations } from "../translations";

interface ToursListProps {
  currentLang: Language;
  onBookTour: (tourId: string) => void;
}

export const FEATURED_TOURS: Tour[] = [
  {
    id: "t1",
    name: "Byblos & Batroun Tour",
    duration: "Full Day (8-10 Hours)",
    highlights: ["Byblos Old Souk", "Byblos Ancient Harbor", "Batroun Old Town", "Authentic Seafood Dining"],
    description: "Immerse yourself in history! Discover Byblos, one of the oldest continuously inhabited Phoenician cities, explore the medieval Crusaders Castle, then head to Batroun to wander old stone walls, sip fresh lemonade, and enjoy seaside views.",
    image: "https://images.unsplash.com/photo-1607627000458-210e8d261a14?auto=format&fit=crop&q=80&w=600",
    priceEstimateUSD: 140
  },
  {
    id: "t2",
    name: "Jeita & Harissa Tour",
    duration: "Half Day (6-8 Hours)",
    highlights: ["Jeita Grotto Limestone Caves", "Our Lady of Lebanon Shrine", "Scenic Teleferique Cable Car", "Breathtaking Jounieh Bay Views"],
    description: "Explore Lebanon's natural wonders and spiritual heights. Cruise inside the lower underground river cave of Jeita Grotto, and take the panoramic cable car to the majestic heights of Harissa overlooking the coast.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600",
    priceEstimateUSD: 110
  },
  {
    id: "t3",
    name: "Cedars & Bcharre Tour",
    duration: "Full Day (9-11 Hours)",
    highlights: ["Sacred Cedars of God Forest", "Kahlil Gibran Museum", "Winding Qadisha Valley Hermitages", "Stunning Mountain Sightseeing"],
    description: "Ascend high into Mount Lebanon to stand amongst trees older than civilization. Visit Bcharre, the mountain hometown of legendary poet Kahlil Gibran, visit his museum, and peer into the mystical, historic Qadisha Valley.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
    priceEstimateUSD: 160
  },
  {
    id: "t4",
    name: "Baalbek Tour",
    duration: "Full Day (9-11 Hours)",
    highlights: ["Colossal Roman Temple complex", "Temple of Bacchus & Jupiter", "Chateau Ksara Wine Caves", "Fabulous Beqaa Valley Dining"],
    description: "A trip to the magnificent Beqaa Valley to witness the absolute peak of Roman imperial architecture. Walk among the gargantuan columns of Baalbek's legendary temples, then descend to Ksara's ancient caves for an authentic wine tasting.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600",
    priceEstimateUSD: 180
  }
];

export default function TourCard({ currentLang, onBookTour }: ToursListProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  return (
    <div className="space-y-8" id="tours-list">
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right" : "text-left md:text-center"}`}>
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">
          {t.toursTitle}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          {t.toursSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FEATURED_TOURS.map((tour) => {
          // Translate fields dynamically
          let tourName = tour.name;
          let tourDesc = tour.description;
          let tourHighlights = tour.highlights;
          let tourDuration = tour.duration;

          if (currentLang === "ar") {
            if (tour.id === "t1") {
              tourName = t.tourByblos;
              tourDesc = t.tourByblosDesc;
              tourDuration = "يوم كامل (٨-١٠ ساعات)";
              tourHighlights = ["الأسواق القديمة لجبيل", "الميناء الفينيقي الأثري", "حارات البترون الحجرية", "مأكولات بحرية طازجة"];
            } else if (tour.id === "t2") {
              tourName = t.tourJeita;
              tourDesc = t.tourJeitaDesc;
              tourDuration = "نصف يوم (٦-٨ ساعات)";
              tourHighlights = ["مغارة جعيتا الكلسية", "مزار سيدة حريصا", "تلفريك حريصا البانورامي", "إطلالات خليج جونيه"];
            } else if (tour.id === "t3") {
              tourName = t.tourCedars;
              tourDesc = t.tourCedarsDesc;
              tourDuration = "يوم كامل (٩-١١ ساعة)";
              tourHighlights = ["غابة أرز الرب المقدسة", "متحف جبران خليل جبران", "أديرة وادي قاديشا", "مناظر جبلية خلابة"];
            } else if (tour.id === "t4") {
              tourName = t.tourBaalbek;
              tourDesc = t.tourBaalbekDesc;
              tourDuration = "يوم كامل (٩-١١ ساعة)";
              tourHighlights = ["معابد بعلبك الرومانية الضخمة", "معبد باخوس وجوبيتر", "مغارة شاتو كسارة لتذوق النبيذ", "غداء بقاعي تقليدي"];
            }
          } else if (currentLang === "fr") {
            if (tour.id === "t1") {
              tourName = t.tourByblos;
              tourDesc = t.tourByblosDesc;
              tourDuration = "Journée Complète (8-10 H)";
              tourHighlights = ["Vieux Souk de Byblos", "Port Phénicien Antique", "Vielle Ville de Batroun", "Dîner Fruits de Mer"];
            } else if (tour.id === "t2") {
              tourName = t.tourJeita;
              tourDesc = t.tourJeitaDesc;
              tourDuration = "Demi-Journée (6-8 H)";
              tourHighlights = ["Grottes de Jeita Grotto", "Sanctuaire Notre-Dame d'Harissa", "Téléphérique Panoramique", "Vue sur la Baie de Jounieh"];
            } else if (tour.id === "t3") {
              tourName = t.tourCedars;
              tourDesc = t.tourCedarsDesc;
              tourDuration = "Journée Complète (9-11 H)";
              tourHighlights = ["Forêt Sacrée des Cèdres de Dieu", "Musée Kahlil Gibran", "Ermitages de la Vallée de Qadisha", "Paysages Alpins de Montagne"];
            } else if (tour.id === "t4") {
              tourName = t.tourBaalbek;
              tourDesc = t.tourBaalbekDesc;
              tourDuration = "Journée Complète (9-11 H)";
              tourHighlights = ["Temples Romains Colossaux", "Temple de Bacchus & Jupiter", "Caves Historiques de Ksara", "Cuisine Traditionnelle de la Békaa"];
            }
          }

          return (
            <div
              key={tour.id}
              className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden hover:border-brand-border-hover transition-all duration-300 flex flex-col md:flex-row group shadow-xl"
              id={`tour-card-${tour.id}`}
            >
              {/* Tour Image */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden shrink-0">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-[10px] font-mono font-bold text-brand-accent">
                  Private Guided Tour
                </div>
              </div>

              {/* Tour Info */}
              <div className={`p-8 md:p-8 flex-1 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className={`flex items-center gap-1.5 text-[11px] text-brand-accent font-mono font-bold uppercase ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Clock className="w-4 h-4 text-brand-accent" />
                      <span>{tourDuration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors leading-snug">
                      {tourName}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tourDesc}
                  </p>

                  <div className="border-t border-neutral-900 pt-4 space-y-2.5">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-extrabold block">
                      {currentLang === "ar" ? "أبرز المعالم المتضمنة:" : currentLang === "fr" ? "Points Forts Visités :" : "Tour Highlights:"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tourHighlights.map((hl, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1.5 text-[11px] text-neutral-300 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-900 mt-6">
                  <button
                    onClick={() => onBookTour(tour.id)}
                    className="w-full bg-brand-accent hover:bg-brand-accent-hover text-black text-xs font-bold py-3 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg"
                    id={`book-tour-btn-${tour.id}`}
                  >
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
