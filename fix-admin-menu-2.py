import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

top_ribbon_original = """      {/* Top Console ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#0a0a0c] gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-wider">
              FRAME FORGE CONTROL SUITE
            </h2>
            <p className="font-mono text-[9px] text-white/50 uppercase">
              SECURE SESSION ROOT // STATUS: AUTHENTICATED // LATENCY: NOMINAL
            </p>
          </div>
        </div>
        {/* Console CTAs */}
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => {
              localStorage.removeItem("ff_admin_token");
              setToken(null);
              setIsAuthenticated(false);
              onLoginStateChange(false);
            }}
            className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[9px] border border-red-500/20 transition-all cursor-pointer"
          >
            TERMINATE_SESSION
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all interactive cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>"""

top_ribbon_new = """      {/* Top Console ribbon */}
      <div className="flex flex-row items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#0a0a0c]">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <div className="hidden sm:block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="flex-1">
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-wider line-clamp-1">
              FRAME FORGE CONTROL SUITE
            </h2>
            <p className="hidden sm:block font-mono text-[9px] text-white/50 uppercase">
              SECURE SESSION ROOT // STATUS: AUTHENTICATED // LATENCY: NOMINAL
            </p>
          </div>
        </div>
        {/* Console CTAs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              localStorage.removeItem("ff_admin_token");
              setToken(null);
              setIsAuthenticated(false);
              onLoginStateChange(false);
            }}
            className="hidden sm:block px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[9px] border border-red-500/20 transition-all cursor-pointer"
          >
            TERMINATE_SESSION
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all interactive cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>"""

sidebar_original = """      {/* Main Grid: Left Nav, Right Content workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side menu navigation */}
        <div className="w-56 border-r border-white/5 bg-[#0a0a0c] p-4 flex flex-col justify-between">"""

sidebar_new = """      {/* Main Grid: Left Nav, Right Content workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Side menu navigation (Mobile Drawer & Desktop Sidebar) */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
        <div className={`
          absolute md:static inset-y-0 left-0 z-50
          w-64 md:w-56 border-r border-white/5 bg-[#0a0a0c] p-4 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Mobile close button & Terminate inside sidebar */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <span className="font-mono text-[9px] text-white/50 uppercase">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-white/60">
              <X size={18} />
            </button>
          </div>
"""

text = text.replace(top_ribbon_original, top_ribbon_new)
text = text.replace(sidebar_original, sidebar_new)

# Update setActiveTab in buttons
text = re.sub(
    r'(onClick=\{\(\) => )setActiveTab\("([^"]+)"\)\}',
    r'\1{ setActiveTab("\2"); setIsMobileMenuOpen(false); }}',
    text
)

# Also add the mobile terminate session button to the bottom of the sidebar
sidebar_bottom_original = """            <div>CORE_VER: v1.0.4</div>
            <div>
              PERSIST_ENGINE:{" "}"""
sidebar_bottom_new = """            <button
              onClick={() => {
                localStorage.removeItem("ff_admin_token");
                setToken(null);
                setIsAuthenticated(false);
                onLoginStateChange(false);
              }}
              className="md:hidden mb-4 w-full px-3 py-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[9px] border border-red-500/20 transition-all cursor-pointer"
            >
              TERMINATE_SESSION
            </button>
            <div>CORE_VER: v1.0.4</div>
            <div>
              PERSIST_ENGINE:{" "}"""
text = text.replace(sidebar_bottom_original, sidebar_bottom_new)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
