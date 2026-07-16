import re

with open("src/db/mongodb.ts", "r") as f:
    text = f.read()

text = text.replace(
    'import {',
    'import {\n  DEFAULT_PACKAGES,'
)

package_schema = '''
// 10. PricingPackage Model
const PricingPackageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  period: { type: String, required: true },
  desc: { type: String, required: true },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  order: { type: Number, required: true, default: 0 },
  enabled: { type: Boolean, default: true },
});
export const PricingPackage = (mongoose.models.PricingPackage || mongoose.model("PricingPackage", PricingPackageSchema)) as mongoose.Model<any>;

// 9. SectionContent Model
'''
text = text.replace('// 9. SectionContent Model', package_schema)

seeding = '''
    // 7. PricingPackage
    const packageCount = await PricingPackage.countDocuments();
    if (packageCount === 0) {
      console.log("Seeding PricingPackages into MongoDB...");
      await PricingPackage.insertMany(DEFAULT_PACKAGES);
    }
'''
text = text.replace('console.log("Seeding complete.");', seeding + '\n    console.log("Seeding complete.");')

with open("src/db/mongodb.ts", "w") as f:
    f.write(text)
