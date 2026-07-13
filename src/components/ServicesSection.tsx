import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Film, Layers, Sparkles, Boxes, Palette, Target, Sparkle, ArrowRight, X } from "lucide-react";
import { getServices } from "../lib/dataService.js";
import { ServiceItem } from "../types.js";

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getServices();
        // Sort by order
        const sorted = [...data].sort((a, b) => a.order - b.order);
        setServices(sorted);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getIcon = (iconName: string) => {
    const iconClass = "text-zinc-300";
    const size = 16;
    switch (iconName) {
      case "Film": return <Film className={iconClass} size={size} />;
      case "Layers": return <Layers className={iconClass} size={size} />;
      case "Sparkles": return <Sparkles className={iconClass} size={size} />;
      case "Boxes": return <Boxes className={iconClass} size={size} />;
      case "Target": return <Target className={iconClass} size={size} />;
      case "Palette": return <Palette className={iconClass} size={size} />;
      default: return <Sparkle className={iconClass} size={size} />;
    }
  };

  if (loading) {
    return (
      <section id="services" className="relative py-36 px-6 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-5 h-5 border border-zinc-500 border-t-white rounded-full animate-spin" />
          <p className="font-sans font-bold text-[9px] uppercase tracking-[0.25em] text-zinc-500">Loading Capabilities...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative py-36 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div id="services-header" className="text-center max-w-2xl mx-auto space-y-6">
          <span className="font-sans font-medium text-[12px] tracking-[0.12em] text-white/50 uppercase block animate-opacity-fade">
            CORE SERVICES
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight animate-fade-rise">
            Creative Capabilities
          </h2>
          <p className="font-sans font-light text-white/70 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.7] tracking-wide">
            From offline cuts to 3D simulation, we design every stage of post-production. Click any service to explore details.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const isExpanded = expandedId === srv.id;
            return (
              <motion.div
                key={srv.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                className={`liquid-glass hover-lift rounded-xl p-6 transition-all duration-300 cursor-pointer overflow-hidden select-none group border border-white/5 ${
                  isExpanded ? "bg-white/[0.04] ring-1 ring-white/20" : ""
                }`}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-full bg-white/5 border border-white/10">
                      {getIcon(srv.iconName)}
                    </div>
                    <span className="font-sans font-medium text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/60 uppercase tracking-[0.08em]">
                      {srv.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-medium text-[15px] text-white uppercase tracking-[0.08em] group-hover:text-white/80 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="font-sans font-light text-[14px] text-white/70 leading-[1.6]">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <span className="font-sans font-medium text-[11px] text-white/50 tracking-[0.08em] uppercase group-hover:text-white transition-colors">
                      {isExpanded ? "Viewing details" : "Click to expand"}
                    </span>
                    <ArrowRight size={10} className={`text-white/50 transition-transform duration-300 ${isExpanded ? "rotate-90 text-white" : "group-hover:translate-x-1"}`} />
                  </div>

                  {/* Pop-open description details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="border-t border-white/5 pt-4 mt-2"
                        onClick={(e) => e.stopPropagation()} // Prevent double trigger
                      >
                        <p className="font-sans font-light text-[13px] text-white/90 leading-[1.6] bg-white/5 p-3 rounded-lg border border-white/5 italic">
                          "{srv.fullDescription}"
                        </p>
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setExpandedId(null)}
                            className="font-sans font-medium text-[11px] text-white/50 tracking-[0.08em] uppercase flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                          >
                            Collapse Details <X size={10} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
