import re

with open("src/App.tsx", "r") as f:
    text = f.read()

effect = """
  // Global auto-scroll for inputs on mobile
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };
    window.addEventListener('focus', handleFocus, true);
    return () => window.removeEventListener('focus', handleFocus, true);
  }, []);
"""

text = re.sub(r'(export default function App\(\) \{\n)', r'\1' + effect, text, count=1)

with open("src/App.tsx", "w") as f:
    f.write(text)
