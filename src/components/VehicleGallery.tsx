import React from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Language } from "../types";
import galleryImage1 from "../assets/images/1.png";
import galleryImage2 from "../assets/images/2.png";
import galleryImage3 from "../assets/images/3.png";
import galleryImage4 from "../assets/images/4.png";
import galleryImage5 from "../assets/images/5.png";
import galleryImage6 from "../assets/images/6.png";
import galleryImage7 from "../assets/images/7.png";
import galleryImage8 from "../assets/images/8.png";
import galleryImage9 from "../assets/images/9.png";
import galleryImage10 from "../assets/images/10.png";
import galleryImage11 from "../assets/images/11.png";
import galleryImage12 from "../assets/images/12.png";
import galleryImage13 from "../assets/images/13.png";

interface GalleryItem {
  id: string;
  // Path for portrait image (aspect ratio 3:4)
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", image: galleryImage1 },
  { id: "g2", image: galleryImage2 },
  { id: "g3", image: galleryImage3 },
  { id: "g4", image: galleryImage4 },
  { id: "g5", image: galleryImage5 },
  { id: "g6", image: galleryImage6 },
  { id: "g7", image: galleryImage7 },
  { id: "g8", image: galleryImage8 },
  { id: "g9", image: galleryImage9 },
  { id: "g10", image: galleryImage10 },
  { id: "g11", image: galleryImage11 },
  { id: "g12", image: galleryImage12 },
  { id: "g13", image: galleryImage13 },
];

interface VehicleGalleryProps {
  currentLang: Language;
}

export default function VehicleGallery({ currentLang }: VehicleGalleryProps) {
  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const isRtl = currentLang === "ar";

  // Auto-slide to next portrait image every 2.6 seconds.
  // Re-runs and resets timer when manual click updates activeIdx.
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [activeIdx]);

  return (
    <div className="py-3 sm:py-6 md:py-8 overflow-hidden" id="vehicle-portrait-gallery">
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <span className="text-[10px] text-brand-accent font-mono uppercase tracking-[0.35em] font-bold block mb-1">
              {currentLang === "ar" ? "معرض المركبات" : currentLang === "fr" ? "Galerie de Véhicules" : "Fleet Gallery"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-text tracking-tight font-sans">
              {currentLang === "ar" ? "اكتشف فخامة أسطولنا" : currentLang === "fr" ? "Découvrez la Sophistication de Notre Flotte" : "Discover the Prestige of Our Fleet"}
            </h3>
          </div>
        </div>

        <div className="flex justify-center items-center h-[430px] sm:h-[500px] md:h-[620px] lg:h-[720px] relative w-full overflow-visible">
          {GALLERY_ITEMS.map((item, idx) => {
            // Determine position status relative to active index supporting 10+ items beautifully
            const count = GALLERY_ITEMS.length;
            
            let position: "left" | "middle" | "right" | "hidden" = "hidden";
            
            if (idx === activeIdx) {
              position = "middle";
            } else if (idx === (activeIdx - 1 + count) % count) {
              position = "left";
            } else if (idx === (activeIdx + 1) % count) {
              position = "right";
            }

            const isMiddle = position === "middle";
            const isLeft = position === "left";
            const isRight = position === "right";
            const isHidden = position === "hidden";

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (!isMiddle) setActiveIdx(idx);
                }}
                className={`absolute w-[240px] sm:w-[280px] md:w-[330px] lg:w-[390px] aspect-square rounded-[26px] sm:rounded-[34px] overflow-hidden cursor-pointer select-none ${
                  isMiddle
                    ? "shadow-brand bg-brand-card border-2 border-brand-accent"
                    : "shadow-lg bg-brand-card/40 border border-brand-border/40"
                }`}
                style={{
                  pointerEvents: isHidden ? "none" : "auto"
                }}
                animate={{
                  scale: isMiddle ? 1.1 : isHidden ? 0.58 : 0.84,
                  opacity: isMiddle ? 1 : isHidden ? 0 : 0.56,
                  x: isLeft ? "-58%" : isRight ? "58%" : "0%",
                  rotateY: isLeft ? 12 : isRight ? -12 : 0,
                  y: isMiddle ? -6 : 6,
                  zIndex: isMiddle ? 20 : isHidden ? 0 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                {/* Portrait Image Only - Pure, clean, no text overlays */}
                <div className="relative w-full h-full bg-neutral-950">
                  <img
                    src={item.image}
                    alt={`Vehicle portrait ${idx + 1}`}
                    className="w-full h-full object-contain object-center select-none pointer-events-none bg-black/95"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Camera / Path Info Badge for User on Hover */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-300 opacity-0 hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20">
                    <Camera className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Local asset #{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-1.5 mt-5 sm:mt-6 max-w-md mx-auto flex-wrap" dir="ltr">
          {GALLERY_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? "w-8 bg-brand-accent" : "w-2.5 bg-neutral-800 hover:bg-neutral-700"
              }`}
              aria-label={`Show vehicle ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
