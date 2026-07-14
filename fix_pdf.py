import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

replacement = """  const handleSavePdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPdf) return;

    const finalFileUrl = uploadedFileUrl || editingPdf.fileUrl;
    if (!finalFileUrl || finalFileUrl.startsWith("blob:") || finalFileUrl.startsWith("file:") || finalFileUrl.includes("dummy.pdf")) {
      alert("Please upload a valid PDF document before committing.");
      return;
    }

    const finalItem: PDFDoc = {
      id: editingPdf.id || "pdf-" + Date.now(),
      title: editingPdf.title || "Untitled Deck",
      category: (editingPdf.category as any) || "Package",
      description: editingPdf.description || "",
      fileUrl: finalFileUrl,
      fileName: uploadedFileName || editingPdf.fileName || "document.pdf",
      downloadsAllowed: editingPdf.downloadsAllowed ?? true,
      order: editingPdf.order || pdfs.length + 1,
    };"""

pattern = r"\s*const handleSavePdf = async \(e: React.FormEvent\) => \{\n\s*e\.preventDefault\(\);\n\s*if \(\!editingPdf\) return;\n\n\s*const finalItem: PDFDoc = \{\n\s*id: editingPdf\.id \|\| \"pdf-\" \+ Date\.now\(\),\n\s*title: editingPdf\.title \|\| \"Untitled Deck\",\n\s*category: \(editingPdf\.category as any\) \|\| \"Package\",\n\s*description: editingPdf\.description \|\| \"\",\n\s*fileUrl: uploadedFileUrl \|\| editingPdf\.fileUrl \|\| \"/api/documents/brochure\.pdf\",\n\s*fileName: uploadedFileName \|\| editingPdf\.fileName \|\| \"brochure\.pdf\",\n\s*downloadsAllowed: editingPdf\.downloadsAllowed \?\? true,\n\s*order: editingPdf\.order \|\| pdfs\.length \+ 1,\n\s*\};"

new_content = re.sub(pattern, "\n" + replacement, content)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(new_content)
