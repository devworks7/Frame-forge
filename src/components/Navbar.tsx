import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, UserCheck, ShieldAlert, Sparkles, Mail } from "lucide-react";
import Logo from "./Logo.js";
import { motion, AnimatePresence } from "motion/react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      handleClose();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleClose = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      hamburgerRef.current?.focus();
    }, 50);
  };

  // Prevent background scrolling on open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Click outside to close menu
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Focus trapping while menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const focusableElementsString = 'button, a, [tabindex="0"]';
    const focusableElements = menuRef.current?.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
    if (!focusableElements || focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Focus first element initially
    firstFocusableElement.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Home", action: "home" },
    { label: "Work", action: "portfolio" },
    { label: "Services", action: "services" },
    { label: "About", action: "about" },
    { label: "Pricing", action: "pricing" },
    { label: "Contact", action: "contact" }
  ];

  const handleNavItemClick = (item: typeof navItems[0]) => {
    onCloseVideo?.();
    setIsMobileMenuOpen(false);

    if (item.action === "home") {
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.action === "pricing") {
      setCurrentPage("pricing");
    } else {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(item.action);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  // Framer Motion Overlay Variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: "afterChildren",
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <nav
        id="main-navbar"
        className="liquid-glass rounded-full px-6 sm:px-8 py-3 w-full transition-all duration-300 relative z-50"
      >
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo & Slogan */}
          <div
            id="brand-logo-container"
            onClick={() => {
              onCloseVideo?.();
              setCurrentPage("home");
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer group hover:opacity-90 transition-all"
          >
            <Logo size={36} showText={true} variant="dark" />
          </div>

          {/* Navigation Links - Desktop Only */}
          <div id="nav-links-wrapper" className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                onCloseVideo?.();
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-display font-medium text-[15px] transition-colors duration-300 cursor-pointer ${
                currentPage === "home" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="font-display font-medium text-[15px] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="font-display font-medium text-[15px] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => {
                onCloseVideo?.();
                setCurrentPage("pricing");
              }}
              className={`font-display font-medium text-[15px] transition-colors duration-300 cursor-pointer ${
                currentPage === "pricing" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-display font-medium text-[15px] text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Nav CTAs & Admin Actions - Desktop Only */}
          <div id="nav-actions" className="hidden md:flex items-center space-x-4">
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
                  <ShieldAlert size={12} className="text-white/70" />
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
              className="liquid-glass hover-lift px-6 py-3 rounded-full text-white font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase hover:bg-white/10 transition-all duration-300 interactive cursor-pointer"
            >
              Start Project
            </button>
          </div>

          {/* Premium Hamburger Menu Button - Mobile Only */}
          <button
            ref={hamburgerRef}
            id="mobile-hamburger-btn"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-overlay"
            onClick={toggleMobileMenu}
            className="flex md:hidden items-center justify-center w-11 h-11 rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 hover:scale-105 active:scale-95 transition-all duration-300 z-50 relative cursor-pointer"
          >
            <div className="w-5 h-4 flex flex-col justify-between relative">
              <span
                className={`h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-[7.25px] w-5" : "w-5"
                }`}
              />
              <span
                className={`h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 w-0" : "w-5"
                }`}
              />
              <span
                className={`h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[7.25px] w-5" : "w-5"
                }`}
              />
            </div>
          </button>

        </div>
      </nav>

      {/* Full-Screen Premium Mobile Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-[#070b0e]/98 backdrop-blur-2xl flex flex-col justify-between pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(2.5rem+env(safe-area-inset-bottom))] px-6 sm:px-12 md:hidden overflow-y-auto"
          >
            {/* Ambient Animated Cinematic Glow Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

            <div className="flex flex-col space-y-10 my-auto">
              <span className="font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase text-center block">
                FRAME FORGE NAVIGATION
              </span>

              <nav className="flex flex-col items-center space-y-4">
                {navItems.map((item) => {
                  const isActive = 
                    (item.action === "home" && currentPage === "home") ||
                    (item.action === "pricing" && currentPage === "pricing") ||
                    (item.action === "portfolio" && currentPage === "home" && window.location.hash === "#portfolio") ||
                    (item.action === "services" && currentPage === "home" && window.location.hash === "#services") ||
                    (item.action === "about" && currentPage === "home" && window.location.hash === "#about") ||
                    (item.action === "contact" && currentPage === "home" && window.location.hash === "#contact");

                  return (
                    <motion.button
                      key={item.label}
                      variants={itemVariants}
                      onClick={() => handleNavItemClick(item)}
                      className={`font-display font-medium text-[22px] sm:text-[26px] transition-all duration-300 py-3 w-full max-w-xs text-center cursor-pointer min-h-[48px] flex items-center justify-center rounded-full ${
                        isActive 
                          ? "text-white font-medium bg-white/5 border border-white/10" 
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Section: Primary CTAs & Contact Details */}
            <motion.div 
              variants={itemVariants} 
              className="w-full max-w-xs mx-auto space-y-6 mt-auto"
            >
              {isAdminLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="flex items-center justify-center space-x-2 py-3.5 rounded-xl liquid-glass text-white text-[11px] font-mono transition-all duration-300 interactive cursor-pointer hover:bg-white/10 w-full border border-white/10"
                  >
                    <ShieldAlert size={14} className="text-white/70" />
                    <span>ADMIN CONSOLE</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogoutAdmin();
                    }}
                    className="py-3.5 rounded-xl bg-red-950/25 border border-red-500/25 hover:bg-red-500/35 text-red-400 text-[11px] font-mono transition-all duration-300 interactive cursor-pointer w-full text-center"
                  >
                    LOGOUT ADMIN
                  </button>
                </div>
              ) : null}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenRequests();
                }}
                className="w-full py-3.5 rounded-xl liquid-glass border border-white/10 text-white font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase hover:bg-white/10 transition-all duration-300 interactive cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-white/80" />
                <span>Start Project</span>
              </button>

              <div className="flex flex-col items-center space-y-2 pt-4 border-t border-white/5">
                <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                  DIRECT CONNECTION
                </span>
                <a
                  href="mailto:frameforgestudios.001@gmail.com"
                  className="font-sans text-[12px] text-white/50 hover:text-white transition-colors py-1 flex items-center gap-2 tracking-wide"
                >
                  <Mail size={13} className="text-white/30" />
                  <span>frameforgestudios.001@gmail.com</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
