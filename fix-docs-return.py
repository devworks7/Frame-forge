with open("src/components/PricingDocuments.tsx", "r") as f:
    text = f.read()

text = text.replace(
    '  }, []);\n\n    <div',
    '  }, []);\n\n  return (\n    <div'
)

with open("src/components/PricingDocuments.tsx", "w") as f:
    f.write(text)
