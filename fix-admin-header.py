import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

top_ribbon_original = r'''      \{/\* Top Console ribbon \*/\}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg=\[\#0a0a0c\] gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-wider">
              FRAME FORGE CONTROL SUITE
            </h2>
            <p className="font-mono text-\[9px\] text-white/50 uppercase">
              SECURE SESSION ROOT // STATUS: AUTHENTICATED // LATENCY: NOMINAL
            </p>
          </div>
        </div>
        \{/\* Console CTAs \*/\}
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick=\{.*?\}.*?
            className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-\[9px\] border border-red-500/20 transition-all cursor-pointer"
          >
            TERMINATE_SESSION
          </button>
          <button
            onClick=\{onClose\}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all interactive cursor-pointer min-h-\[44px\]"
          >
            <X size=\{18\} />
          </button>
        </div>
      </div>'''

top_ribbon_new = """      {/* Top Console ribbon */}
      <div className="flex flex-row items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#0a0a0c] sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 -ml-1.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="flex-1">
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-wider line-clamp-1">
              FRAME FORGE CONTROL SUITE
            </h2>
            <p className="hidden md:block font-mono text-[9px] text-white/50 uppercase">
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
            className="hidden md:block px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[9px] border border-red-500/20 transition-all cursor-pointer min-h-[44px]"
          >
            TERMINATE_SESSION
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all interactive cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>
      </div>"""

new_text = re.sub(top_ribbon_original, top_ribbon_new, text, flags=re.DOTALL)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(new_text)

print(len(new_text) == len(text))
