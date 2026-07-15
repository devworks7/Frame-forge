import re

with open("src/components/AboutSection.tsx", "r", encoding="utf-8") as f:
    about_text = f.read()

about_text = about_text.replace(
    'className="relative py-32 sm:py-40 px-6 sm:px-12 lg:px-24 overflow-hidden"',
    'className="relative py-32 sm:py-40 px-6 sm:px-12 lg:px-24 overflow-clip"'
)

with open("src/components/AboutSection.tsx", "w", encoding="utf-8") as f:
    f.write(about_text)

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    hero_text = f.read()

hero_text = hero_text.replace(
    'className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 overflow-hidden py-32"',
    'className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 overflow-clip py-32"'
)

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(hero_text)

with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_text = f.read()

app_text = app_text.replace(
    'overflow-x-hidden',
    'overflow-x-clip'
)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_text)

