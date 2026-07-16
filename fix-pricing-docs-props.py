with open("src/components/PricingDocuments.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'import { PDFDoc, PricingPackage } from "../types";',
    'import { PDFDoc, PricingPackage, SectionContent } from "../types";'
)

text = text.replace(
    'export default function PricingDocuments() {',
    'export default function PricingDocuments({ content }: { content: SectionContent | null }) {'
)

text = text.replace(
    'STUDIO RATES',
    '{content?.pricingTitle || "STUDIO RATES"}'
)

text = text.replace(
    'Bespoke Packages',
    '{content?.pricingSubtitle || "Bespoke Packages"}'
)

text = text.replace(
    'Calibrated rates for elite video editing, motion design, and CGI.',
    '{content?.pricingDesc || "Calibrated rates for elite video editing, motion design, and CGI."}'
)

with open("src/components/PricingDocuments.tsx", "w") as f:
    f.write(text)

with open("src/App.tsx", "r") as f:
    text2 = f.read()

text2 = text2.replace(
    '<PricingDocuments />',
    '<PricingDocuments content={siteContent} />'
)

with open("src/App.tsx", "w") as f:
    f.write(text2)
