import re

with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace <h3 className="font-sans font-medium text-[15px] text-white group-hover:text-white/80 transition-colors uppercase tracking-[0.08em]">
content = re.sub(
    r'<h3 className="font-sans font-medium text-\[15px\] text-white group-hover:text-white/80 transition-colors uppercase tracking-\[0\.08em\]">',
    r'<h3 className="font-display font-medium text-[22px] text-white group-hover:text-white/80 transition-colors tracking-tight">',
    content
)

# And in the modal:
# <h3 className="font-display font-medium tracking-tight text-[32px] sm:text-[42px] text-white font-normal leading-[1.05]">
# Wait, let's just make sure we replace the right things.

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
