import re

with open("src/components/PricingDocuments.tsx", "r") as f:
    text = f.read()

text = text.replace("""    getPricingPackages().then(data => {
      setPlans((Array.isArray(data) ? data : []).filter(p => p.enabled).sort((a, b) => a.order - b.order));
    });
    getPDFDocuments().then(data => {
      setDocuments((Array.isArray(data) ? data : []).filter(d => d.downloadsAllowed).sort((a, b) => a.order - b.order));
    });""", """    getPricingPackages()
      .then(data => {
        setPlans((Array.isArray(data) ? data : []).filter(p => p.enabled).sort((a, b) => a.order - b.order));
      })
      .catch(() => setPlans([]));
      
    getPDFDocuments()
      .then(data => {
        setDocuments((Array.isArray(data) ? data : []).filter(d => d.downloadsAllowed).sort((a, b) => a.order - b.order));
      })
      .catch(() => setDocuments([]));""")

with open("src/components/PricingDocuments.tsx", "w") as f:
    f.write(text)
