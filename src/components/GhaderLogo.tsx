import React from "react";

interface GhaderLogoProps {
  className?: string;
  size?: number;
}

export default function GhaderLogo({ className = "w-12 h-12", size = 120 }: GhaderLogoProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} id="ghader-logo-container">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Emblem Circle: Adapts to theme (Charcoal/Black in Dark, White/Silver in Light or customized) */}
        <circle
          cx="100"
          cy="100"
          r="86"
          className="fill-brand-text text-neutral-900 dark:text-neutral-900 transition-colors duration-300"
        />

        {/* Circular Accent Outer Ring */}
        <circle
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-brand-accent/30 text-brand-accent/40"
        />

        {/* Lebanon Map Silhouette in the Center-Right (Filled with Brand Accent Lime/Green) */}
        <g className="text-brand-accent transition-colors duration-300">
          <path
            d="M 94,158 
               C 91,152 89,145 87,138 
               C 85,130 81,124 79,118 
               C 77,112 76,108 79,105 
               C 81,102 85,98 89,94 
               C 93,90 97,85 101,80 
               C 105,75 111,70 117,66 
               C 123,62 129,58 132,56 
               L 134,58 
               C 132,64 130,70 128,76 
               C 126,82 123,88 120,94 
               C 117,100 114,106 111,112 
               C 108,118 104,124 100,130 
               C 96,136 96,144 96,152 
               Z"
            fill="currentColor"
          />
        </g>

        {/* Lebanese Cedar Tree in the Upper-Left (Stylized and Premium White) */}
        <g className="text-white">
          {/* Trunk */}
          <rect x="67.5" y="80" width="3" height="6" fill="currentColor" />
          {/* Bottom Branch Layer */}
          <polygon points="69,80 54,80 84,80" fill="currentColor" />
          <polygon points="69,76 56,76 82,76" fill="currentColor" />
          {/* Middle Branch Layer */}
          <polygon points="69,72 58,72 80,72" fill="currentColor" />
          <polygon points="69,68 60,68 78,68" fill="currentColor" />
          {/* Top Branch Layer */}
          <polygon points="69,64 62,64 76,64" fill="currentColor" />
          <polygon points="69,60 65,60 73,60" fill="currentColor" />
        </g>

        {/* Swoosh Flight/Travel Trail looping from Bottom-Left underneath the map */}
        <path
          d="M 28,115 
             C 24,135 38,162 65,166 
             C 90,168 118,154 138,124 
             C 148,110 156,95 165,82 
             L 161,79 
             C 152,92 144,106 134,120 
             C 116,146 90,158 66,156 
             C 44,154 32,132 35,115 
             Z"
          className="fill-brand-accent transition-colors duration-300"
        />

        {/* Monogram GT embedded inside the map (High-Contrast Black in dark/light, adapts) */}
        <g className="text-neutral-950 select-none">
          {/* The G */}
          <text
            x="106"
            y="108"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="26"
            textAnchor="middle"
            letterSpacing="-2"
            fill="currentColor"
          >
            G
          </text>
          {/* Overlapping stylized T */}
          <text
            x="119"
            y="110"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            textAnchor="middle"
            fill="currentColor"
          >
            T
          </text>
        </g>

        {/* Airplane Flying towards Top-Right (Rotated top-down design) */}
        <g transform="translate(156, 73) rotate(-38)" className="text-white">
          {/* Fuselage */}
          <path d="M -16,-2 L 8,-2 C 12,-2 15,0 15,0 C 15,0 12,2 8,2 L -16,2 Z" fill="currentColor" />
          {/* Swept wings */}
          <path d="M -2,-2 L -11,-15 L -6,-15 L 3,-2 Z" fill="currentColor" />
          <path d="M -2,2 L -11,15 L -6,15 L 3,2 Z" fill="currentColor" />
          {/* Tail stabilizers */}
          <path d="M -12,-2 L -15,-6 L -13,-6 L -10,-2 Z" fill="currentColor" />
          <path d="M -12,2 L -15,6 L -13,6 L -10,2 Z" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
