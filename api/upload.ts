import multer from "multer";
import { connectToDatabase, verifySession, uploadBufferToCloudinary } from "./utils/db-helper.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB upload limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/quicktime",
      "video/webm",
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only videos, PDFs, and images are allowed."));
    }
  },
});

const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
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

    // Run multer middleware manually
    await runMiddleware(req, res, upload.single("file"));

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname, req.file.mimetype);
    
    // For video files on Cloudinary, we can derive a thumbnail by changing extension to .jpg
    // We will use standard string replacement for simplicity.
    const isVideo = req.file.mimetype.startsWith("video/");
    const thumbnailUrl = isVideo && result.secure_url ? result.secure_url.replace(/\.[^/.]+$/, ".jpg") : result.secure_url;

    return res.json({
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
      fileName: result.public_id,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      path: result.secure_url,
      format: result.format,
      duration: result.duration,
      width: result.width,
      height: result.height,
      thumbnail: thumbnailUrl
    });
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err);
    return res.status(500).json({ error: err.message || "Failed to upload file to Cloudinary." });
  }
}
