import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const hasNoHover = window.matchMedia("(hover: none)").matches;
    const hasTouchEvents = "ontouchstart" in window;
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    return isCoarse || hasNoHover || (hasTouchEvents && hasTouchPoints);
  });

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Add event listeners to detect interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch]);

  if (isTouch || isHidden) return null;

  return (
    <>
      {/* Outer Luxury Ring */}
      <div
        id="custom-cursor-ring"
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference transition-all duration-300 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.5 : 1})`,
          width: isHovering ? "48px" : "24px",
          height: isHovering ? "48px" : "24px",
          border: isHovering ? "1.5px solid #C8A96A" : "1px solid #174C43",
          backgroundColor: isHovering ? "rgba(200, 169, 106, 0.08)" : "transparent",
        }}
      />
      {/* Inner Sophisticated Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#C8A96A] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
}
