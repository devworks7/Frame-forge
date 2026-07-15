import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default React.memo(function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 shadow-lg z-30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer interactive bg-[#070b0e]/40"
      title="Back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
});
