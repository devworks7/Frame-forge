import re

with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("font-display font-medium text-[22px] sm:text-[26px] uppercase tracking-[0.14em] font-light", "font-display text-[22px] sm:text-[26px] uppercase tracking-[0.14em] font-light")

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
