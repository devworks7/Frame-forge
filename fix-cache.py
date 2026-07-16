with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

funcs = '''
let cachedPackages: PricingPackage[] | null = null;
let cachedPackagesPromise: Promise<PricingPackage[]> | null = null;

export function getPricingPackages(): Promise<PricingPackage[]> {
  if (cachedPackages) return Promise.resolve(cachedPackages);
  if (cachedPackagesPromise) return cachedPackagesPromise;
  
  cachedPackagesPromise = fetch("/api/db/packages").then(res => {
    if (!res.ok) throw new Error("Failed to fetch pricing packages");
    return res.json().then(data => {
      cachedPackages = data;
      return data;
    });
  });
  return cachedPackagesPromise;
}

let cachedPDFs: PDFDoc[] | null = null;
let cachedPDFsPromise: Promise<PDFDoc[]> | null = null;

export function getPDFDocuments(): Promise<PDFDoc[]> {
  if (cachedPDFs) return Promise.resolve(cachedPDFs);
  if (cachedPDFsPromise) return cachedPDFsPromise;
  
  cachedPDFsPromise = fetch("/api/db/pdfs").then(res => {
    if (!res.ok) throw new Error("Failed to fetch pdfs");
    return res.json().then(data => {
      cachedPDFs = data;
      return data;
    });
  });
  return cachedPDFsPromise;
}

export function preloadPricingAndDocuments() {
  getPricingPackages().catch(console.error);
  getPDFDocuments().catch(console.error);
}

'''

text = text.replace('''export async function getPricingPackages(): Promise<PricingPackage[]> {
  const res = await fetch("/api/db/packages");
  if (!res.ok) throw new Error("Failed to fetch pricing packages");
  return res.json();
}''', '')

text = text.replace('''export async function getPDFDocuments(): Promise<PDFDoc[]> {
  const res = await fetch("/api/db/pdfs");
  if (!res.ok) throw new Error("Failed to fetch pdfs");
  return res.json();
}''', funcs)

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
