import React from "react";
import { SectionContent } from "../types";

interface AboutProps {
  content: SectionContent;
}

export default function AboutSection({ content }: AboutProps) {
  return (
    <section
      id="about"
      className="relative py-36 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Large Statement Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans font-medium text-[12px] tracking-[0.12em] text-white/50 uppercase block">
              ABOUT THE STUDIO
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight">
              A bespoke post-production house built for leaders.
            </h2>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <p className="font-serif italic text-[18px] sm:text-[22px] md:text-[26px] text-white/90 leading-[1.4] font-normal">
              "We don't believe in templates. Every single frame, motion graphic, or 3D element we craft is tailored to articulate your brand's unique standard."
            </p>
            <p className="font-sans font-light text-white/70 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.7] tracking-wide">
              {content.aboutText || "Based in Paris and serving clients globally, Frame Forge is a boutique creative agency trusted by luxury brands to engineer premium video assets, pristine color grading, and hyper-realistic product animations."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
