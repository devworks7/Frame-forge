import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. handleSaveProject
content = re.sub(
    r'await savePortfolioItem\(finalItem\);\s*await loadDashboardData\(\);',
    r'await savePortfolioItem(finalItem);\n      setPortfolio(prev => {\n        const idx = prev.findIndex(p => p.id === finalItem.id);\n        if (idx !== -1) { const arr = [...prev]; arr[idx] = finalItem; return arr; }\n        return [...prev, finalItem];\n      });',
    content
)

# 2. handleSavePdf
content = re.sub(
    r'await savePDFDocument\(finalItem\);\s*await loadDashboardData\(\);',
    r'await savePDFDocument(finalItem);\n      setPdfs(prev => {\n        const idx = prev.findIndex(p => p.id === finalItem.id);\n        if (idx !== -1) { const arr = [...prev]; arr[idx] = finalItem; return arr; }\n        return [...prev, finalItem];\n      });',
    content
)

# 3. handleSaveFaq
content = re.sub(
    r'await saveFAQ\(finalItem\);\s*await loadDashboardData\(\);',
    r'await saveFAQ(finalItem);\n      setFaqs(prev => {\n        const idx = prev.findIndex(p => p.id === finalItem.id);\n        if (idx !== -1) { const arr = [...prev]; arr[idx] = finalItem; return arr; }\n        return [...prev, finalItem];\n      });',
    content
)

# 4. handleSaveTestimonial
content = re.sub(
    r'await saveTestimonial\(finalItem\);\s*await loadDashboardData\(\);',
    r'await saveTestimonial(finalItem);\n      setTestimonials(prev => {\n        const idx = prev.findIndex(p => p.id === finalItem.id);\n        if (idx !== -1) { const arr = [...prev]; arr[idx] = finalItem; return arr; }\n        return [...prev, finalItem];\n      });',
    content
)

# 5. handleSaveService
content = re.sub(
    r'await saveServiceItem\(finalItem\);\s*await loadDashboardData\(\);',
    r'await saveServiceItem(finalItem);\n      setServices(prev => {\n        const idx = prev.findIndex(p => p.id === finalItem.id);\n        if (idx !== -1) { const arr = [...prev]; arr[idx] = finalItem; return arr; }\n        return [...prev, finalItem];\n      });',
    content
)

# 6. handleUpdateStatus
content = re.sub(
    r'await saveClientRequest\(item\);\s*await loadDashboardData\(\);',
    r'await saveClientRequest(item);\n        setRequests(updated);',
    content
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(content)

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r'await deletePortfolioItem\(id\);\s*await loadDashboardData\(\);',
    r'await deletePortfolioItem(id);\n      setPortfolio(prev => prev.filter(p => p.id !== id));',
    content
)

content = re.sub(
    r'await deletePDFDocument\(id\);\s*await loadDashboardData\(\);',
    r'await deletePDFDocument(id);\n      setPdfs(prev => prev.filter(p => p.id !== id));',
    content
)

content = re.sub(
    r'await deleteFAQ\(id\);\s*await loadDashboardData\(\);',
    r'await deleteFAQ(id);\n      setFaqs(prev => prev.filter(p => p.id !== id));',
    content
)

content = re.sub(
    r'await deleteTestimonial\(id\);\s*await loadDashboardData\(\);',
    r'await deleteTestimonial(id);\n      setTestimonials(prev => prev.filter(p => p.id !== id));',
    content
)

content = re.sub(
    r'await deleteServiceItem\(id\);\s*await loadDashboardData\(\);',
    r'await deleteServiceItem(id);\n      setServices(prev => prev.filter(p => p.id !== id));',
    content
)

content = re.sub(
    r'await deleteClientRequest\(id\);\s*await loadDashboardData\(\);',
    r'await deleteClientRequest(id);\n      setRequests(prev => prev.filter(p => p.id !== id));',
    content
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(content)
