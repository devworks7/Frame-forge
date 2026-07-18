import re

with open("src/components/PricingDocuments.tsx", "r") as f:
    text = f.read()

text = text.replace('{plan.features.map((feature, fIdx) => (', '{(plan.features || []).map((feature, fIdx) => (')

with open("src/components/PricingDocuments.tsx", "w") as f:
    f.write(text)
