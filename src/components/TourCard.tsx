import { Clock, MessageSquare } from "lucide-react";
import { Language, Tour } from "../types";
import { translations } from "../translations";

interface ToursListProps {
  currentLang: Language;
  onBookTour: (tourId: string, tourName: string) => void;
}

export const FEATURED_TOURS: Tour[] = [
  {
    id: "t1",
    name: "Northern Wonders: Jeita Grotto, Harissa, Byblos & Batroun",
    duration: "Full Day (8-10 Hours)",
    highlights: [],
    description: "Wander the sparkling caves of Jeita, ride the scenic Teleferique cable car to Harissa, then explore ancient Byblos and the coastal charm of Batroun.",
    image: "https://images.unsplash.com/photo-1607627000458-210e8d261a14?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 140
  },
  {
    id: "t2",
    name: "Chouf Explorer: Moussa Castle, Beiteddine Palace, Ain w Zein & Cedar Forest",
    duration: "Full Day (9-11 Hours)",
    highlights: [],
    description: "Discover Chouf's gems: the handbuilt Moussa Castle, the majestic Beiteddine Palace, Ain w Zein natural cave, and the ancient Cedar Forest.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 160
  },
  {
    id: "t3",
    name: "Bekaa Heritage: Baalbek Temples & Zahle",
    duration: "Full Day (8-10 Hours)",
    highlights: [],
    description: "Marvel at the monumental Roman temples of Baalbek and relax by the picturesque Berdawni riverbanks in the valley city of Zahle.",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 150
  },
  {
    id: "t4",
    name: "Bekaa Eco-Escape: Taanayel Farm, Aamiq Wetland & Chtoura",
    duration: "Full Day (7-9 Hours)",
    highlights: [],
    description: "Stroll the beautiful tree-lined paths of Taanayel Farm, discover rare wildlife at Aamiq Wetland, and enjoy authentic dairy tasting in Chtoura.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 140
  },
  {
    id: "t5",
    name: "Sidon (Saida) Coastal Heritage Tour",
    duration: "Full Day (7-9 Hours)",
    highlights: [],
    description: "Explore the historic Crusader Sea Castle in Sidon, stroll through the vibrant ancient souks, visit the soap museum, and experience Phoenician heritage.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 130
  },
  {
    id: "t6",
    name: "Beirut & Downtown Culture: National Museum & Sursock Museum",
    duration: "Full Day (6-8 Hours)",
    highlights: [],
    description: "Dive into history at Beirut's restored Downtown, visit the prestigious Sursock Museum, and admire ancient treasures at the National Museum.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 120
  },
  {
    id: "t7",
    name: "Faraya Mountain Escape: Winter Ski or Summer ATV & Lake Adventure",
    duration: "Full Day (8-10 Hours)",
    highlights: [],
    description: "Experience the high snowfields of Faraya Ski Resort in winter, or ride ATVs around the high-altitude lake and natural bridges in summer.",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800",
    priceEstimateUSD: 150
  }
];

