import {
  ArrowRight,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Language, Tour } from "../types";
import { translations } from "../translations";
import northImage from "../assets/images/tour-jeita-harissa.jpg";
import coastalImage from "../assets/images/tour-byblos-batroun.jpg";
import choufImage from "../assets/images/tour-chouf-beiteddine.jpg";
import beirutImage from "../assets/images/tour-beirut.jpg";
import saidaImage from "../assets/images/tour-saida-jezzine.jpg";
import baalbekImage from "../assets/images/tour-baalbek-zahle.jpg";

interface ToursListProps {
  currentLang: Language;
  onBookTour: (tourId: string, tourName: string) => void;
  pageHeading?: boolean;
}

type LocalizedText = { en: string; ar: string };

interface TourCardData {
  id: string;
  name: LocalizedText;
  duration: LocalizedText;
  description: LocalizedText;
  stops: { en: string[]; ar: string[] };
  image: string;
  imageAlt: LocalizedText;
}

const TOURS: TourCardData[] = [
  {
    id: "t1",
    name: {
      en: "Museum, Jeita, Teleferique, Harissa & Jounieh",
      ar: "المتحف، جعيتا، التلفريك، حريصا وجونية",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "A varied day combining Lebanese heritage, Jeita’s natural setting, mountain views from Harissa, and time in Jounieh’s old souk.",
      ar: "يوم متنوع يجمع التراث اللبناني وطبيعة جعيتا وإطلالات حريصا الجبلية ووقتاً للتجول في سوق جونية القديم.",
    },
    stops: {
      en: ["Museum stop", "Jeita Grotto", "Teleferique & Harissa", "Jounieh Old Souk"],
      ar: ["زيارة المتحف", "مغارة جعيتا", "التلفريك وحريصا", "سوق جونية القديم"],
    },
    image: northImage,
    imageAlt: { en: "Private day trip in Lebanon", ar: "رحلة نهارية خاصة في لبنان" },
  },
  {
    id: "t2",
    name: {
      en: "Batroun & Byblos",
      ar: "البترون وجبيل",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "Explore two of Lebanon’s best-known coastal towns, their old streets and waterfronts.",
      ar: "اكتشف اثنتين من أشهر المدن الساحلية في لبنان وأزقتهما القديمة وواجهتهما البحرية.",
    },
    stops: {
      en: ["Batroun old town", "Byblos old souk & port"],
      ar: ["مدينة البترون القديمة", "سوق جبيل القديم والمرفأ"],
    },
    image: coastalImage,
    imageAlt: { en: "Byblos old port on the Lebanese coast", ar: "مرفأ جبيل القديم على الساحل اللبناني" },
  },
  {
    id: "t3",
    name: {
      en: "Moussa Castle, Beiteddine, Chouf Cedars & Ain W Zain",
      ar: "قلعة موسى، بيت الدين، أرز الشوف وعين وزين",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "A mountain route through Chouf combining architecture, cedar landscapes, village scenery, and the natural formations of Ain W Zain Grotto.",
      ar: "مسار جبلي في الشوف يجمع العمارة وغابات الأرز ومناظر القرى والتكوينات الطبيعية في مغارة عين وزين.",
    },
    stops: {
      en: ["Moussa Castle", "Beiteddine Palace", "Chouf Cedars", "Ain W Zain Grotto"],
      ar: ["قلعة موسى", "قصر بيت الدين", "أرز الشوف", "مغارة عين وزين"],
    },
    image: choufImage,
    imageAlt: { en: "Private vehicle for the Chouf day trip", ar: "سيارة خاصة لرحلة الشوف" },
  },
  {
    id: "t4",
    name: {
      en: "Beirut Highlights Tour",
      ar: "جولة معالم بيروت",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "Discover Beirut’s waterfront, central districts, museums, landmarks, neighbourhoods, and food stops at a pace that suits your day.",
      ar: "اكتشف واجهة بيروت البحرية ووسط المدينة والمتاحف والمعالم والأحياء ومحطات الطعام وفق الوتيرة التي تناسب يومك.",
    },
    stops: {
      en: ["National Museum", "Downtown Beirut", "Raouche", "Beirut neighbourhoods"],
      ar: ["المتحف الوطني", "وسط بيروت", "الروشة", "أحياء بيروت"],
    },
    image: beirutImage,
    imageAlt: { en: "Private Beirut city tour", ar: "جولة خاصة في مدينة بيروت" },
  },
  {
    id: "t5",
    name: {
      en: "Saida & Jezzine",
      ar: "صيدا وجزين",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "Start with Saida’s seafront heritage and old souks, then continue into the green southern mountains and waterfalls of Jezzine.",
      ar: "ابدأ من تراث صيدا البحري وأسواقها القديمة، ثم تابع إلى جبال الجنوب الخضراء وشلالات جزين.",
    },
    stops: {
      en: ["Saida Sea Castle", "Saida old souk", "Jezzine town", "Waterfall viewpoint"],
      ar: ["قلعة صيدا البحرية", "سوق صيدا القديم", "بلدة جزين", "إطلالة الشلال"],
    },
    image: saidaImage,
    imageAlt: { en: "Saida coastal day trip", ar: "رحلة نهارية إلى صيدا" },
  },
  {
    id: "t6",
    name: {
      en: "Baalbek & Zahle",
      ar: "بعلبك وزحلة",
    },
    duration: { en: "Full day · approximately 8–9 hours", ar: "يوم كامل · نحو ٨–٩ ساعات" },
    description: {
      en: "Travel into the Bekaa Valley for Baalbek’s monumental archaeological site, then enjoy time along Zahle’s Berdawni area.",
      ar: "انطلق إلى سهل البقاع لزيارة موقع بعلبك الأثري الشهير، ثم استمتع بوقت في منطقة البردوني في زحلة.",
    },
    stops: {
      en: ["Baalbek archaeological site", "Baalbek old town", "Zahle & Berdawni"],
      ar: ["موقع بعلبك الأثري", "مدينة بعلبك القديمة", "زحلة والبردوني"],
    },
    image: baalbekImage,
    imageAlt: { en: "Baalbek temples day trip", ar: "رحلة إلى معابد بعلبك" },
  },
];

