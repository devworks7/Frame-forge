import re
with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace('      </div>iv>\n      </div>', '      </div>')

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
