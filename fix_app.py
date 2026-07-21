import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """<Hero content={siteContent} onOpenRequests={handleOpenRequests} />
                <PortfolioSection />
                <ServicesSection />
                <AboutSection content={siteContent} />
                <ContactSection content={siteContent} />
              </div>"""

content = re.sub(r'<Hero content=\{siteContent\} onOpenRequests=\{handleOpenRequests\} />\s*</div>', replacement, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
