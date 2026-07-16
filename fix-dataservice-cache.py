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

export async function savePricingPackage(pkg: PricingPackage): Promise<void> {
  cachedPackages = null;
  cachedPackagesPromise = null;
  const res = await fetch("/api/db/packages", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(pkg),
  });
  if (!res.ok) throw new Error("Failed to save pricing package");
}

export async function deletePricingPackage(id: string): Promise<void> {
  cachedPackages = null;
  cachedPackagesPromise = null;
  const res = await fetch(`/api/db/packages/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete pricing package");
}

export async function savePDFDocument(pdf: PDFDoc): Promise<void> {
  cachedPDFs = null;
  cachedPDFsPromise = null;
  const res = await fetch("/api/db/pdfs", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(pdf),
  });
  if (!res.ok) throw new Error("Failed to save pdf");
}
'''

import re

# Remove old getPDFDocuments and savePDFDocument
text = re.sub(r'export async function getPDFDocuments.*?return res\.json\(\);\n}', '', text, flags=re.DOTALL)
text = re.sub(r'export async function savePDFDocument.*?if \(!res\.ok\) throw new Error\("Failed to save pdf"\);\n}', '', text, flags=re.DOTALL)

# Same for delete
text = re.sub(r'export async function deletePDFDocument.*?if \(!res\.ok\) throw new Error\("Failed to delete pdf"\);\n}', '', text, flags=re.DOTALL)

# Append new ones plus deletePDFDocument
text += funcs + '''
export async function deletePDFDocument(id: string): Promise<void> {
  cachedPDFs = null;
  cachedPDFsPromise = null;
  const res = await fetch(`/api/db/pdfs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete pdf");
}
'''

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
