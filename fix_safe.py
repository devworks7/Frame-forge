import re

with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-[100] flex flex-col md:justify-center bg-black md:bg-[#0a0e13]/95 backdrop-blur-md overflow-y-auto pt-safe pb-safe md:top-20 md:z-40"',
    'className="fixed inset-0 z-[100] flex flex-col md:justify-center bg-black md:bg-[#0a0e13]/95 backdrop-blur-md overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:pt-0 md:pb-0 md:top-20 md:z-40"'
)

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(text)
