import re

with open('src/components/AdminPanel.tsx', 'r') as f:
    content = f.read()

# Replace inner const isPdf with just using the outer one
content = content.replace("""        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        const resourceType = isPdf ? "raw" : "auto";""", """        const resourceType = isPdf ? "raw" : "auto";""")

with open('src/components/AdminPanel.tsx', 'w') as f:
    f.write(content)
