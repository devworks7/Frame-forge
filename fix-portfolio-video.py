import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

# Replace parent padding and video margins
text = text.replace(
    '<div className="max-w-4xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">',
    '<div className="max-w-4xl mx-auto w-full p-0 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">'
)

text = text.replace(
    '<div className="lg:col-span-7 relative md:rounded-xl overflow-hidden border-y md:border border-white/10 bg-black aspect-video shadow-lg -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full max-h-[70vh] md:max-h-none flex items-center shrink-0">',
    '<div className="lg:col-span-7 relative md:rounded-xl overflow-hidden md:border border-white/10 bg-black aspect-video shadow-lg w-full max-h-[70vh] md:max-h-none flex items-center shrink-0">'
)

# And make sure details section has padding on mobile
text = text.replace(
    '<div className="lg:col-span-5 space-y-6">',
    '<div className="lg:col-span-5 space-y-6 p-6 md:p-0 pt-0">'
)

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
