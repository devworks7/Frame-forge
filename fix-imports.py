with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'ArrowUp, ArrowDown, Plus, HelpCircle, UserPlus, Sparkles, X, Edit, Boxes',
    'ArrowUp, ArrowDown, Plus, HelpCircle, UserPlus, Sparkles, X, Edit, Boxes, Database, Edit2'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
