import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

# Make the submit button full width on mobile
text = text.replace(
    'className={`px-8 py-3.5 rounded-full font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase flex items-center space-x-2.5 transition-all cursor-pointer hover-lift',
    'className={`w-full sm:w-auto justify-center px-8 py-3.5 rounded-full font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase flex items-center space-x-2.5 transition-all cursor-pointer hover-lift min-h-[44px]'
)
# Note: min-h-[44px] might be duplicated from my previous script. Let's be careful.

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
