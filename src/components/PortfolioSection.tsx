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
    if (selectedProject) {
    } else {
    }
    
    return () => {
    };
  }, [selectedProject]);

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

  useEffect(() => {
    if (selectedProject) {
      window.history.pushState({ modalOpen: true }, '');
    }
  }, [selectedProject]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (selectedProject) {
        handleCloseProject(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedProject]);

  const handleCloseProject = (fromPopState = false) => {
    if (!fromPopState && window.history.state?.modalOpen) { 
      window.history.back(); 
    }
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
            <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block animate-opacity-fade">
              FEATURED WORK
            </span>
            <h2 className="font-display font-normal text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight animate-fade-rise">
              Experience the Craft.
            </h2>
            <p className="font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7] max-w-2xl">
              From cinematic edits to promotional content, every project is created with precision, emotion, and purpose.
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
                  decoding="async"
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
                  <span className="font-sans font-normal text-[12px] text-white/60">
                    {proj.category}
                  </span>
                  <span className="font-sans text-white/40 text-[11px] font-light">
                    {proj.date}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-medium text-[22px] text-white group-hover:text-white/80 transition-colors tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="font-sans font-normal text-[14px] text-white/70 line-clamp-1 leading-[1.6]">
                    {proj.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="font-sans text-white/50 text-xs">No project streams are online at this time.</p>
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
          className="fixed inset-0 z-[100] flex flex-col md:justify-center bg-black md:bg-[#0a0e13]/95 backdrop-blur-md overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:pt-0 md:pb-0 md:top-20 md:z-40"
        >
          {/* Top Panel */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-black/40 sticky top-0 z-10 shrink-0 md:static">
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex p-2 rounded-full bg-white/5 border border-white/10">
                <Film className="text-white" size={12} />
              </div>
              <div>
                <h4 className="font-display font-medium text-[16px] md:text-[24px] text-white tracking-tight leading-none line-clamp-1">
                  {selectedProject.title}
                </h4>
                <p className="font-mono text-[8px] md:text-[10px] text-white/40 tracking-widest uppercase hidden md:block">
                  Cinematic Preview // Secure Stream
                </p>
              </div>
            </div>
            
            <button
              onClick={handleCloseProject}
              className="p-3 md:p-2 rounded-full bg-white/10 hover:bg-white/20 md:liquid-glass md:hover:bg-white/10 text-white transition-all cursor-pointer shadow-sm flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <X size={20} className="md:w-[14px] md:h-[14px]" />
            </button>
          </div>

          {/* Player & Details */}
          <div className="max-w-4xl mx-auto w-full p-0 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Player block */}
            <div className="lg:col-span-7 relative md:rounded-xl overflow-hidden md:border border-white/10 bg-black aspect-video shadow-lg w-full max-h-[70vh] md:max-h-none flex items-center shrink-0">
              <video
                ref={videoRef}
                src={selectedProject.videoUrl}
                poster={selectedProject.thumbnail}
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                autoPlay
                preload="metadata"
                playsInline
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
                <span className="font-sans font-normal text-[12px] text-white/60">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-medium text-[28px] text-white tracking-tight leading-none">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="font-sans font-normal text-[15px] text-white/80 leading-[1.7]">
                {selectedProject.description}
              </p>

              <div className="space-y-3.5 pt-4 border-t border-white/10">
                {selectedProject.clientName && (
                  <div className="flex items-center text-white/70">
                    <User size={12} className="text-white/40 mr-2.5" />
                    <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase mr-2">Client:</span>
                    <span className="text-white text-[13px] font-light">{selectedProject.clientName}</span>
                  </div>
                )}
                <div className="flex items-center text-white/70">
                  <Calendar size={12} className="text-white/40 mr-2.5" />
                  <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase mr-2">Date:</span>
                  <span className="text-white text-[13px] font-light">{selectedProject.date}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock size={12} className="text-white/40 mr-2.5" />
                  <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase mr-2">Duration:</span>
                  <span className="text-white text-[13px] font-light">{selectedProject.duration}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <span className="block font-mono font-medium text-[10px] uppercase tracking-[0.15em] text-white/50">
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
