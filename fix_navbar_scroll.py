import re

with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    text = f.read()

scroll_lock = r'''  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);'''

text = re.sub(r'  useEffect\(\(\) => \{\n    if \(isMobileMenuOpen\) \{\n      document\.body\.style\.overflow = "hidden";\n    \} else \{\n      document\.body\.style\.overflow = "";\n    \}\n    return \(\) => \{\n      document\.body\.style\.overflow = "";\n    \};\n  \}, \[isMobileMenuOpen\]\);', scroll_lock, text)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(text)

