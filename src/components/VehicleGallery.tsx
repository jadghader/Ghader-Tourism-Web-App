import React from "react";
import { Language } from "../types";
import galleryImage1En from "../assets/images/1_en.webp";
import galleryImage2En from "../assets/images/2_en.webp";
import galleryImage3En from "../assets/images/3_en.webp";
import galleryImage4En from "../assets/images/4_en.webp";
import galleryImage6En from "../assets/images/6_en.webp";
import galleryImage7En from "../assets/images/7_en.webp";
import galleryImage1Ar from "../assets/images/1_ar.webp";
import galleryImage2Ar from "../assets/images/2_ar.webp";
import galleryImage3Ar from "../assets/images/3_ar.webp";
import galleryImage4Ar from "../assets/images/4_ar.webp";
import galleryImage5Ar from "../assets/images/5_ar.webp";
import galleryImage7Ar from "../assets/images/7_ar.webp";

interface GalleryItem {
  id: string;
  // Path for portrait image (aspect ratio 3:4)
  image: string;
}

const GALLERY_ITEMS: Record<Language, GalleryItem[]> = {
  en: [
    { id: "g1-en", image: galleryImage1En },
    { id: "g2-en", image: galleryImage2En },
    { id: "g3-en", image: galleryImage3En },
    { id: "g4-en", image: galleryImage4En },
    { id: "g6-en", image: galleryImage6En },
    { id: "g7-en", image: galleryImage7En },
  ],
  ar: [
    { id: "g1-ar", image: galleryImage1Ar },
    { id: "g2-ar", image: galleryImage2Ar },
    { id: "g3-ar", image: galleryImage3Ar },
    { id: "g4-ar", image: galleryImage4Ar },
    { id: "g5-ar", image: galleryImage5Ar },
    { id: "g7-ar", image: galleryImage7Ar },
  ],
};

interface VehicleGalleryProps {
  currentLang: Language;
}

export default function VehicleGallery({ currentLang }: VehicleGalleryProps) {
  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const isRtl = currentLang === "ar";
  const galleryItems = GALLERY_ITEMS[currentLang];

  React.useEffect(() => {
    setActiveIdx(0);
  }, [currentLang]);

  // Keep one lightweight timer and render only the three visible slides.
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % galleryItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryItems.length]);

  const visibleItems = React.useMemo(() => {
    const count = galleryItems.length;
    const visibleIndexes = new Set([
      (activeIdx - 1 + count) % count,
      activeIdx,
      (activeIdx + 1) % count,
    ]);
    return galleryItems.map((item, idx) => ({ item, idx })).filter(({ idx }) => visibleIndexes.has(idx));
  }, [activeIdx, galleryItems]);

  return (
    <div className="py-1 sm:py-2 overflow-hidden" id="vehicle-portrait-gallery">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-[340px] sm:h-[450px] md:h-[540px] lg:h-[620px] relative w-full overflow-visible">
          {visibleItems.map(({ item, idx }) => {
            const count = galleryItems.length;
            let position: "left" | "middle" | "right" = "middle";
            
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
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isMiddle) setActiveIdx(idx);
                }}
                className={`absolute w-[300px] sm:w-[400px] md:w-[480px] lg:w-[560px] aspect-square rounded-[24px] sm:rounded-[30px] overflow-hidden cursor-pointer select-none transition-[transform,opacity] duration-500 ease-out ${
                  isMiddle
                    ? "shadow-brand bg-brand-card border-2 border-brand-accent"
                    : "shadow-lg bg-brand-card/40 border border-brand-border/40"
                }`}
                style={{
                  opacity: isMiddle ? 1 : 0.56,
                  transform: `translate3d(${isLeft ? "-62%" : isRight ? "62%" : "0%"}, 0, 0) scale(${isMiddle ? 1 : 0.76})`,
                  zIndex: isMiddle ? 20 : 10,
                }}
              >
                {/* Portrait Image Only - Pure, clean, no text overlays */}
                <div className="relative w-full h-full bg-neutral-950">
                  <img
                    src={item.image}
                    alt={currentLang === "ar"
                      ? `خدمات غادر للسياحة في لبنان، صورة ${idx + 1}`
                      : `Ghader Tourism services in Lebanon, image ${idx + 1}`}
                    className="w-full h-full object-contain object-center select-none pointer-events-none bg-black/95"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width="480"
                    height="480"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-1.5 mt-2 max-w-md mx-auto flex-wrap" dir="ltr">
          {galleryItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? "w-8 bg-brand-accent" : "w-2.5 bg-neutral-800 hover:bg-neutral-700"
              }`}
              aria-label={currentLang === "ar" ? `عرض الصورة ${idx + 1}` : `Show image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
