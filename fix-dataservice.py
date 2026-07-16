with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

funcs = '''
export async function getPricingPackages(): Promise<PricingPackage[]> {
  const res = await fetch("/api/db/packages");
  if (!res.ok) throw new Error("Failed to fetch pricing packages");
  return res.json();
}

export async function savePricingPackage(pkg: PricingPackage): Promise<void> {
  const res = await fetch("/api/db/packages", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(pkg),
  });
  if (!res.ok) throw new Error("Failed to save pricing package");
}

export async function deletePricingPackage(id: string): Promise<void> {
  const res = await fetch(`/api/db/packages/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete pricing package");
}

export async function getPDFDocuments(): Promise<PDFDoc[]> {
'''

text = text.replace('export async function getPDFDocuments(): Promise<PDFDoc[]> {', funcs)
text = text.replace('ServiceItem, SectionContent', 'ServiceItem, SectionContent, PricingPackage')

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
