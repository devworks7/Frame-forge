import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

text = text.replace("onClick={handleCloseProject}", "onClick={() => handleCloseProject()}")

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)

with open("src/components/Navbar.tsx", "r") as f:
    text = f.read()

text = text.replace('ease: "easeOut"', 'ease: "easeInOut"')

with open("src/components/Navbar.tsx", "w") as f:
    f.write(text)
