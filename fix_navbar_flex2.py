with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    '<div className="flex flex-col space-y-10 py-10 min-h-full justify-center">',
    '<div className="flex flex-col space-y-8 py-8 w-full">'
)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(text)

