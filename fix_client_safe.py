import re

with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center md:items-start py-0 px-0 sm:py-12 sm:px-6 animate-opacity-fade"',
    'className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center md:items-start py-0 px-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-12 sm:pb-12 sm:px-6 animate-opacity-fade"'
)

with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
