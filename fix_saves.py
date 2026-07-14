import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

def inject_save_logic(func_name, item_name, inner_body, success_action, model_name=""):
    return f"""  const {func_name} = async (e: React.FormEvent) => {{
    e.preventDefault();
{inner_body}

    setIsSaving(true);
    setSaveError(null);
    try {{
      await {item_name};
      await loadDashboardData();
{success_action}
      setSaveSuccessMsg("{model_name} saved successfully.");
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    }} catch (err: any) {{
      setSaveError(err.message || "Failed to save {model_name.lower()}.");
    }} finally {{
      setIsSaving(false);
    }}
  }};"""

# Replace handleSaveProject
proj_old = """  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    const finalVideoUrl = uploadedFileUrl || editingProject.videoUrl;
    if (!finalVideoUrl || finalVideoUrl.startsWith("blob:") || finalVideoUrl.startsWith("file:") || finalVideoUrl.includes("sample.mp4")) {
      alert("Please upload a valid portfolio video before forging this item.");
      return;
    }

    const finalItem: PortfolioItem = {
      id: editingProject.id || "proj-" + Date.now(),
      title: editingProject.title || "Untitled Project",
      category: (editingProject.category as any) || "Commercial",
      description: editingProject.description || "",
      clientName: editingProject.clientName || "",
      date: editingProject.date || new Date().toISOString().split("T")[0],
      softwareUsed: editingProject.softwareUsed || ["After Effects"],
      duration: editingProject.duration || "1 min",
      tags: editingProject.tags || ["VFX"],
      videoUrl: finalVideoUrl,
      thumbnail: editingProject.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      order: editingProject.order || portfolio.length + 1,
    };

    await savePortfolioItem(finalItem);
    setEditingProject(null);
    setUploadedFileUrl("");
    setUploadedFileName("");
    loadDashboardData();
  };"""

proj_new_inner = """    if (!editingProject) return;
    
    const finalVideoUrl = uploadedFileUrl || editingProject.videoUrl;
    if (!finalVideoUrl || finalVideoUrl.startsWith("blob:") || finalVideoUrl.startsWith("file:") || finalVideoUrl.includes("sample.mp4")) {
      alert("Please upload a valid portfolio video before forging this item.");
      return;
    }

    const finalItem: PortfolioItem = {
      id: editingProject.id || "proj-" + Date.now(),
      title: editingProject.title || "Untitled Project",
      category: (editingProject.category as any) || "Commercial",
      description: editingProject.description || "",
      clientName: editingProject.clientName || "",
      date: editingProject.date || new Date().toISOString().split("T")[0],
      softwareUsed: editingProject.softwareUsed || ["After Effects"],
      duration: editingProject.duration || "1 min",
      tags: editingProject.tags || ["VFX"],
      videoUrl: finalVideoUrl,
      thumbnail: editingProject.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      order: editingProject.order || portfolio.length + 1,
    };"""
proj_new_success = """      setEditingProject(null);
      setUploadedFileUrl("");
      setUploadedFileName("");"""

proj_new = inject_save_logic("handleSaveProject", "savePortfolioItem(finalItem)", proj_new_inner, proj_new_success, "Project")
content = content.replace(proj_old, proj_new)

# Replace handleSavePdf
pdf_old = """  const handleSavePdf = async (e: React.FormEvent) => {
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
    };

    await savePDFDocument(finalItem);
    setEditingPdf(null);
    setUploadedFileUrl("");
    setUploadedFileName("");
    loadDashboardData();
  };"""

