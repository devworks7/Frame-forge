import re

with open("src/components/ServicesSection.tsx", "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace('className="font-sans font-bold text-[9px] uppercase tracking-[0.25em] text-white/50"', 'className="font-mono font-medium text-[9px] uppercase tracking-[0.25em] text-white/50"')
with open("src/components/ServicesSection.tsx", "w", encoding="utf-8") as f:
    f.write(c)

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace('className="font-sans font-bold text-[8px] tracking-[0.3em] text-white/50 group-hover:text-white uppercase transition-colors duration-300"', 'className="font-mono font-medium text-[9px] tracking-[0.25em] text-white/50 group-hover:text-white uppercase transition-colors duration-300"')
with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(c)
