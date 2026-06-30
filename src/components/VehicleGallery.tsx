import React from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Language } from "../types";

interface GalleryItem {
  id: string;
  // Path for portrait image (aspect ratio 3:4)
  image: string;
}

// 10+ placeholder items that map to user's desired uploads or premium high-quality backdrops
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_1.jpg")
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g2",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_2.jpg")
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g3",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_3.jpg")
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g4",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_4.jpg")
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g5",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_5.jpg")
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g6",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_6.jpg")
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g7",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_7.jpg")
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g8",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_8.jpg")
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g9",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_9.jpg")
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600&h=900"
  },
  {
    id: "g10",
    // USER CONFIGURATION: Replace with your uploaded portrait image path (e.g., "/src/assets/images/gallery_portrait_10.jpg")
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600&h=900"
  }
];

interface VehicleGalleryProps {
  currentLang: Language;
}

export default function VehicleGallery({ currentLang }: VehicleGalleryProps) {
  const [activeIdx, setActiveIdx] = React.useState<number>(1); // Start with second item active
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
    <div className="py-2 overflow-hidden" id="vehicle-portrait-gallery">
      {/* 3D-Style Portrait Carousel Gallery with expanded width */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Carousel Tracks */}
        <div className="flex justify-center items-center h-[460px] md:h-[600px] relative w-full overflow-visible">
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
                className={`absolute w-[260px] md:w-[380px] aspect-[3/4.5] rounded-[36px] overflow-hidden cursor-pointer select-none ${
                  isMiddle
                    ? "shadow-brand bg-brand-card border-2 border-brand-accent"
                    : "shadow-lg bg-brand-card/40 border border-brand-border/40"
                }`}
                style={{
                  pointerEvents: isHidden ? "none" : "auto"
                }}
                animate={{
                  scale: isMiddle ? 1.05 : isHidden ? 0.6 : 0.82,
                  opacity: isMiddle ? 1 : isHidden ? 0 : 0.45,
                  x: isLeft ? "-55%" : isRight ? "55%" : "0%",
                  rotateY: isLeft ? 12 : isRight ? -12 : 0,
                  y: isMiddle ? -12 : 12,
                  zIndex: isMiddle ? 20 : isHidden ? 0 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                {/* Portrait Image Only - Pure, clean, no text overlays */}
                <div className="relative w-full h-full bg-neutral-900">
                  <img
                    src={item.image}
                    alt={`Vehicle portrait ${idx + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Camera / Path Info Badge for User on Hover */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-300 opacity-0 hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20">
                    <Camera className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Path: /src/assets/images/gallery_portrait_{idx + 1}.jpg</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-1.5 mt-6 max-w-md mx-auto flex-wrap" dir="ltr">
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
