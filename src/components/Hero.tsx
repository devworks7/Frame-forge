import React from "react";
import { ArrowDown, ArrowUpRight, Film } from "lucide-react";
import { SectionContent } from "../types";

interface HeroProps {
  content: SectionContent;
  onOpenRequests: () => void;
}

export default function Hero({ content, onOpenRequests }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 overflow-hidden py-32"
    >
      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto text-center space-y-16 z-10">
        
        {/* Luxury Micro-Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full liquid-glass animate-opacity-fade"
        >
          <span className="font-sans font-medium text-[12px] tracking-[0.3em] text-white/60 uppercase">
            CREATIVE STUDIO
          </span>
        </div>

        {/* Premium High-End Display Typography */}
        <div className="space-y-8">
          <h1
            id="hero-headline"
            className="font-serif text-[42px] sm:text-[56px] md:text-[72px] lg:text-[100px] text-white font-normal leading-[0.95] tracking-[-0.04em] animate-fade-rise"
          >
            We forge <span className="block sm:inline">experiences.</span>
          </h1>
          
          {/* Beautiful supporting text */}
          <p
            id="hero-subheading"
            className="max-w-2xl mx-auto font-sans font-light text-[15px] sm:text-[17px] md:text-[19px] text-white/70 leading-[1.7] tracking-wide animate-opacity-fade"
          >
            Premium websites, cinematic edits, and AI-powered digital experiences designed to build trust and attract more customers.
          </p>
        </div>

        {/* Action Button Grid */}
        <div
          id="hero-actions-container"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-subtle-scale"
        >
          {/* Start Project Proposal Button */}
          <button
            id="hero-cta-start"
            onClick={onOpenRequests}
            className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass hover-lift text-white font-sans font-medium text-[14px] tracking-[0.08em] uppercase flex items-center justify-center space-x-3 interactive cursor-pointer hover:bg-white/10 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Watch Portfolio Button */}
          <button
            id="hero-cta-portfolio"
            onClick={() => scrollToSection("portfolio")}
            className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass hover-lift text-white font-sans font-medium text-[14px] tracking-[0.08em] uppercase flex items-center justify-center space-x-3 interactive cursor-pointer hover:bg-white/10 transition-all duration-300"
          >
            <Film size={13} className="text-zinc-300" />
            <span>Watch Portfolio</span>
          </button>
        </div>
      </div>

      {/* Floating Interactive Scroll Indicator */}
      <div
        id="hero-interactive-indicator"
        onClick={() => scrollToSection("portfolio")}
        className="absolute bottom-12 flex flex-col items-center space-y-3 cursor-pointer group"
      >
        <span className="font-sans font-bold text-[8px] tracking-[0.3em] text-zinc-500 group-hover:text-white uppercase transition-colors duration-300">
          Scroll to explore
        </span>
        <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/15 transition-all duration-300 shadow-sm">
          <ArrowDown size={12} className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