export const FEATURED_TOURS: Tour[] = TOURS.map((tour) => ({
  id: tour.id,
  name: tour.name.en,
  duration: tour.duration.en,
  highlights: tour.stops.en,
  description: tour.description.en,
  image: tour.image,
  priceEstimateUSD: 0,
}));

export default function TourCard({ currentLang, onBookTour, pageHeading = false }: ToursListProps) {
  const t = translations[currentLang];
  const isRtl = currentLang === "ar";

  return (
    <div className="space-y-10 sm:space-y-12" id="tours-list">
      <section className="relative overflow-hidden rounded-[32px] border border-brand-border bg-brand-card px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
        <div className={`relative mx-auto max-w-3xl space-y-4 ${isRtl ? "text-right md:text-center" : "text-left md:text-center"}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {currentLang === "ar" ? "جولات خاصة في لبنان" : "Private Lebanon day trips"}
          </span>
          {pageHeading ? (
            <h1 className="text-3xl font-black leading-tight tracking-tight text-brand-text md:text-5xl">
              {currentLang === "ar" ? "اختر رحلتك، ونحن نهتم بالطريق" : "Choose the places. We’ll take care of the road."}
            </h1>
          ) : (
            <h2 className="text-2xl font-black leading-tight tracking-tight text-brand-text md:text-3xl">{t.toursTitle}</h2>
          )}
          <p className="mx-auto max-w-2xl text-sm leading-7 text-brand-muted">
            {currentLang === "ar"
              ? "اختر إحدى رحلاتنا المعروفة أو أرسل لنا الأماكن التي تريد زيارتها. نرتب لك سيارة خاصة وسائقاً محترفاً ووقت انطلاق يناسبك."
              : "Choose one of our best-known routes or send us the places you want to visit. We arrange a private vehicle, professional driver, and pickup time around your day."}
          </p>
        </div>
      </section>

      <section className="grid gap-4 rounded-[28px] border border-brand-accent/25 bg-brand-accent/5 p-5 sm:grid-cols-2 sm:p-7" aria-label={currentLang === "ar" ? "ما تشمله خدمة الرحلة" : "Tour service inclusions"}>
        <div className={isRtl ? "text-right" : "text-left"}>
          <div className="flex items-center gap-2 text-sm font-extrabold text-brand-text">
            <Car className="h-5 w-5 text-brand-accent" />
            {currentLang === "ar" ? "يشمل الحجز" : "Your booking includes"}
          </div>
          <div className="mt-3 space-y-2 text-xs text-brand-muted">
            {[currentLang === "ar" ? "سيارة خاصة لك ولمرافقيك" : "A private vehicle for your group", currentLang === "ar" ? "سائق محترف وخدمة الاستلام والعودة" : "Professional driver, pickup, and return", currentLang === "ar" ? "الوقود والتنقل بين المحطات المتفق عليها" : "Fuel and travel between agreed stops"].map((item) => (
              <p key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className={`border-t border-brand-border pt-5 sm:border-t-0 sm:pt-0 ${isRtl ? "sm:border-r sm:pr-7 text-right" : "sm:border-l sm:pl-7 text-left"}`}>
          <div className="flex items-center gap-2 text-sm font-extrabold text-brand-text">
            <Ticket className="h-5 w-5 text-brand-accent" />
            {currentLang === "ar" ? "تُدفع في الموقع" : "Paid directly at each place"}
          </div>
          <p className="mt-3 text-xs leading-6 text-brand-muted">
            {currentLang === "ar"
              ? "تذاكر الدخول والتلفريك والأنشطة والوجبات والمصاريف الشخصية غير مشمولة، ويشتريها الضيوف مباشرة في المكان."
              : "Entrance tickets, Teleferique rides, activities, meals, and personal expenses are not included and are purchased by guests on site."}
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {TOURS.map((tour, index) => {
          const tourName = tour.name[currentLang];
          return (
            <article
              key={tour.id}
              className="group grid overflow-hidden rounded-[28px] border border-brand-border bg-brand-card shadow-sm transition-all duration-300 hover:border-brand-accent/40 hover:shadow-xl md:grid-cols-[minmax(230px,34%)_1fr]"
              id={`tour-card-${tour.id}`}
              style={{ direction: "ltr" }}
            >
              <div className="relative min-h-72 overflow-hidden bg-brand-bg md:min-h-[430px]">
                <img
                  src={tour.image}
                  alt={tour.imageAlt[currentLang]}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="736"
                  height="981"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                  {currentLang === "ar" ? `رحلة ${index + 1}` : `Route ${index + 1}`}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    {currentLang === "ar" ? "لبنان" : "Lebanon"}
                  </span>
                </div>
              </div>

              <div
                className={`flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10 ${isRtl ? "text-right" : "text-left"}`}
                style={{ direction: isRtl ? "rtl" : "ltr" }}
              >
                <div className={`mb-4 flex flex-wrap items-center gap-2 ${isRtl ? "justify-start" : ""}`}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 text-[10px] font-bold text-brand-accent">
                    <Clock className="h-3.5 w-3.5" />
                    {tour.duration[currentLang]}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 text-[10px] font-bold text-brand-muted">
                    <Car className="h-3.5 w-3.5 text-brand-accent" />
                    {currentLang === "ar" ? "سيارة خاصة وسائق" : "Private car + driver"}
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight tracking-tight text-brand-text sm:text-3xl">
                  {tourName}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted">{tour.description[currentLang]}</p>

                <div className="mt-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accent">
                    {currentLang === "ar" ? "المحطات المقترحة" : "Suggested stops"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tour.stops[currentLang].map((stop) => (
                      <span key={stop} className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-bg px-2.5 py-1.5 text-[10px] font-semibold text-brand-text">
                        <MapPin className="h-3 w-3 text-brand-accent" />
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-brand-border pt-5">
                  <button
                    type="button"
                    onClick={() => onBookTour(tour.id, tourName)}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-accent px-5 py-3 text-xs font-extrabold text-brand-btn-text shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-accent-hover sm:w-auto sm:min-w-64"
                    id={`book-tour-btn-${tour.id}`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{currentLang === "ar" ? "أريد حجز هذه الرحلة" : "I want to book this route"}</span>
                    <ArrowRight className="h-4 w-4" style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
                  </button>
                  <p className={`mt-2 text-[9px] font-semibold text-brand-muted ${isRtl ? "text-right" : "text-left"}`}>
                    {currentLang === "ar" ? "سيارة خاصة وسائق فقط · التذاكر تُدفع في الموقع" : "Private car + driver only · tickets paid on site"}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="relative overflow-hidden rounded-[32px] border border-brand-accent/30 bg-brand-card px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="absolute -bottom-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">
            {currentLang === "ar" ? "رحلتك كما تريدها" : "Your day, your route"}
          </span>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-brand-text sm:text-3xl">
            {currentLang === "ar" ? "تريد دمج أماكن مختلفة؟" : "Want to combine different places?"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-brand-muted">
            {currentLang === "ar"
              ? "أرسل لنا الأماكن التي تريد زيارتها وتاريخ الرحلة ومكان الانطلاق وعدد الركاب، وسنقترح مساراً عملياً ومدة مناسبة."
              : "Send us your preferred places, travel date, pickup location, and group size. We’ll suggest a practical route and suitable duration."}
          </p>
          <button
            type="button"
            onClick={() => onBookTour("custom", currentLang === "ar" ? "رحلة مخصصة في لبنان" : "Custom Lebanon day trip")}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-accent px-7 py-3 text-xs font-extrabold text-brand-btn-text shadow-lg transition-colors hover:bg-brand-accent-hover"
          >
            <MessageSquare className="h-4 w-4" />
            {currentLang === "ar" ? "صمّم رحلتي عبر واتساب" : "Build my trip on WhatsApp"}
          </button>
        </div>
      </section>
    </div>
  );
}
