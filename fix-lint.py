import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

text = text.replace('onClick={handleClosePreview}', 'onClick={() => handleClosePreview()}')
with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)

with open("src/components/Navbar.tsx", "r") as f:
    text = f.read()

text = text.replace('ease: [0.16, 1, 0.3, 1]', 'ease: "easeOut"')
text = text.replace('ease: "circOut"', 'ease: "easeOut"')

with open("src/components/Navbar.tsx", "w") as f:
    f.write(text)