pdf_new_inner = """    if (!editingPdf) return;

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
pdf_new_success = """      setEditingPdf(null);
      setUploadedFileUrl("");
      setUploadedFileName("");"""
pdf_new = inject_save_logic("handleSavePdf", "savePDFDocument(finalItem)", pdf_new_inner, pdf_new_success, "PDF Document")
content = content.replace(pdf_old, pdf_new)

# Replace handleSaveContent
cnt_old = """  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    await saveSectionContent(content);
    setContentSaveSuccess(true);
    setTimeout(() => setContentSaveSuccess(false), 3500);
    loadDashboardData();
  };"""

cnt_new_inner = """    if (!content) return;"""
cnt_new_success = """      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 3500);"""
cnt_new = inject_save_logic("handleSaveContent", "saveSectionContent(content)", cnt_new_inner, cnt_new_success, "Content")
content = content.replace(cnt_old, cnt_new)

# Replace handleSaveFaq
faq_old = """  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    const finalItem: FAQItem = {
      id: editingFaq.id || "faq-" + Date.now(),
      question: editingFaq.question || "",
      answer: editingFaq.answer || "",
      order: editingFaq.order || faqs.length + 1,
    };
    await saveFAQ(finalItem);
    setEditingFaq(null);
    loadDashboardData();
  };"""
faq_new_inner = """    if (!editingFaq) return;
    const finalItem: FAQItem = {
      id: editingFaq.id || "faq-" + Date.now(),
      question: editingFaq.question || "",
      answer: editingFaq.answer || "",
      order: editingFaq.order || faqs.length + 1,
    };"""
faq_new_success = """      setEditingFaq(null);"""
faq_new = inject_save_logic("handleSaveFaq", "saveFAQ(finalItem)", faq_new_inner, faq_new_success, "FAQ")
content = content.replace(faq_old, faq_new)

# Replace handleSaveTestimonial
tst_old = """  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    const finalItem: Testimonial = {
      id: editingTestimonial.id || "test-" + Date.now(),
      name: editingTestimonial.name || "",
      role: editingTestimonial.role || "",
      company: editingTestimonial.company || "",
      rating: editingTestimonial.rating || 5,
      comment: editingTestimonial.comment || "",
      avatar: editingTestimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      order: editingTestimonial.order || testimonials.length + 1,
    };
    await saveTestimonial(finalItem);
    setEditingTestimonial(null);
    loadDashboardData();
  };"""
tst_new_inner = """    if (!editingTestimonial) return;
    const finalItem: Testimonial = {
      id: editingTestimonial.id || "test-" + Date.now(),
      name: editingTestimonial.name || "",
      role: editingTestimonial.role || "",
      company: editingTestimonial.company || "",
      rating: editingTestimonial.rating || 5,
      comment: editingTestimonial.comment || "",
      avatar: editingTestimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      order: editingTestimonial.order || testimonials.length + 1,
    };"""
tst_new_success = """      setEditingTestimonial(null);"""
tst_new = inject_save_logic("handleSaveTestimonial", "saveTestimonial(finalItem)", tst_new_inner, tst_new_success, "Testimonial")
content = content.replace(tst_old, tst_new)


# Replace handleSaveService
srv_old = """  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const finalItem: ServiceItem = {
      id: editingService.id || "srv-" + Date.now(),
      title: editingService.title || "New Service",
      badge: editingService.badge || "Post-Production",
      desc: editingService.desc || "",
      fullDescription: editingService.fullDescription || "",
      iconName: editingService.iconName || "Film",
      order: editingService.order || services.length + 1,
    };
    await saveServiceItem(finalItem);
    setEditingService(null);
    loadDashboardData();
  };"""
srv_new_inner = """    if (!editingService) return;
    const finalItem: ServiceItem = {
      id: editingService.id || "srv-" + Date.now(),
      title: editingService.title || "New Service",
      badge: editingService.badge || "Post-Production",
      desc: editingService.desc || "",
      fullDescription: editingService.fullDescription || "",
      iconName: editingService.iconName || "Film",
      order: editingService.order || services.length + 1,
    };"""
srv_new_success = """      setEditingService(null);"""
srv_new = inject_save_logic("handleSaveService", "saveServiceItem(finalItem)", srv_new_inner, srv_new_success, "Service")
content = content.replace(srv_old, srv_new)


with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(content)
