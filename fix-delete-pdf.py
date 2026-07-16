with open("src/lib/dataService.ts", "r") as f:
    text = f.read()

text = text.replace(
    'export async function deletePDFDocument(id: string): Promise<void> {\n  const res',
    'export async function deletePDFDocument(id: string): Promise<void> {\n  cachedPDFs = null;\n  cachedPDFsPromise = null;\n  const res'
)

with open("src/lib/dataService.ts", "w") as f:
    f.write(text)
