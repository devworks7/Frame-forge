import re

with open('src/components/PortfolioSection.tsx', 'r') as f:
    content = f.read()

replacement = """      if (e.key === "Escape") {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
           return;
        }
        handleCloseProject();
      }"""

content = content.replace("""      if (e.key === "Escape") {
        handleCloseProject();
      }""", replacement)

with open('src/components/PortfolioSection.tsx', 'w') as f:
    f.write(content)
