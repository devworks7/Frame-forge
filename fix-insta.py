with open("src/components/ContactSection.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'href={content.contactInstagram || "https://instagram.com/frameforge"}',
    'href={content.contactInstagram || "https://www.instagram.com/frameforgestudios.001?igsh=MTB4cm9lMWttanhxaQ=="}'
)

with open("src/components/ContactSection.tsx", "w", encoding="utf-8") as f:
    f.write(text)

with open("src/lib/seedData.ts", "r", encoding="utf-8") as f:
    text2 = f.read()

text2 = text2.replace(
    'contactInstagram: "https://instagram.com/frameforge"',
    'contactInstagram: "https://www.instagram.com/frameforgestudios.001?igsh=MTB4cm9lMWttanhxaQ=="'
)

with open("src/lib/seedData.ts", "w", encoding="utf-8") as f:
    f.write(text2)

