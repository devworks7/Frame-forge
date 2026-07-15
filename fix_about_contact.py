import re

# Update AboutSection.tsx
with open("src/components/AboutSection.tsx", "r", encoding="utf-8") as f:
    about_text = f.read()

about_text = re.sub(
    r'<div id="about-section-grid" className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">',
    r'<div id="about-section-grid" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">',
    about_text
)
about_text = re.sub(
    r'<h2 className="font-display font-normal text-\[36px\] sm:text-\[48px\] text-white leading-\[1.2\] tracking-tight animate-fade-rise">',
    r'<h2 className="font-display font-normal text-[32px] md:text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight animate-fade-rise">',
    about_text
)
about_text = re.sub(
    r'<div className="w-full aspect-\[4/5\] rounded-xl overflow-hidden liquid-glass border border-white/10 relative group">',
    r'<div className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden liquid-glass border border-white/10 relative group">',
    about_text
)

with open("src/components/AboutSection.tsx", "w", encoding="utf-8") as f:
    f.write(about_text)

# Update ContactSection.tsx
with open("src/components/ContactSection.tsx", "r", encoding="utf-8") as f:
    contact_text = f.read()

contact_text = re.sub(
    r'<h2 className="font-display font-normal text-\[36px\] sm:text-\[48px\] text-white leading-\[1.2\] tracking-tight animate-fade-rise">',
    r'<h2 className="font-display font-normal text-[32px] md:text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight animate-fade-rise">',
    contact_text
)

with open("src/components/ContactSection.tsx", "w", encoding="utf-8") as f:
    f.write(contact_text)

