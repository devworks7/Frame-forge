import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = re.sub(r'const \[contentSaveSuccess, setContentSaveSuccess\] = useState\(false\);\n?', '', text)
text = re.sub(
    r'\{contentSaveSuccess && \(\s*<span className="text-green-400 font-mono text-\[11px\] animate-fade-in">\s*✓ Website configurations saved successfully!\s*</span>\s*\)\}',
    '', text)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
