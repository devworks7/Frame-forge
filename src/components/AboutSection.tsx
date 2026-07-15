import React from "react";
import { SectionContent } from "../types";

interface AboutProps {
  content: SectionContent;
}

export default function AboutSection({ content }: AboutProps) {
  return (
    <section
      id="about"
      className="relative py-32 sm:py-40 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Large Statement Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
            <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block">
              ABOUT THE STUDIO
            </span>
            <h2 className="font-display font-normal text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight">
              {content.aboutTitle || "A bespoke post-production house built for leaders."}
            </h2>
          </div>
          
          <div className="space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl mx-auto lg:mx-0">
            <p className="font-sans italic text-[22px] sm:text-[26px] text-white/90 leading-[1.6]">
              {content.aboutQuote || '"Every project starts with a fresh idea—not a template. From cinematic edits to modern websites, everything is designed to reflect your brand and help it stand out."'}
            </p>
            <p className="font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7]">
              {content.aboutText || "Frame Forge is a creative studio focused on crafting premium websites, cinematic edits, and digital experiences that help businesses stand out. We combine modern design, thoughtful storytelling, and AI-powered workflows to create work that looks professional, builds trust, and leaves a lasting impression. Every project is approached with attention to detail, ensuring a polished result that reflects your brand with confidence."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
