with open("src/types.ts", "r") as f:
    text = f.read()

text = text.replace(
    '  contactBusinessHours: string;\n  logoUrl?: string;\n}',
    '  contactBusinessHours: string;\n  logoUrl?: string;\n  pricingTitle?: string;\n  pricingSubtitle?: string;\n  pricingDesc?: string;\n}'
)

with open("src/types.ts", "w") as f:
    f.write(text)

with open("src/db/mongodb.ts", "r") as f:
    text2 = f.read()

text2 = text2.replace(
    '  logoUrl: { type: String, default: "" },\n});',
    '  logoUrl: { type: String, default: "" },\n  pricingTitle: { type: String, default: "STUDIO RATES" },\n  pricingSubtitle: { type: String, default: "Bespoke Packages" },\n  pricingDesc: { type: String, default: "Calibrated rates for elite video editing, motion design, and CGI." },\n});'
)

with open("src/db/mongodb.ts", "w") as f:
    f.write(text2)

with open("src/lib/seedData.ts", "r") as f:
    text3 = f.read()

text3 = text3.replace(
    '  contactBusinessHours: "Mon-Fri: 10:00 - 19:00",\n};',
    '  contactBusinessHours: "Mon-Fri: 10:00 - 19:00",\n  pricingTitle: "STUDIO RATES",\n  pricingSubtitle: "Bespoke Packages",\n  pricingDesc: "Calibrated rates for elite video editing, motion design, and CGI.",\n};'
)

with open("src/lib/seedData.ts", "w") as f:
    f.write(text3)

