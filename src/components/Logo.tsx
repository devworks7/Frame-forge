import React, { useState, useEffect } from "react";
import { getSectionContent } from "../lib/dataService";

interface LogoProps {
  className?: string;
  size?: number; // Size of the icon
  showText?: boolean;
  variant?: "light" | "dark";
  src?: string; // Optional direct image source
}

export default function Logo({
  className = "",
  size = 40,
  showText = true,
  variant = "light",
  src,
}: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(src || null);

  useEffect(() => {
    if (src !== undefined) {
      setLogoUrl(src || null);
      return;
    }

    // Self-contained dynamic fetch as fallback
    let isMounted = true;
    async function fetchLogo() {
      try {
        const content = await getSectionContent();
        if (isMounted && content && content.logoUrl) {
          setLogoUrl(content.logoUrl);
        }
      } catch (err) {
      }
    }
    fetchLogo();

    return () => {
      isMounted = false;
    };
  }, [src]);

  // Define colors based on variant
  // Logo colors: Gold (#C8A96A), Dark Charcoal (#2C2A29) or white in dark mode
  const gold = "#FFFFFF"; // Changed to white for ultra-minimal look
  const darkCharcoal = "#FFFFFF"; // Always white for dark cinematic theme
  const squareColor = "#666666"; // Muted grey for state squares

  if (logoUrl) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src={logoUrl}
          alt="Frame Forge Studios Logo"
          style={{ width: size, height: size, objectFit: "contain" }}
          className="shrink-0 rounded-lg"
          referrerPolicy="no-referrer"
        />
        {showText && (
          <div className="flex flex-col">
            <span
              className="font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase text-white transition-colors duration-300"
            >
              FRAME FORGE
            </span>
            <span
              className="font-mono font-medium text-[7px] tracking-[0.45em] uppercase text-white/50"
            >
              STUDIOS
            </span>
          </div>
        )}
      </div>
    );
  }

  // Beautiful visual geometry vector SVG fallback when no uploaded image exists
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="goldGradient" x1="20" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>
          <linearGradient id="charcoalGradient" x1="60" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#71717A" />
          </linearGradient>
        </defs>

        {/* --- LEFT ORNAMENT (GOLD BUTTERFLY/LEAF) --- */}
        {/* Upper Outer Petal */}
        <path
          d="M 52,50 C 50,30 35,20 40,15 C 45,10 55,20 56,38 C 57,48 54,51 52,50 Z"
          fill="url(#goldGradient)"
          opacity="0.9"
        />
        {/* Upper Inner Leaf Accent */}
        <path
          d="M 50,42 C 48,32 39,26 42,23 C 44,20 50,26 51,36 C 52,41 51,43 50,42 Z"
          fill="#FFF"
          opacity="0.15"
        />
        {/* Middle Left Wing */}
        <path
          d="M 48,56 C 25,50 18,30 25,25 C 32,20 45,35 48,48 C 49.5,54 49,57 48,56 Z"
          fill="url(#goldGradient)"
        />
        {/* Lower Wing Accent */}
        <path
          d="M 46,62 C 28,68 25,82 35,85 C 45,88 48,74 46,66 C 45,62 45.5,61 46,62 Z"
          fill="url(#goldGradient)"
          opacity="0.85"
        />
        {/* Decorative Golden Swoosh/Filigree Curve */}
        <path
          d="M 45,64 C 40,78 45,95 53,95 C 61,95 49,85 47,75"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Central stem divider */}
        <path
          d="M 54,32 C 55,48 53,65 52,88"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- RIGHT ORNAMENT (STYLED F-LETTER) --- */}
        {/* Upper F Ribbon Segment */}
        <path
          d="M 56,40 C 58,30 68,20 90,20 L 105,20 C 105,20 95,25 90,32 C 85,39 80,48 80,48 L 56,48 Z"
          fill="url(#charcoalGradient)"
        />
        {/* F Middle Horizontal Arm Ribbon */}
        <path
          d="M 56,52 L 102,52 C 102,52 94,57 90,62 C 86,67 80,72 80,72 L 56,72 Z"
          fill="url(#charcoalGradient)"
          opacity="0.95"
        />
        {/* F Vertical Backbone / Base Ribbon with folded overlay look */}
        <path
          d="M 56,40 C 56,40 60,60 60,82 C 60,94 65,102 70,102 L 60,102 C 55,90 54,70 54,40 Z"
          fill="url(#charcoalGradient)"
          opacity="0.9"
        />

        {/* Three Status Squares under the horizontal arm */}
        <rect x="76" y="80" width="4.5" height="4.5" fill={squareColor} />
        <rect x="76" y="89" width="4.5" height="4.5" fill={squareColor} />
        <rect x="76" y="98" width="4.5" height="4.5" fill={squareColor} />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className="font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase text-white transition-colors duration-300"
          >
            FRAME FORGE
          </span>
          <span
            className="font-mono font-medium text-[7px] tracking-[0.45em] uppercase text-white/50"
          >
            STUDIOS
          </span>
        </div>
      )}
    </div>
  );
}
