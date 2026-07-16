import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center md:items-start py-0 px-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-12 sm:pb-12 sm:px-6 animate-opacity-fade"',
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex flex-col md:items-center py-0 px-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-12 sm:pb-12 sm:px-6 animate-opacity-fade"'
)

text = text.replace(
    'className="max-w-3xl w-full min-h-[100dvh] sm:min-h-0 sm:rounded-2xl liquid-glass border-0 sm:border border-white/10 shadow-2xl relative overflow-hidden animate-subtle-scale bg-[#080d12]/95"',
    'className="max-w-3xl w-full min-h-max flex-1 sm:flex-none sm:rounded-2xl liquid-glass border-0 sm:border border-white/10 shadow-2xl relative animate-subtle-scale bg-[#080d12]/95"'
)

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
