import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# I will find every `if (confirm(` block and wrap the body in try/catch

pattern = r'(if\s*\(confirm\([^)]+\)\)\s*\{)([^}]+)(\})'

def repl(m):
    start = m.group(1)
    body = m.group(2)
    end = m.group(3)
    # The body has indentation. Let's just wrap it.
    wrapped = f"\n      try {{{body}      }} catch (err: any) {{\n        alert(err.message || \"Deletion failed\");\n      }}\n    "
    return start + wrapped + end

text = re.sub(pattern, repl, text)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
