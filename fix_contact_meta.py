import re

with open("src/components/ContactSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'className="block font-sans font-medium text-[11px] uppercase tracking-[0.08em] text-white/50"',
    'className="block font-mono font-medium text-[10px] uppercase tracking-[0.15em] text-white/50"'
)

with open("src/components/ContactSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
