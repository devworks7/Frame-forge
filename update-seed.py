with open("src/lib/seedData.ts", "r") as f:
    text = f.read()

text = text.replace(
    'import { PortfolioItem, PDFDoc, Testimonial, FAQItem, SectionContent, ServiceItem } from "../types.js";',
    'import { PortfolioItem, PDFDoc, Testimonial, FAQItem, SectionContent, ServiceItem, PricingPackage } from "../types.js";'
)

new_content = '''
export const DEFAULT_PACKAGES: PricingPackage[] = [
  {
    id: "pkg-1",
    name: "Standard Cut",
    price: "€2,500",
    period: "per minute",
    desc: "Ideal for boutique brands and digital leaders seeking cinematic-grade marketing cuts.",
    features: [
      "Cinematic Edit Assembly",
      "Classic Color Science",
      "Baseline Sound Treatment",
      "FHD Master Delivery",
      "Unlimited Broadcast Licensing"
    ],
    popular: false,
    order: 1,
    enabled: true
  },
  {
    id: "pkg-2",
    name: "Cinematic Master",
    price: "€6,000",
    period: "per minute",
    desc: "Built for luxury labels and complex productions requiring high-poly CGI and VFX.",
    features: [
      "High-Poly 3D Modeling",
      "Environmental VFX Compositing",
      "DaVinci Film Color Grading",
      "Spatial Audio Scoring",
      "Uncompressed 4K master"
    ],
    popular: true,
    order: 2,
    enabled: true
  }
];
'''
text = text + new_content

with open("src/lib/seedData.ts", "w") as f:
    f.write(text)
