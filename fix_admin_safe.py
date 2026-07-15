import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-50 bg-[#060608] flex flex-col"',
    'className="fixed inset-0 z-50 bg-[#060608] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"'
)

text = text.replace(
    '<div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0c]">',
    '<div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#0a0a0c] gap-4 sm:gap-0">'
)

text = text.replace(
    '<div className="flex items-center space-x-4">',
    '<div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">'
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
