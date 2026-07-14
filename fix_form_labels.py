import re

with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace <label className="block font-sans font-medium text-[11px] text-white/50 uppercase tracking-[0.08em]">
content = re.sub(
    r'<label className="block font-sans font-medium text-\[11px\] text-white/50 uppercase tracking-\[0\.08em\]">',
    r'<label className="block font-sans text-[13px] text-white/70 mb-1.5">',
    content
)

# Replace the headings in form
# <h3 className="font-sans font-medium text-[11px] text-white/50 tracking-[0.08em] uppercase border-b border-white/5 pb-2">
content = re.sub(
    r'<h3 className="font-sans font-medium text-\[11px\] text-white/50 tracking-\[0\.08em\] uppercase border-b border-white/5 pb-2">',
    r'<h3 className="font-mono font-medium text-[11px] text-white/50 tracking-[0.15em] uppercase border-b border-white/5 pb-2">',
    content
)

with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

