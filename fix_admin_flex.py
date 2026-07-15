import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-50 overflow-y-auto bg-black flex justify-center items-center px-4"',
    'className="fixed inset-0 z-50 overflow-y-auto bg-black flex justify-center sm:items-center items-start py-8 sm:py-0 px-4"'
)
text = text.replace(
    'className="fixed inset-0 z-50 bg-black flex justify-center items-center px-4"',
    'className="fixed inset-0 z-50 overflow-y-auto bg-black flex justify-center sm:items-center items-start py-8 sm:py-0 px-4"'
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)

