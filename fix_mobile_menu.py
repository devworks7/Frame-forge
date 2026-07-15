import re
with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('font-display text-[22px] sm:text-[26px] uppercase tracking-[0.14em] font-light', 'font-display font-medium text-[22px] sm:text-[26px]')
# also uppercase should be removed from the nav link labels.
# Wait, they are dynamic: {item.label} which is defined in a constant array somewhere, probably in Navbar.tsx
with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
