with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("text-white/70 leading-[1.7]", "text-white/80 leading-[1.7]")

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)
