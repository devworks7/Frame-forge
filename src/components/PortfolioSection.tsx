import React, { useState, useEffect, useRef } from "react";
import { Play, Calendar, User, Clock, Film, X, ShieldAlert } from "lucide-react";
import { PortfolioItem } from "../types.js";
import { getPortfolioItems, incrementAnalytics, logActivity } from "../lib/dataService.js";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getPortfolioItems();
      setProjects(data);
    }
    load();
  }, []);

  useEffect(() => {
    const handleCloseVideo = () => {
      setSelectedProject(null);
    };
    window.addEventListener("close-video", handleCloseVideo);
    return () => window.removeEventListener("close-video", handleCloseVideo);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseProject();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleOpenProject = async (proj: PortfolioItem) => {
    setSelectedProject(proj);
    await incrementAnalytics("videoViews");
    await logActivity("video_view", `Watched video stream: "${proj.title}"`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const preventShortcuts = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey && e.key === "s") || e.key === "s") {
      e.preventDefault();
    }
  };

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="portfolio"
      className="relative py-36 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div id="portfolio-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-6">
            <span className="font-sans font-medium text-[12px] tracking-[0.12em] text-white/50 uppercase block animate-opacity-fade">
              FEATURED WORK
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight animate-fade-rise">
              Experience the Craft.
            </h2>
            <p className="font-sans font-light text-white/70 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.7] max-w-2xl">
              Explore featured edits and creative projects crafted for brands, creators, and businesses.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          id="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className="liquid-glass hover-lift group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/5"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-zinc-950 rounded-t-xl">
                <img
                  src={proj.thumbnail || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80"}
                  alt={proj.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Overlay Play Indicator */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3.5 rounded-full liquid-glass shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="text-white fill-white" size={14} />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2.5 right-2.5 font-mono text-[10px] px-2 py-0.5 rounded border border-white/10 bg-black/75 text-white tracking-[0.08em] uppercase">
                  {proj.duration}
                </span>
              </div>

              {/* Text Meta info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-medium text-[12px] text-white/50 tracking-[0.08em] uppercase">
                    {proj.category}
                  </span>
                  <span className="font-sans text-white/40 text-[11px] font-light">
                    {proj.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-medium text-[15px] text-white group-hover:text-white/80 transition-colors uppercase tracking-[0.08em]">
                    {proj.title}
                  </h3>
                  <p className="font-sans font-light text-[14px] text-white/70 line-clamp-1 leading-[1.6]">
                    {proj.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="font-sans text-zinc-500 text-xs">No project streams are online at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {selectedProject && (
        <div
          id="secure-player-modal"
          onContextMenu={preventContextMenu}
          onKeyDown={preventShortcuts}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseProject();
            }
          }}
          tabIndex={0}
          className="fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col justify-center bg-[#0a0e13]/95 backdrop-blur-md overflow-y-auto"
        >
          {/* Top Panel */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/5 border border-white/10">
                <Film className="text-white" size={12} />
              </div>
              <div>
                <h4 className="font-sans font-medium text-[14px] text-white uppercase tracking-[0.08em]">
                  {selectedProject.title}
                </h4>
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  Cinematic Preview // Secure Stream
                </p>
              </div>
            </div>
            
            <button
              onClick={handleCloseProject}
              className="p-2 rounded-full liquid-glass hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <X size={14} />
            </button>
          </div>

          {/* Player & Details */}
          <div className="max-w-4xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Player block */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video shadow-lg">
              <video
                ref={videoRef}
                src={selectedProject.videoUrl}
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                autoPlay
                onContextMenu={preventContextMenu}
                className="w-full h-full object-contain"
                id="secure-raw-video"
              >
                Your browser does not support HTML5 video streaming.
              </video>

              {/* Watermark Overlay */}
              <div className="absolute top-4 left-4 pointer-events-none opacity-20 select-none">
                <span className="font-mono text-[7px] tracking-widest text-white uppercase bg-black/80 px-2 py-0.5 rounded border border-white/5">
                  FRAME FORGE DIRECT STREAM
                </span>
              </div>
            </div>

            {/* Meta Column */}
            <div className="lg:col-span-5 space-y-6 liquid-glass border border-white/10 p-6 rounded-xl shadow-lg bg-[#070b0e]/80">
              <div className="space-y-1">
                <span className="font-sans font-medium text-[12px] text-white/50 tracking-[0.08em] uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="font-sans font-medium text-[18px] text-white uppercase tracking-[0.08em]">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="font-sans font-light text-[14px] text-white/70 leading-[1.6]">
                {selectedProject.description}
              </p>

              <div className="space-y-3.5 pt-4 border-t border-white/10">
                {selectedProject.clientName && (
                  <div className="flex items-center text-white/70">
                    <User size={12} className="text-white/40 mr-2.5" />
                    <span className="font-sans font-medium text-[11px] text-white/50 uppercase tracking-[0.08em] mr-2">Client:</span>
                    <span className="text-white text-[13px] font-light">{selectedProject.clientName}</span>
                  </div>
                )}
                <div className="flex items-center text-white/70">
                  <Calendar size={12} className="text-white/40 mr-2.5" />
                  <span className="font-sans font-medium text-[11px] text-white/50 uppercase tracking-[0.08em] mr-2">Date:</span>
                  <span className="text-white text-[13px] font-light">{selectedProject.date}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock size={12} className="text-white/40 mr-2.5" />
                  <span className="font-sans font-medium text-[11px] text-white/50 uppercase tracking-[0.08em] mr-2">Duration:</span>
                  <span className="text-white text-[13px] font-light">{selectedProject.duration}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <span className="block font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/50">
                  Production Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.softwareUsed.map((sw, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded border border-white/5 bg-white/5 text-white/70"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Protection notice */}
              <div className="flex items-start space-x-2.5 p-3 rounded bg-white/5 border border-white/5 text-[11px] text-white/50 leading-relaxed">
                <ShieldAlert size={14} className="text-white/40 shrink-0 mt-0.5" />
                <span>
                  Bilateral NDA protected master stream. Direct copying is strictly prohibited.
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
