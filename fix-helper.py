with open("api/utils/db-helper.ts", "r") as f:
    text = f.read()

text = text.replace(
    '    case "pdfs":\n      return models.PDFDoc;',
    '    case "pdfs":\n      return models.PDFDoc;\n    case "packages":\n      return models.PricingPackage;'
)

with open("api/utils/db-helper.ts", "w") as f:
    f.write(text)
