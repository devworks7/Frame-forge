import re

with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'className="font-sans font-medium text-[14px] text-white uppercase tracking-[0.08em]"',
    'className="font-display font-medium text-[24px] text-white tracking-tight leading-none"'
)

content = content.replace(
    'className="font-sans font-medium text-[18px] text-white uppercase tracking-[0.08em]"',
    'className="font-display font-medium text-[28px] text-white tracking-tight leading-none"'
)

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
