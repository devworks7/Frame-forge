with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    '    </div>\n  );\n}\n',
    '    </div>\n  );\n});\n'
)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(text)

