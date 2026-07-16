import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const SectionContentSchema = new mongoose.Schema({
  heroHeadline: String,
  heroSubheadline: String,
  aboutTitle: String,
  aboutQuote: String,
  aboutText: String,
  contactText: String,
  contactInstagram: String,
});

const SectionContent = mongoose.model("SectionContent", SectionContentSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected");
  
  await SectionContent.updateOne({}, {
    $set: {
      contactInstagram: "https://www.instagram.com/frameforgestudios.001?igsh=MTB4cm9lMWttanhxaQ=="
    }
  });
  console.log("Updated");
  process.exit(0);
}

run();
