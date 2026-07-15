import re
with open("src/components/PricingDocuments.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'setDocuments(data.sort((a, b) => a.order - b.order));',
    'setDocuments(data.filter(d => d.downloadsAllowed).sort((a, b) => a.order - b.order));'
)

with open("src/components/PricingDocuments.tsx", "w", encoding="utf-8") as f:
    f.write(text)
