with open("src/db/mongodb.ts", "r") as f:
    text = f.read()

seeding = '''
    // 7. PricingPackage
    const packageCount = await PricingPackage.countDocuments();
    if (packageCount === 0) {
      console.log("Seeding PricingPackages into MongoDB...");
      await PricingPackage.insertMany(DEFAULT_PACKAGES);
    }
  } catch (err) {
'''

text = text.replace('  } catch (err) {\n    console.error("Error during database seeding:", err);', seeding + '    console.error("Error during database seeding:", err);')

with open("src/db/mongodb.ts", "w") as f:
    f.write(text)
