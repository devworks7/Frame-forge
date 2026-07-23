import multer from 'multer';
import { verifySession, cloudinaryStorage } from './utils/db-helper.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 100 * 1024 * 1024 }
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Unauthorized" });

    const isValid = await verifySession(token);
    if (!isValid) return res.status(403).json({ error: "Unauthorized" });

    await runMiddleware(req, res, upload.single('file'));

    if (!req.file) return res.status(400).json({ error: { message: "No file uploaded" } });

    const fileData = req.file as any;
    return res.json({
      secure_url: fileData.secure_url,
      duration: fileData.duration,
      public_id: fileData.public_id
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: { message: err.message || "Upload failed", code: err.http_code }});
  }
}
