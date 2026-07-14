import re

with open("src/components/PricingDocuments.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-white/70 font-sans text-[10px] font-medium uppercase tracking-[0.08em]"',
    'className="absolute top-4 right-4 px-2.5 py-1 rounded-sm border border-white/15 bg-white/5 text-white/70 font-mono text-[10px] font-medium uppercase tracking-[0.1em]"'
)

content = content.replace(
    'className="font-sans font-medium text-4xl text-white"',
    'className="font-display font-medium text-4xl text-white tracking-tight"'
)

# And let's make the plan name display too? It's currently text-[12px] uppercase.
content = content.replace(
    'className="font-sans font-medium text-[12px] text-white/50 uppercase tracking-[0.08em] block"',
    'className="font-mono font-medium text-[11px] text-white/50 uppercase tracking-[0.15em] block"'
)

with open("src/components/PricingDocuments.tsx", "w", encoding="utf-8") as f:
    f.write(content)

