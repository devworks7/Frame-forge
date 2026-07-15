with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'className="fixed inset-0 z-40 bg-[#070b0e]/98 backdrop-blur-2xl flex flex-col justify-between pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(2.5rem+env(safe-area-inset-bottom))] px-6 sm:px-12 md:hidden overflow-y-auto"',
    'className="fixed inset-0 z-40 bg-[#070b0e]/98 backdrop-blur-2xl flex flex-col justify-start pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(2.5rem+env(safe-area-inset-bottom))] px-6 sm:px-12 md:hidden overflow-y-auto"'
)

text = text.replace(
    '<div className="flex flex-col space-y-10 my-auto">',
    '<div className="flex flex-col space-y-10 py-10 min-h-full justify-center">'
)

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(text)

