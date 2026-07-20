import re

with open("src/App.tsx", "r") as f:
    text = f.read()

# Remove the input focus useEffect
pattern_focus = r"  // Global auto-scroll for inputs on mobile\n  useEffect\(\(\) => \{\n    const handleFocus = \(e: FocusEvent\) => \{\n      const target = e.target as HTMLElement;\n      if \(target && \(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT'\)\) \{\n        setTimeout\(\(\) => \{\n          target.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\);\n        \}, 300\);\n      \}\n    \};\n    window.addEventListener\('focus', handleFocus, true\);\n    return \(\) => window.removeEventListener\('focus', handleFocus, true\);\n  \}, \[\]\);\n"
text = re.sub(pattern_focus, "", text)

# Remove window.scrollTo from handlePageChange
pattern_page_change = r"""  const handlePageChange = React.useCallback\(\(page: "home" | "pricing" | "proposal"\) => \{
    if \(page === "proposal"\) \{
      setShowRequests\(true\);
    \} else \{
      setCurrentPage\(page\);
      window\.scrollTo\(\{ top: 0, behavior: "smooth" \}\);
    \}
  \}, \[\]\);"""

replacement_page_change = """  const handlePageChange = React.useCallback((page: "home" | "pricing" | "proposal") => {
    if (page === "proposal") {
      setShowRequests(true);
    } else {
      setCurrentPage(page);
    }
  }, []);"""
text = text.replace(pattern_page_change, replacement_page_change)

with open("src/App.tsx", "w") as f:
    f.write(text)
