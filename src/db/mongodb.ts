import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  DEFAULT_PACKAGES,
  DEFAULT_PORTFOLIO,
  DEFAULT_PDFS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
  DEFAULT_CONTENT,
  DEFAULT_SERVICES
} from "../lib/seedData.js";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing in the backend configuration.");
  }
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB Atlas");
    await seedDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// ---------------------------------------------------------
// MONGOOSE SCHEMAS & MODELS
// ---------------------------------------------------------

// 1. Portfolio Model
const PortfolioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  clientName: { type: String },
  date: { type: String, required: true },
  softwareUsed: [{ type: String }],
  duration: { type: String, required: true },
  tags: [{ type: String }],
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export const Portfolio = (mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema)) as mongoose.Model<any>;

// 2. Services Model
const ServicesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  badge: { type: String, required: true },
  desc: { type: String, required: true },
  fullDescription: { type: String, required: true },
  iconName: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export const Service = (mongoose.models.Service || mongoose.model("Service", ServicesSchema)) as mongoose.Model<any>;

// 3. Testimonials Model
const TestimonialsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  company: { type: String },
  role: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  comment: { type: String, required: true },
  avatar: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export const Testimonial = (mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialsSchema)) as mongoose.Model<any>;

// 4. FAQs Model
const FAQsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export const FAQ = (mongoose.models.FAQ || mongoose.model("FAQ", FAQsSchema)) as mongoose.Model<any>;

// 5. ClientRequests Model
const ClientRequestsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  organizationName: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  projectType: { type: String, required: true },
  purpose: { type: String, required: true },
  budget: { type: String, required: true },
  deadline: { type: String, required: true },
  hearFrom: { type: String, required: true },
  description: { type: String, required: true },
  referenceLinks: { type: String },
  fileUrl: { type: String },
  fileName: { type: String },
  status: { type: String, required: true, enum: ['new', 'in_progress', 'completed', 'rejected'], default: 'new' },
  createdAt: { type: String, required: true },
});

export const ClientRequest = (mongoose.models.ClientRequest || mongoose.model("ClientRequest", ClientRequestsSchema)) as mongoose.Model<any>;

// 6. AdminUsers Model
const AdminUsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  mustChangePassword: { type: Boolean, required: true, default: true },
});

export const AdminUser = (mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUsersSchema)) as mongoose.Model<any>;

// 6b. Sessions Model for Vercel Serverless persistence
const SessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }
});

export const Session = (mongoose.models.Session || mongoose.model("Session", SessionSchema)) as mongoose.Model<any>;

// 7. Analytics Model
const AnalyticsSchema = new mongoose.Schema({
  totalVisitors: { type: Number, required: true, default: 452 },
  projectRequests: { type: Number, required: true, default: 18 },
  emailsReceived: { type: Number, required: true, default: 34 },
  videoViews: { type: Number, required: true, default: 1290 },
  pdfViews: { type: Number, required: true, default: 142 },
});

export const Analytics = (mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema)) as mongoose.Model<any>;

// 8. PDFDoc Model
const PDFDocSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  downloadsAllowed: { type: Boolean, required: true, default: true },
  order: { type: Number, required: true, default: 0 },
});

export const PDFDoc = (mongoose.models.PDFDoc || mongoose.model("PDFDoc", PDFDocSchema)) as mongoose.Model<any>;


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

const SectionContentSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  aboutTitle: { type: String, required: true },
  aboutQuote: { type: String, default: "" },
  aboutText: { type: String, required: true },
  aboutStats: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, default: "" },
  contactWhatsapp: { type: String, default: "" },
  contactInstagram: { type: String, default: "" },
  contactLinkedIn: { type: String, default: "" },
  contactLocation: { type: String, required: true },
  contactBusinessHours: { type: String, required: true },
  logoUrl: { type: String, default: "" },
  pricingTitle: { type: String, default: "STUDIO RATES" },
  pricingSubtitle: { type: String, default: "Bespoke Packages" },
  pricingDesc: { type: String, default: "Calibrated rates for elite video editing, motion design, and CGI." },
});

export const SectionContent = (mongoose.models.SectionContent || mongoose.model("SectionContent", SectionContentSchema)) as mongoose.Model<any>;

// 10. RecentActivity Model
const RecentActivitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export const RecentActivity = (mongoose.models.RecentActivity || mongoose.model("RecentActivity", RecentActivitySchema)) as mongoose.Model<any>;

// ---------------------------------------------------------
// DATABASE SEEDER
// ---------------------------------------------------------
async function seedDB() {
  try {
    console.log("Checking database collections for seeding...");

    // 1. Portfolio
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      console.log("Seeding portfolio items into MongoDB...");
      await Portfolio.insertMany(DEFAULT_PORTFOLIO);
    }

    // 2. Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log("Seeding services into MongoDB...");
      await Service.insertMany(DEFAULT_SERVICES);
    }

    // 3. Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      console.log("Seeding testimonials into MongoDB...");
      await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
    }

    // 4. FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      console.log("Seeding FAQs into MongoDB...");
      await FAQ.insertMany(DEFAULT_FAQS);
    }

    // 5. PDFDocs
    const pdfCount = await PDFDoc.countDocuments();
    if (pdfCount === 0) {
      console.log("Seeding PDF documents into MongoDB...");
      await PDFDoc.insertMany(DEFAULT_PDFS);
    }

    // 6. SectionContent
    const contentCount = await SectionContent.countDocuments();
    if (contentCount === 0) {
      console.log("Seeding SectionContent into MongoDB...");
      await SectionContent.create(DEFAULT_CONTENT);
    }

    // 7. Analytics
    const analyticsCount = await Analytics.countDocuments();
    if (analyticsCount === 0) {
      console.log("Seeding Analytics into MongoDB...");
      await Analytics.create({
        totalVisitors: 452,
        projectRequests: 18,
        emailsReceived: 34,
        videoViews: 1290,
        pdfViews: 142
      });
    }

    // 8. AdminUsers initialization
    try {
      console.log("Ensuring Admins collection exists...");
      await AdminUser.createCollection();
    } catch (e) {
      // Collection might already exist
    }

    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      console.log("Admins collection is empty. Seeding default administrator...");
      const passwordHash = await bcrypt.hash("devshubh07", 10);
      await AdminUser.create({
        username: "frameforge.com",
        passwordHash,
        mustChangePassword: false,
      });
      console.log("Default administrator seeded successfully!");
    } else {
      console.log("Admins collection is not empty. Skipping admin seeding.");
    }

    console.log("Seeding check completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}
