import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed bottom-6 right-6 p-3 rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 shadow-lg z-30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer interactive bg-[#070b0e]/40"',
    'className="fixed bottom-6 right-6 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 shadow-lg z-30 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer interactive bg-[#070b0e]/40"'
)

text = text.replace(
    'className="fixed bottom-6 left-6 p-3.5 rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 shadow-lg z-30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer interactive flex items-center justify-center bg-[#070b0e]/40"',
    'className="fixed bottom-6 left-6 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full liquid-glass border border-white/10 text-white hover:text-white/70 shadow-lg z-30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer interactive bg-[#070b0e]/40"'
)

# Also fix the mobile hamburger button in Navbar.tsx
with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    nav_text = f.read()

nav_text = nav_text.replace(
    'w-11 h-11 rounded-full liquid-glass',
    'min-w-[44px] min-h-[44px] rounded-full liquid-glass'
)

# And add lock overflow on mobile
# wait, it's already there

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(nav_text)

