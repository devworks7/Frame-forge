with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

text = text.replace(
    'export async function savePricingPackage(pkg: PricingPackage): Promise<void> {',
    'export async function savePricingPackage(pkg: PricingPackage): Promise<void> {\n  cachedPackages = null;\n  cachedPackagesPromise = null;'
)

text = text.replace(
    'export async function savePDFDocument(pdf: PDFDoc): Promise<void> {',
    'export async function savePDFDocument(pdf: PDFDoc): Promise<void> {\n  cachedPDFs = null;\n  cachedPDFsPromise = null;'
)

text = text.replace(
    'export async function deletePricingPackage(id: string): Promise<void> {',
    'export async function deletePricingPackage(id: string): Promise<void> {\n  cachedPackages = null;\n  cachedPackagesPromise = null;'
)

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