export default function TourCard({ currentLang, onBookTour }: ToursListProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  return (
    <div className="space-y-8" id="tours-list">
      <div className={`text-center max-w-2xl mx-auto space-y-3 ${isRtl ? "text-right md:text-center" : "text-left md:text-center"}`}>
        <h2 className="text-2xl md:text-3xl font-black text-brand-text font-sans tracking-tight">
          {t.toursTitle}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          {t.toursSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {FEATURED_TOURS.map((tour) => {
          let tourName = tour.name;
          let tourDesc = tour.description;
          let tourDuration = tour.duration;

          if (currentLang === "ar") {
            if (tour.id === "t1") {
              tourName = "رحلة عجائب الشمال: مغارة جعيتا، حريصا، جبيل والبترون";
              tourDesc = "اكتشف روعة مغارة جعيتا، واركب تلفريك حريصا، ثم تجول في مدينة جبيل التاريخية واستمتع بشواطئ وأزقة البترون الساحرة.";
              tourDuration = "يوم كامل (٨-١٠ ساعات)";
            } else if (tour.id === "t2") {
              tourName = "رحلة مستكشف الشوف: قلعة موسى، قصر بيت الدين، عين وزين وغابة الأرز";
              tourDesc = "اكتشف جواهر الشوف: قلعة موسى المصنوعة يدوياً، قصر بيت الدين المهيب، مغارة عين وزين الطبيعية وغابة الأرز العريقة.";
              tourDuration = "يوم كامل (٩-١١ ساعة)";
            } else if (tour.id === "t3") {
              tourName = "تراث البقاع: معابد بعلبك الرومانية وزحلة";
              tourDesc = "تأمل معابد بعلبك الرومانية الشامخة والعملاقة، ثم استرخِ على ضفاف نهر البردوني الساحر في مدينة زحلة.";
              tourDuration = "يوم كامل (٨-١٠ ساعات)";
            } else if (tour.id === "t4") {
              tourName = "الطبيعة في البقاع: تعنايل، مستنقعات عميق وشتورة";
              tourDesc = "تجول بين ممرات مزرعة تعنايل المظللة بالأشجار، واكتشف الحياة البرية في مستنقعات عميق، وتذوق أشهى الألبان والأجبان في شتورة.";
              tourDuration = "يوم كامل (٧-٩ ساعات)";
            } else if (tour.id === "t5") {
              tourName = "جولة صيدا التاريخية والساحلية";
              tourDesc = "استكشف قلعة صيدا البحرية الأثرية، وتجول في الأسواق القديمة النابضة بالحياة، وزر متحف الصابون وخان الإفرنج التاريخي.";
              tourDuration = "يوم كامل (٧-٩ ساعات)";
            } else if (tour.id === "t6") {
              tourName = "ثقافة بيروت ووسط البلد: المتحف الوطني ومتحف سرسق";
              tourDesc = "اكتشف وسط بيروت النابض بالحياة، وزر متحف سرسق للفنون بأسلوبه المعماري الفريد، وتأمل الكنوز الأثرية في المتحف الوطني.";
              tourDuration = "يوم كامل (٦-٨ ساعات)";
            } else if (tour.id === "t7") {
              tourName = "مغامرة فاريا الجبلية: تزلج شتوي أو ATV عند البحيرة";
              tourDesc = "استمتع بالثلوج الناصعة في منتجع فاريا للتزلج شتاءً، أو انطلق في جولة ATV مثيرة حول البحيرة الجبلية والجسور الطبيعية صيفاً.";
              tourDuration = "يوم كامل (٨-١٠ ساعات)";
            }
          } else if (currentLang === "fr") {
            if (tour.id === "t1") {
              tourName = "Merveilles du Nord : Grotte de Jeita, Harissa, Byblos & Batroun";
              tourDesc = "Découvrez la grotte de Jeita, montez en Téléphérique à Harissa, puis explorez la ville antique de Byblos et le charme côtier de Batroun.";
              tourDuration = "Journée Complète (8-10 H)";
            } else if (tour.id === "t2") {
              tourName = "Splendeurs du Chouf : Château de Moussa, Beiteddine, Ain w Zein & Cèdres";
              tourDesc = "Explorez le Chouf : le château de Moussa, le majestueux palais de Beiteddine, la grotte d'Ain w Zein et l'ancienne forêt de Cèdres.";
              tourDuration = "Journée Complète (9-11 H)";
            } else if (tour.id === "t3") {
              tourName = "Patrimoine de la Bekaa : Temples de Baalbek & Zahlé";
              tourDesc = "Émerveillez-vous devant les gigantesques temples romains de Baalbek, puis détendez-vous au bord de la rivière Berdawni à Zahlé.";
              tourDuration = "Journée Complète (8-10 H)";
            } else if (tour.id === "t4") {
              tourName = "Éco-Évasion : Domaine de Taanayel, Aamiq & Chtoura";
              tourDesc = "Promenez-vous sous les arbres de la ferme de Taanayel, observez la biodiversité à Aamiq, et dégustez les spécialités de Chtoura.";
              tourDuration = "Journée Complète (7-9 H)";
            } else if (tour.id === "t5") {
              tourName = "Journée Côtière à Saida";
              tourDesc = "Visitez le château de mer de Sidon, promenez-vous dans les souks pittoresques, visitez le musée du savon et découvrez l'héritage phénicien.";
              tourDuration = "Journée Complète (7-9 H)";
            } else if (tour.id === "t6") {
              tourName = "Culture de Beyrouth : Musée National & Musée Sursock";
              tourDesc = "Plongez dans l'histoire au centre-ville de Beyrouth, visitez le somptueux musée Sursock et admirez les trésors du Musée National.";
              tourDuration = "Journée Complète (6-8 H)";
            } else if (tour.id === "t7") {
              tourName = "Escapade à Faraya : Ski ou Aventure en ATV & Lac";
              tourDesc = "Vivez l'expérience des pistes enneigées de Faraya en hiver, ou pilotez des ATV autour du lac de montagne et du pont naturel en été.";
              tourDuration = "Journée Complète (8-10 H)";
            }
          }

          return (
            <div
              key={tour.id}
              className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden hover:border-brand-border-hover transition-all duration-300 flex flex-col md:flex-row group shadow-xl"
              id={`tour-card-${tour.id}`}
            >
              {/* Tour Image - Premium Upload Path Placeholder */}
              <div className="relative w-full md:w-2/5 h-48 md:h-auto min-h-[180px] bg-gradient-to-br from-[#121212] to-[#070707] border-b md:border-b-0 md:border-r border-brand-border flex flex-col items-center justify-center p-6 shrink-0 group/img text-center">
                <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <div className="relative z-10 space-y-2.5 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-sm group-hover/img:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-accent font-mono font-bold tracking-wider block uppercase">
                      {currentLang === "ar" ? "مسار رفع الصورة" : currentLang === "fr" ? "Chemin de l'image" : "Image Upload Path"}
                    </span>
                    <code className="text-[11px] text-brand-muted bg-neutral-900/90 px-3 py-1 rounded border border-neutral-800 font-mono select-all block">
                      {tour.id === "t1" ? "/images/tours/jeita.jpg" :
                       tour.id === "t2" ? "/images/tours/chouf.jpg" :
                       tour.id === "t3" ? "/images/tours/baalbek.jpg" :
                       tour.id === "t4" ? "/images/tours/taanayel.jpg" :
                       tour.id === "t5" ? "/images/tours/saida.jpg" :
                       tour.id === "t6" ? "/images/tours/beirut.jpg" :
                       "/images/tours/faraya.jpg"}
                    </code>
                  </div>
                </div>
              </div>

              {/* Tour Info */}
              <div className={`p-6 md:p-8 flex-1 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className={`flex items-center gap-1.5 text-[11px] text-brand-accent font-mono font-bold uppercase ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Clock className="w-4 h-4 text-brand-accent animate-pulse" />
                      <span>{tourDuration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors leading-snug">
                      {tourName}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tourDesc}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-border mt-6 relative group/btn">
                  {/* Subtle pulsing background glow to draw attention */}
                  <div className="absolute inset-x-0 bottom-0 top-6 bg-brand-accent/25 rounded-2xl blur-md opacity-60 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200 animate-pulse pointer-events-none"></div>
                  
                  <div className="relative">
                    <button
                      onClick={() => onBookTour(tour.id, tourName)}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-btn-text text-xs font-black py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 relative z-10"
                      id={`book-tour-btn-${tour.id}`}
                    >
                      <MessageSquare className="w-4 h-4 text-brand-btn-text" />
                      <span>{currentLang === "ar" ? "تفاصيل إضافية وحجز" : currentLang === "fr" ? "Détails & Réservation" : "Get Itinerary & Book"}</span>
                    </button>
                  </div>

                  {/* Multi-lingual Animated Tooltip */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent border border-brand-accent-hover text-brand-btn-text text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 flex items-center gap-1">
                    <span>⚡</span>
                    <span>
                      {currentLang === "ar"
                        ? "واتساب مباشر"
                        : currentLang === "fr"
                        ? "Contact Direct"
                        : "WhatsApp Direct"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
