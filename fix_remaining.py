import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# handleDeleteProject
text = re.sub(
    r'await deletePortfolioItem\(id\);\s*loadDashboardData\(\);',
    r'await deletePortfolioItem(id);\n      setPortfolio(prev => prev.filter(p => p.id !== id));',
    text
)

# handleDeletePdf
text = re.sub(
    r'await deletePDFDocument\(id\);\s*loadDashboardData\(\);',
    r'await deletePDFDocument(id);\n      setPdfs(prev => prev.filter(p => p.id !== id));',
    text
)

# handleDeleteFaq
text = re.sub(
    r'await deleteFAQ\(id\);\s*loadDashboardData\(\);',
    r'await deleteFAQ(id);\n      setFaqs(prev => prev.filter(p => p.id !== id));',
    text
)

# handleDeleteTestimonial
text = re.sub(
    r'await deleteTestimonial\(id\);\s*loadDashboardData\(\);',
    r'await deleteTestimonial(id);\n      setTestimonials(prev => prev.filter(p => p.id !== id));',
    text
)

# handleDeleteService
text = re.sub(
    r'await deleteServiceItem\(id\);\s*loadDashboardData\(\);',
    r'await deleteServiceItem(id);\n      setServices(prev => prev.filter(p => p.id !== id));',
    text
)

# handleReorderProject
text = re.sub(
    r'savePortfolioItem\(list\[nextIdx\]\)\n    \]\);\n    loadDashboardData\(\);',
    r'savePortfolioItem(list[nextIdx])\n    ]);\n    setPortfolio(list);',
    text
)

# handleReorderService
text = re.sub(
    r'saveServiceItem\(list\[nextIdx\]\)\n    \]\);\n    loadDashboardData\(\);',
    r'saveServiceItem(list[nextIdx])\n    ]);\n    setServices(list);',
    text
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
