with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

# Just remove the bottom block
# It starts from: export async function savePricingPackage(pkg: PricingPackage): Promise<void> {

idx = text.rfind('export async function savePricingPackage(pkg: PricingPackage): Promise<void> {')
text = text[:idx]

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
