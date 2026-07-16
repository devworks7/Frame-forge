import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    '<div className="border border-white/5 rounded-2xl bg-[#0a0a0c] overflow-hidden overflow-x-auto">',
    '<div className="hidden md:block border border-white/5 rounded-2xl bg-[#0a0a0c] overflow-hidden overflow-x-auto">'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
