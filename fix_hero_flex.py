import re

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 overflow-clip py-32"',
    'className="relative min-h-[100dvh] flex flex-col items-center px-6 sm:px-12 lg:px-20 overflow-clip py-32 sm:py-40"'
)

text = text.replace(
    '<div className="max-w-5xl mx-auto text-center space-y-16 z-10">',
    '<div className="max-w-5xl mx-auto text-center space-y-16 z-10 my-auto">'
)

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(text)

