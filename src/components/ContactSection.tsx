import React from "react";
import { Mail, Instagram, Linkedin, MapPin, Clock } from "lucide-react";
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
        <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Channel Cards (col-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
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
                {/* LinkedIn */}
                <a
                  href={content.contactLinkedIn || "https://linkedin.com/company/frameforge"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full liquid-glass border border-white/10 text-white/60 hover:text-white transition-all hover-lift cursor-pointer"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>

          </div>

          {/* Premium styled visual HQ location panel */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl liquid-glass border border-white/5 space-y-6 relative overflow-hidden">
            
            {/* Visual Vector Grid representing HQ */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-white/5 bg-zinc-950/40 flex items-center justify-center">
              {/* Coordinate matrix background */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px"
                }}
              />
              
              {/* Elegant minimal lines */}
              <svg className="absolute inset-0 w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="40%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="1" />
                
                <circle cx="60%" cy="40%" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                <circle cx="60%" cy="40%" r="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none" />
              </svg>

              {/* Glowing Landmark Node */}
              <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20" />
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg">
                    <MapPin size={11} />
                  </div>
                </div>
                <span className="font-sans font-medium text-[10px] tracking-[0.08em] text-white uppercase bg-zinc-900 px-2.5 py-1 rounded border border-white/10 shadow-lg">
                  FRAME FORGE HQ
                </span>
              </div>

              {/* Coordinates */}
              <div className="absolute bottom-4 right-4 font-mono text-[7px] text-zinc-500 text-right">
                <span>LAT: 48.8566° N</span><br />
                <span>LON: 2.3522° E</span><br />
                <span>PARIS, FRANCE</span>
              </div>
            </div>

            {/* Location & business hours labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-6">
              <div className="space-y-1">
                <div className="flex items-center text-white/50">
                  <MapPin size={12} className="mr-2" />
                  <span className="font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white">Location HQ</span>
                </div>
                <p className="font-sans text-white/70 leading-[1.6] text-[13px] font-light">
                  {content.contactLocation || "8 Rue Royale, 75008 Paris, France"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-white/50">
                  <Clock size={12} className="mr-2" />
                  <span className="font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white">Studio Hours</span>
                </div>
                <p className="font-sans text-white/70 leading-[1.6] text-[13px] font-light">
                  {content.contactBusinessHours || "Mon - Fri: 09:00 - 18:00 CET"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
