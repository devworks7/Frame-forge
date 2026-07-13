import React from "react";
import { ShieldCheck, UserCheck, ShieldAlert, Sparkles } from "lucide-react";
import Logo from "./Logo.js";

interface NavbarProps {
  onOpenRequests: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  currentPage: "home" | "pricing" | "proposal";
  setCurrentPage: (page: "home" | "pricing" | "proposal") => void;
  onCloseVideo?: () => void;
}

export default function Navbar({
  onOpenRequests,
  onOpenAdmin,
  isAdminLoggedIn,
  onLogoutAdmin,
  currentPage,
  setCurrentPage,
  onCloseVideo,
}: NavbarProps) {
  const scrollToSection = (id: string) => {
    onCloseVideo?.();
    setCurrentPage("home");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <nav
        id="main-navbar"
        className="liquid-glass rounded-full px-6 sm:px-8 py-3 w-full transition-all duration-300"
      >
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo & Slogan */}
          <div
            id="brand-logo-container"
            onClick={() => {
              onCloseVideo?.();
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer group hover:opacity-90 transition-all"
          >
            <Logo size={36} showText={true} variant="dark" />
          </div>

          {/* Navigation Links */}
          <div id="nav-links-wrapper" className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                onCloseVideo?.();
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-sans font-medium text-[14px] uppercase tracking-[0.12em] transition-colors duration-300 cursor-pointer ${
                currentPage === "home" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="font-sans font-medium text-[14px] uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="font-sans font-medium text-[14px] uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => {
                onCloseVideo?.();
                setCurrentPage("pricing");
              }}
              className={`font-sans font-medium text-[14px] uppercase tracking-[0.12em] transition-colors duration-300 cursor-pointer ${
                currentPage === "pricing" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-sans font-medium text-[14px] uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Nav CTAs & Admin Actions */}
          <div id="nav-actions" className="flex items-center space-x-4">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  id="navbar-admin-btn"
                  onClick={() => {
                    onCloseVideo?.();
                    onOpenAdmin();
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full liquid-glass text-white text-[10px] font-mono transition-all duration-300 interactive cursor-pointer hover:bg-white/10"
                >
                  <ShieldAlert size={12} className="text-zinc-300" />
                  <span>CONSOLE</span>
                </button>
                <button
                  id="navbar-logout-btn"
                  onClick={() => {
                    onCloseVideo?.();
                    onLogoutAdmin();
                  }}
                  className="px-3 py-1.5 rounded-full bg-red-950/20 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-[10px] font-mono transition-all duration-300 interactive cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            ) : null}

            <button
              id="navbar-cta-start-project"
              onClick={() => {
                onCloseVideo?.();
                onOpenRequests();
              }}
              className="liquid-glass hover-lift px-6 py-3 rounded-full text-white font-sans font-medium text-[14px] tracking-[0.08em] uppercase hover:bg-white/10 transition-all duration-300 interactive cursor-pointer"
            >
              Start Project
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
