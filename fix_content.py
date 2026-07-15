import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(
    r'await saveSectionContent\(content\);\s*await loadDashboardData\(\);',
    r'await saveSectionContent(content);',
    text
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
