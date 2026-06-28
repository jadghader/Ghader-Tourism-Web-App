import React from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Compass } from "lucide-react";
import { Language } from "../types";

interface Post {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  date: string;
  image: string;
  category: Record<Language, string>;
}

const POSTS: Post[] = [
  {
    id: "landscape_slide_1",
    title: {
      en: "Ghader Tourism | Elite Private Travel & Chauffeur Services",
      ar: "غادِر للسياحة | أرقى خدمات السفر والنقل السياحي الفاخر",
      fr: "Ghader Tourism | Prestations de Prestige & Chauffeur Privé"
    },
    excerpt: {
      en: "Experience Lebanon with absolute comfort and privacy. Premium customized vehicles, certified professional chauffeurs, and bespoke curated tours tailored around your schedule.",
      ar: "استمتع بجمال لبنان بأعلى مستويات الراحة والخصوصية مع سائقينا المحترفين وسياراتنا الفاخرة وجولاتنا الخاصة المنسقة بعناية لتناسب وقتك.",
      fr: "Voyagez à travers le Liban en toute sérénité. Des véhicules haut de gamme, des chauffeurs professionnels et des itinéraires personnalisés selon vos envies."
    },
    date: "June 28, 2026",
    category: {
      en: "Premium Travel",
      ar: "سياحة فاخرة",
      fr: "Voyage de Luxe"
    },
    // USER CONFIGURATION: Replace this with the relative path to your first uploaded landscape image!
    // Example: "/src/assets/images/your_landscape_1.jpg"
    image: "/src/assets/images/landscape1.jpg"
  },
  {
    id: "landscape_slide_2",
    title: {
      en: "Custom VIP Day Tours & Private Sightseeing Excursions",
      ar: "جولات سياحية نهارية خاصة ومخصصة لكبار الشخصيات",
      fr: "Circuits Privés sur Mesure & Excursions d'Exception"
    },
    excerpt: {
      en: "Discover the breathtaking mountain ranges, coastal heritage, and historical ruins of Lebanon. Enjoy fluid, flexible routing guided by local experts in executive SUVs.",
      ar: "اكتشف الجبال الساحرة، والبلدات الأثرية وسحر الشواطئ اللبنانية بمرونة تامة برفقة سائقين محليين محترفين مطلعين على أفضل المعالم.",
      fr: "Découvrez les montagnes majestueuses et le patrimoine historique du Liban. Profitez d'itinéraires flexibles et exclusifs à bord de nos SUV de luxe."
    },
    date: "June 28, 2026",
    category: {
      en: "Exclusive Day Tours",
      ar: "جولات يومية خاصة",
      fr: "Excursions Sur Mesure"
    },
    // USER CONFIGURATION: Replace this with the relative path to your second uploaded landscape image!
    // Example: "/src/assets/images/your_landscape_2.jpg"
    image: "/src/assets/images/landscape2.jpg"
  }
];

interface BlogCarouselProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
}

export default function BlogCarousel({ currentLang, onNavigate }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const isRtl = currentLang === "ar";

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % POSTS.length);
    }, 8000); // Auto-slide every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % POSTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + POSTS.length) % POSTS.length);
  };

  const activePost = POSTS[currentIndex];

  return (
    <div className="space-y-6" id="blog-carousel-section">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
        <div>
          <span className="text-xs text-brand-accent font-mono font-bold uppercase tracking-widest block mb-1">
            {currentLang === "ar" ? "مدونة غادِر السياحية" : currentLang === "fr" ? "Blog de Voyage Liban" : "Ghader Travel Stories"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text tracking-tight font-sans">
            {currentLang === "ar" ? "استكشف جمال وتاريخ لبنان" : currentLang === "fr" ? "Explorez le Charme du Liban" : "Lebanon Sightseeing Inspiration"}
          </h2>
        </div>
        <div className="flex gap-2" dir="ltr">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-card hover:border-brand-accent text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 text-brand-accent" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-card hover:border-brand-accent text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 text-brand-accent" />
          </button>
        </div>
      </div>

      {/* Main Slideshow Showcase Area - Pure Image Display with elegant overlay to support portrait/landscape safely */}
      <div className="relative overflow-hidden rounded-[32px] border border-brand-border bg-[#0a0a0a] shadow-2xl h-[400px] md:h-[550px] flex items-center justify-center group transition-all duration-300 animate-fade-in" key={currentIndex}>
        
        {/* Slideshow Image container - Centered and full view */}
        <div className="w-full h-full flex items-center justify-center relative">
          <img
            src={activePost.image}
            alt={activePost.title[currentLang]}
            className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dots indicators with glass background for contrast */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10" dir="ltr">
          {POSTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-6 bg-brand-accent" : "w-2 bg-white/30 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
