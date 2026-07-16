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
});

const SectionContent = mongoose.model("SectionContent", SectionContentSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected");
  
  await SectionContent.updateOne({}, {
    $set: {
      aboutText: "Frame Forge creates premium websites, cinematic video edits, and digital experiences for businesses that want to stand out. By combining modern design, creative storytelling, and AI-powered workflows, we deliver polished, high-quality work tailored to each client's goals and brand identity."
    }
  });
  console.log("Updated");
  process.exit(0);
}

run();
