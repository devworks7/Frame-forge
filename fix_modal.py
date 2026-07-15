import re

with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center items-start py-12 px-6 animate-opacity-fade"',
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center md:items-start py-0 px-0 sm:py-12 sm:px-6 animate-opacity-fade"'
)

text = text.replace(
    'className="max-w-3xl w-full rounded-2xl liquid-glass border border-white/10 shadow-2xl relative overflow-hidden animate-subtle-scale bg-[#080d12]/95"',
    'className="max-w-3xl w-full min-h-screen sm:min-h-0 sm:rounded-2xl liquid-glass border-0 sm:border border-white/10 shadow-2xl relative overflow-hidden animate-subtle-scale bg-[#080d12]/95"'
)

text = text.replace(
    'className="p-2 rounded-full liquid-glass hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer border border-white/5"',
    'className="p-3 md:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full liquid-glass hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer border border-white/5"'
)

with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)

