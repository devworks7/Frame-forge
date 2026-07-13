import React, { useState, useEffect } from "react";
import { ArrowUp, Sparkles, Mail, ShieldAlert, Star } from "lucide-react";
import ThreeBackground from "./components/ThreeBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import PricingDocuments from "./components/PricingDocuments";
import ClientRequestPage from "./components/ClientRequestPage";
import AdminPanel from "./components/AdminPanel";

import { SectionContent } from "./types";
import {
  checkInitialSeed,
  getSectionContent,
  incrementAnalytics,
  logActivity
} from "./lib/dataService";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "pricing">("home");
  const [showRequests, setShowRequests] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteContent, setSiteContent] = useState<SectionContent | null>(null);

  // Loading Screen Counter
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);

  // Scroll to Top state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Cookie Consent banner state
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // Initialize and Seed Firestore on Mount
  useEffect(() => {
    async function init() {
      await checkInitialSeed();
      const c = await getSectionContent();
      setSiteContent(c);

      await incrementAnalytics("totalVisitors");
      await logActivity("visit", "A visitor entered the creative studio.");

      if (!localStorage.getItem("ff_cookies_accepted")) {
        setShowCookieConsent(true);
      }

      // Preload critical background video
      const preloadVideo = () => {
        return new Promise<void>((resolve) => {
          const video = document.createElement("video");
          video.src = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";
          video.preload = "auto";
          video.muted = true;
          video.playsInline = true;

          const done = () => {
            video.removeEventListener("canplaythrough", done);
            video.removeEventListener("error", done);
            setIsVideoPreloaded(true);
            resolve();
          };

          video.addEventListener("canplaythrough", done);
          video.addEventListener("error", done);

          if (video.readyState >= 3) {
            done();
          }

          // Safety timeout of 2 seconds so the loader never hangs
          setTimeout(done, 2000);
        });
      };
      preloadVideo();

      // Restore active admin sessions on mount
      const adminToken = localStorage.getItem("ff_admin_token");
      if (adminToken) {
        try {
          const res = await fetch("/api/admin/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: adminToken }),
          });
          const d = await res.json();
          if (d.valid) {
            setIsAdminLoggedIn(true);
          } else {
            localStorage.removeItem("ff_admin_token");
          }
        } catch (e) {
          console.error("Session validation error on app load:", e);
        }
      }
    }
    init();
  }, []);

  // Check for admin query parameter or hash to open console automatically
  useEffect(() => {
    const checkAdminParam = () => {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("admin") === "true" || window.location.hash === "#admin") {
        setShowAdmin(true);
      }
    };
    checkAdminParam();
    window.addEventListener("hashchange", checkAdminParam);
    return () => window.removeEventListener("hashchange", checkAdminParam);
  }, []);

  // Cinematic countdown loader simulation
  useEffect(() => {
    if (loadProgress < 100) {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          const step = Math.floor(Math.random() * 15) + 5;
          const next = prev + step;
          return next > 100 ? 100 : next;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [loadProgress]);

  // Handle transition immediately when loader is complete and critical assets/data are ready
  useEffect(() => {
    if (loadProgress === 100 && siteContent !== null && isVideoPreloaded) {
      setIsLoading(false);
    }
  }, [loadProgress, siteContent, isVideoPreloaded]);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("ff_cookies_accepted", "true");
    setShowCookieConsent(false);
  };

  const handlePageChange = (page: "home" | "pricing" | "proposal") => {
    if (page === "proposal") {
      setShowRequests(true);
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div id="cinematic-loader" className="fixed inset-0 bg-[#070b0e] flex flex-col justify-center items-center z-50">
        <div className="space-y-8 max-w-sm w-full text-center px-6">
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center p-[1px] mb-2 shadow-sm animate-spin-slow">
              <div className="w-full h-full bg-[#070b0e] rounded-full flex items-center justify-center">
                <span className="font-sans font-medium text-white text-[12px]">FF</span>
              </div>
            </div>
            <span className="font-sans font-medium text-[18px] tracking-[0.16em] text-white uppercase">
              FRAME FORGE
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
              CREATIVE POST-PRODUCTION // LOADING
            </span>
          </div>

          {/* Luxury Progress Bar */}
          <div className="h-[1px] w-full bg-zinc-900 rounded-full overflow-hidden relative">
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <span>ALIGNING_PIXELS...</span>
            <span className="text-white font-medium">{loadProgress}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b0e] text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Absolute Viewport Background Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-35"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
        {/* Ambient overlay to ensure perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b0e]/80 via-transparent to-[#070b0e]/95" />
      </div>

      {/* 3D background floating nodes */}
      <ThreeBackground />

      {/* Custom elegant cursor */}
      <CustomCursor />

      {/* Floating Widgets */}
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full liquid-glass border border-white/10 text-white hover:text-zinc-300 shadow-lg z-30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer interactive bg-[#070b0e]/40"
          title="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Quick Action Email Button (Refined Liquid Glass look) */}
      <a
        href={`mailto:${siteContent?.contactEmail || "frameforgestudios.001@gmail.com"}`}
        className="fixed bottom-6 left-6 p-3.5 rounded-full liquid-glass border border-white/10 text-white hover:text-zinc-300 shadow-lg z-30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer interactive flex items-center justify-center bg-[#070b0e]/40"
        title="Direct Email to Studio"
      >
        <Mail size={16} />
      </a>

      {/* Cookie Consent Toast */}
      {showCookieConsent && (
        <div
          id="cookie-consent-toast"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2rem)] p-6 rounded-xl liquid-glass border border-white/10 shadow-xl z-40 space-y-4 bg-[#070b0e]/90"
        >
          <div className="flex items-start space-x-3.5 leading-relaxed text-white/70">
            <Sparkles size={16} className="text-white/40 shrink-0 mt-0.5" />
            <p className="font-sans font-light text-[13px] leading-[1.6]">
              We appreciate privacy. Frame Forge uses essential cookies to authenticate administrators and secure project video playback streams. By navigating further, you assent to these parameters.
            </p>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={handleAcceptCookies}
              className="px-5 py-2.5 rounded-full liquid-glass border border-white/15 text-white font-sans font-medium uppercase tracking-[0.08em] text-[11px] hover:bg-white/10 transition-all cursor-pointer interactive shadow-sm"
            >
              Assent Parameters
            </button>
          </div>
        </div>
      )}

      {/* Main sticky navigation header */}
      <Navbar
        onOpenRequests={() => setShowRequests(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={() => {
          localStorage.removeItem("ff_admin_token");
          setIsAdminLoggedIn(false);
          logActivity("visit", "Admin disconnected session.");
        }}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        onCloseVideo={() => window.dispatchEvent(new CustomEvent("close-video"))}
      />

      {/* Core Pages Routing layout */}
      <main id="main-content-flow" className="relative z-10">
        {currentPage === "home" ? (
          /* HOMEPAGE - LANDING EXPERIENCE */
          siteContent && (
            <div className="space-y-0">
              <Hero content={siteContent} onOpenRequests={() => setShowRequests(true)} />
              <PortfolioSection />
              <ServicesSection />
              <AboutSection content={siteContent} />
              <ContactSection content={siteContent} />
            </div>
          )
        ) : (
          /* PRICING & DOCUMENTS PAGE */
          <PricingDocuments />
        )}
      </main>

      {/* Modals & Overlays portals */}
      {showRequests && <ClientRequestPage onClose={() => setShowRequests(false)} />}
      
      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          onLoginStateChange={(status) => {
            setIsAdminLoggedIn(status);
            getSectionContent().then((c) => setSiteContent(c));
          }}
        />
      )}

      {/* Beautiful styled Footer */}
      <footer id="main-footer" className="relative border-t border-white/5 bg-transparent py-16 px-6 text-white/40 z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <Logo size={42} showText={true} variant="light" />
            <span className="font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/40 mt-1.5">
              Bespoke Video Post-Production & VFX
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[12px] uppercase font-sans font-medium tracking-[0.08em] text-white/50">
            <a href="#about" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-white transition-colors">Terms & NDA</a>
            <a href="#services" className="hover:text-white transition-colors">Licensing guidelines</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="font-mono text-[11px] text-white/30">
              © {new Date().getFullYear()} FRAME FORGE STUDIO. ALL RIGHTS RESERVED.
            </div>
            <button
              id="footer-admin-trigger"
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-1.5 font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/40 hover:text-white transition-all cursor-pointer interactive group"
            >
              <ShieldAlert size={11} className="text-white/40 group-hover:text-white transition-colors" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
