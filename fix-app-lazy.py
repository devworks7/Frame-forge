import re

with open("src/App.tsx", "r") as f:
    text = f.read()

# Import LazySection
text = text.replace(
    'import Hero from "./components/Hero";',
    'import Hero from "./components/Hero";\nimport LazySection from "./components/LazySection";'
)

# Replace the homepage rendering block
old_render = """          {currentPage === "home" ? (
            /* HOMEPAGE - LANDING EXPERIENCE */
            siteContent && (
              <div className="space-y-0">
                <Hero content={siteContent} onOpenRequests={handleOpenRequests} />
                <PortfolioSection />
                <ServicesSection />
                <AboutSection content={siteContent} />
                <ContactSection content={siteContent} />
              </div>
            )
          ) : ("""

new_render = """          {currentPage === "home" ? (
            /* HOMEPAGE - LANDING EXPERIENCE */
            siteContent && (
              <div className="space-y-0">
                <Hero content={siteContent} onOpenRequests={handleOpenRequests} />
                <LazySection height="800px"><PortfolioSection /></LazySection>
                <LazySection height="800px"><ServicesSection /></LazySection>
                <LazySection height="800px"><AboutSection content={siteContent} /></LazySection>
                <LazySection height="800px"><ContactSection content={siteContent} /></LazySection>
              </div>
            )
          ) : ("""

text = text.replace(old_render, new_render)

with open("src/App.tsx", "w") as f:
    f.write(text)
