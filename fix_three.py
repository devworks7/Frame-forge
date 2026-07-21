import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'import ThreeBackground from "./components/ThreeBackground";\n', '', content)
content = re.sub(r'<ThreeBackground />\n?', '', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
