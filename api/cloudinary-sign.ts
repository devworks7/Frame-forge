import { connectToDatabase, verifySession, getCloudinary } from "./utils/db-helper.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Unauthorized admin access" });
  }

  try {
    await connectToDatabase();
    
    const isSessionValid = await verifySession(token);
    if (!isSessionValid) {
      return res.status(403).json({ error: "Unauthorized admin access" });
    }

    const cloudinary = getCloudinary();
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const paramsToSign = {
      timestamp: timestamp,
      folder: "frameforge"
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return res.json({
      success: true,
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "frameforge"
    });
  } catch (err: any) {
    console.error("Cloudinary signing failed:", err);
    return res.status(500).json({ error: err.message || "Failed to sign Cloudinary request." });
  }
}
