import re

with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add useEffect for locking body overflow
lock_effect = r'''  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedProject]);
'''

# Find the spot to insert the effect
text = text.replace('  useEffect(() => {\n    if (!selectedProject) return;', lock_effect + '\n  useEffect(() => {\n    if (!selectedProject) return;')

# Add back history integration
history_effect = r'''  useEffect(() => {
    if (selectedProject) {
      window.history.pushState({ modalOpen: true }, '');
    }
  }, [selectedProject]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (selectedProject) {
        handleCloseProject();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedProject]);
'''

text = text.replace('  const handleCloseProject = () => {', history_effect + '\n  const handleCloseProject = () => {\n    if (window.history.state?.modalOpen) { window.history.back(); }')

# Modal UI adjustments
modal_search = r'''        <div
          id="secure-player-modal"
          onContextMenu=\{preventContextMenu\}
          onKeyDown=\{preventShortcuts\}
          onClick=\{\(e\) => \{
            if \(e\.target === e\.currentTarget\) \{
              handleCloseProject\(\);
            \}
          \}\}
          tabIndex=\{0\}
          className="fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col justify-center bg-\[#0a0e13\]/95 backdrop-blur-md overflow-y-auto"
        >'''

modal_replacement = r'''        <div
          id="secure-player-modal"
          onContextMenu={preventContextMenu}
          onKeyDown={preventShortcuts}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseProject();
            }
          }}
          tabIndex={0}
          className="fixed inset-0 z-[100] flex flex-col md:justify-center bg-black md:bg-[#0a0e13]/95 backdrop-blur-md overflow-y-auto pt-safe pb-safe md:top-20 md:z-40"
        >'''

text = re.sub(modal_search, modal_replacement, text)

# Update Top Panel in Modal
top_panel_search = r'''          \{\/\* Top Panel \*\/\}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/5 border border-white/10">
                <Film className="text-white" size=\{12\} />
              </div>
              <div>
                <h4 className="font-display font-medium text-\[24px\] text-white tracking-tight leading-none">
                  \{selectedProject\.title\}
                </h4>
                <p className="font-mono text-\[10px\] text-white/40 tracking-widest uppercase">
                  Cinematic Preview // Secure Stream
                </p>
              </div>
            </div>
            
            <button
              onClick=\{handleCloseProject\}
              className="p-2 rounded-full liquid-glass hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <X size=\{14\} />
            </button>
          </div>'''

top_panel_replacement = r'''          {/* Top Panel */}
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
          </div>'''

text = re.sub(top_panel_search, top_panel_replacement, text)

# Let's adjust the video container so it fits on mobile without overlapping controls
video_container_search = r'''            \{\/\* Player block \*\/\}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video shadow-lg">'''

video_container_replacement = r'''            {/* Player block */}
            <div className="lg:col-span-7 relative md:rounded-xl overflow-hidden border-y md:border border-white/10 bg-black aspect-video shadow-lg -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full max-h-[70vh] md:max-h-none flex items-center shrink-0">'''

text = re.sub(video_container_search, video_container_replacement, text)

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(text)
