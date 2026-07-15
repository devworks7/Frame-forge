import re

with open("src/index.css", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("  overflow-x: hidden;\n", "")

with open("src/index.css", "w", encoding="utf-8") as f:
    f.write(text)

