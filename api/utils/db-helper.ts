import mongoose from "mongoose";
import crypto from "crypto";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "../../src/db/mongodb.js";
import * as models from "../../src/db/mongodb.js";

// Cache database connection state across serverless invocations
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await connectDB();
    isConnected = true;
  } catch (err: any) {
    isConnected = false;
    throw new Error(err.message || "Failed to connect to MongoDB Atlas");
  }
}

export async function verifySession(token: string): Promise<boolean> {
  if (!token) return false;
  await connectToDatabase();
  try {
    const session = await models.Session.findOne({ token });
    return !!session;
  } catch (err) {
    console.error("Session verification error:", err);
    return false;
  }
}

export async function createSession(token: string): Promise<void> {
  await connectToDatabase();
  await models.Session.create({ token });
}

export async function deleteSession(token: string): Promise<void> {
  await connectToDatabase();
  await models.Session.deleteOne({ token });
}

export function getModelForCollection(collectionName: string) {
  switch (collectionName) {
    case "portfolio":
      return models.Portfolio;
    case "services":
      return models.Service;
    case "testimonials":
      return models.Testimonial;
    case "faqs":
      return models.FAQ;
    case "pdfs":
      return models.PDFDoc;
    case "packages":
      return models.PricingPackage;
    case "requests":
      return models.ClientRequest;
    case "activities":
      return models.RecentActivity;
    case "settings_content":
      return models.SectionContent;
    case "settings_analytics":
      return models.Analytics;
    default:
      return null;
  }
}

// Lazy initialize Cloudinary config
export const getCloudinary = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return cloudinary;
};

// Helper function to upload buffer to Cloudinary (no disk usage in serverless)
export function uploadBufferToCloudinary(buffer: Buffer, originalName: string, mimeType: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const client = getCloudinary();
      const cleanName = path.parse(originalName).name.replace(/[^a-zA-Z0-9]/g, "_");
      const uniqueSuffix = crypto.randomBytes(4).toString("hex");
      const publicId = `ff_${cleanName}_${uniqueSuffix}`;

      const uploadStream = client.uploader.upload_stream(
        {
          folder: "frameforge",
          resource_type: "auto",
          public_id: publicId,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      uploadStream.end(buffer);
    } catch (err) {
      reject(err);
    }
  });
}
