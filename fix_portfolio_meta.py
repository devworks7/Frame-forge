import re

with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r'className="font-sans font-medium text-\[11px\] text-white/50 uppercase tracking-\[0\.08em\]([^"]*)"',
    r'className="font-mono font-medium text-[10px] text-white/50 uppercase tracking-[0.15em]\1"',
    content
)

content = re.sub(
    r'className="font-sans font-medium text-\[12px\] text-white/50 tracking-\[0\.08em\] uppercase"',
    r'className="font-mono font-medium text-[11px] text-white/50 tracking-[0.15em] uppercase"',
    content
)

content = re.sub(
    r'className="block font-sans font-medium text-\[11px\] uppercase tracking-\[0\.08em\] text-white/50"',
    r'className="block font-mono font-medium text-[10px] uppercase tracking-[0.15em] text-white/50"',
    content
)

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
