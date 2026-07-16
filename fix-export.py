with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

text = text.replace('function preloadPricingAndDocuments', 'export function preloadPricingAndDocuments')

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
