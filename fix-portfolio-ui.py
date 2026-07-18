import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

replacement = """        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video rounded-xl bg-white/[0.02] border border-white/5 animate-pulse"></div>
             ))}
          </div>
        ) : error ? (
          <div className="py-12 border border-rose-500/20 bg-rose-950/10 rounded-2xl flex items-center justify-center text-rose-400 font-sans text-sm">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 border border-white/5 liquid-glass rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
             <Film className="text-white/20 mb-2" size={48} />
             <p className="text-white/70 font-sans font-bold uppercase tracking-wider text-sm">No Projects Available</p>
             <p className="text-white/40 text-xs">Portfolio is currently being updated.</p>
          </div>
        ) : (
          <div
            id="portfolio-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((proj) => ("""

text = text.replace("""        {/* Projects Grid */}
        <div
          id="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((proj) => (""", replacement)

text = text.replace('          {projects.map((proj) => (', '          {projects.map((proj) => (') # Just to test

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)

