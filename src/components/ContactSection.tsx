import React from "react";
import { Mail, Instagram } from "lucide-react";
import { SectionContent } from "../types.js";

interface ContactProps {
  content: SectionContent;
}

export default function ContactSection({ content }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative py-36 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div id="contact-header" className="text-center max-w-2xl mx-auto space-y-6">
          <span className="font-sans font-medium text-[12px] tracking-[0.12em] text-white/50 uppercase block animate-opacity-fade">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight animate-fade-rise">
            Connect With Us
          </h2>
          <p className="font-sans font-light text-white/70 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.7] max-w-2xl mx-auto">
            Ready to elevate your project? Reach out to our directors via any channel below to initiate alignment.
          </p>
        </div>

        {/* Info Blocks Grid */}
        <div id="contact-grid" className="max-w-lg mx-auto w-full flex flex-col justify-between gap-6">
          
          {/* Channel Cards (col-5) */}
          <div className="flex flex-col justify-between gap-6">
            
            {/* Standard Contact Methods */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${content.contactEmail || "frameforgestudios.001@gmail.com"}`}
                className="group flex items-center p-6 sm:p-8 rounded-xl liquid-glass border border-white/5 hover:bg-white/[0.04] transition-all duration-300 hover-lift"
              >
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 text-white mr-5 transition-colors">
                  <Mail size={18} />
                </div>
                <div className="space-y-1.5">
                  <span className="block font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/50">
                    Direct Email
                  </span>
                  <span className="block font-sans font-light text-[15px] sm:text-[17px] text-white group-hover:text-white/80 transition-colors break-all">
                    {content.contactEmail || "frameforgestudios.001@gmail.com"}
                  </span>
                </div>
              </a>
            </div>

            {/* Social Links Strip */}
            <div className="p-6 rounded-xl liquid-glass border border-white/5 space-y-4">
              <span className="block font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/50">
                Social Presence
              </span>
              <div className="flex items-center space-x-3">
                {/* Instagram */}
                <a
                  href={content.contactInstagram || "https://instagram.com/frameforge"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full liquid-glass border border-white/10 text-white/60 hover:text-white transition-all hover-lift cursor-pointer"
                >
                  <Instagram size={14} />
                </a>
                
              </div>
            </div>

          </div>

          </div>
      </div>
    </section>
  );
}
