with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'import { PortfolioItem, PDFDoc, ClientRequest, FAQItem, Testimonial, SectionContent, Analytics, RecentActivity, ServiceItem } from "../types";',
    'import { PortfolioItem, PDFDoc, ClientRequest, FAQItem, Testimonial, SectionContent, Analytics, RecentActivity, ServiceItem, PricingPackage } from "../types";'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
