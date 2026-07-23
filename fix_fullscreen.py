import re

with open('src/components/PortfolioSection.tsx', 'r') as f:
    content = f.read()

handle_fullscreen = """
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    try {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen API is not supported", error);
    }
  };

"""

content = content.replace("  return (\n    <section", handle_fullscreen + "  return (\n    <section")

# Add group to container
content = content.replace('className="lg:col-span-7 relative md:rounded-xl overflow-hidden md:border border-white/10 bg-black aspect-video shadow-lg w-full max-h-[70vh] md:max-h-none flex items-center shrink-0"', 'className="group lg:col-span-7 relative md:rounded-xl overflow-hidden md:border border-white/10 bg-black aspect-video shadow-lg w-full max-h-[70vh] md:max-h-none flex items-center shrink-0"')

button_html = """              {/* Custom Fullscreen Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreen();
                }}
                aria-label="Enter fullscreen"
                className="absolute bottom-16 right-4 p-2.5 rounded-xl liquid-glass border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none focus:ring-2 focus:ring-white/20 active:scale-95 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Maximize size={18} />
              </button>
"""

content = content.replace('FRAME FORGE DIRECT STREAM\n                </span>\n              </div>', 'FRAME FORGE DIRECT STREAM\n                </span>\n              </div>\n' + button_html)

with open('src/components/PortfolioSection.tsx', 'w') as f:
    f.write(content)
