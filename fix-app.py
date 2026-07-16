with open("src/App.tsx", "r") as f:
    text = f.read()

text = text.replace(
    '  checkInitialSeed,\n  getSectionContent,\n  incrementAnalytics,',
    '  checkInitialSeed,\n  getSectionContent,\n  incrementAnalytics,\n  preloadPricingAndDocuments,'
)

text = text.replace(
    '      const c = await getSectionContent();',
    '      preloadPricingAndDocuments();\n      const c = await getSectionContent();'
)

with open("src/App.tsx", "w") as f:
    f.write(text)
