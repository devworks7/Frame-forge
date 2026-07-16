import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Add effect after state declarations (around line 100 or so)
effect = """
  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        } else if (!editingProject && !editingPdf && !editingFaq && !editingTestimonial && !editingService && !editingPackage) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, onClose, editingProject, editingPdf, editingFaq, editingTestimonial, editingService, editingPackage]);
"""

# Let's just insert it after the useEffect that fetches db status
# But wait, there might be other things. Let's just put it right after the first useEffect.
# Actually, I can put it right before `useEffect(() => { async function fetchDbStatus() {`
text = re.sub(r'(  useEffect\(\(\) => \{\n    async function fetchDbStatus\(\) \{)', effect + r'\n\1', text, count=1)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
