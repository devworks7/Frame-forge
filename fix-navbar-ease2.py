import re

with open("src/components/Navbar.tsx", "r") as f:
    text = f.read()

text = re.sub(r'ease:\s*"[^"]*",?', '', text)
text = re.sub(r'ease:\s*\[[^\]]+\]\s*,?', '', text)

with open("src/components/Navbar.tsx", "w") as f:
    f.write(text)
