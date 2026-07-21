import re

with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace("  scroll-behavior: smooth;\n", "")

with open('src/index.css', 'w') as f:
    f.write(content)
