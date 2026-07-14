import re

with open("src/components/ServicesSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'className="font-sans font-medium text-[15px] text-white uppercase tracking-[0.08em] group-hover:text-white/80 transition-colors"',
    'className="font-display font-medium text-[20px] text-white tracking-tight group-hover:text-white/80 transition-colors"'
)

content = content.replace(
    'className="font-sans font-medium text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/60 uppercase tracking-[0.08em]"',
    'className="font-mono font-medium text-[10px] px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-white/60 uppercase tracking-[0.1em]"'
)

# And fix double tracking-tight in h2
content = content.replace(
    'font-display font-medium tracking-tight text-[42px] md:text-[56px] text-white leading-[1.05] tracking-tight',
    'font-display font-medium text-[42px] md:text-[56px] text-white leading-[1.05] tracking-tight'
)

with open("src/components/ServicesSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
