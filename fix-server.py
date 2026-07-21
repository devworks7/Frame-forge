import re
with open("server.ts", "r") as f:
    text = f.read()

imports = """import multer from 'multer';
import { uploadBufferToCloudinary, verifySession } from './api/utils/db-helper.js';"""

text = text.replace("import express from 'express';", "import express from 'express';\n" + imports)

upload_route = """  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB
  });

  app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];
      if (!token) return res.status(403).json({ error: "Unauthorized" });
      const isValid = await verifySession(token);
      if (!isValid) return res.status(403).json({ error: "Unauthorized" });

      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      if (req.file.size > 100 * 1024 * 1024) {
         return res.status(400).json({ error: { message: "File exceeds 100MB limit" }});
      }

      const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname, req.file.mimetype);
      
      return res.json({
        secure_url: result.secure_url,
        duration: result.duration,
        public_id: result.public_id
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: { message: err.message || "Upload failed" }});
    }
  });

  const routeApi ="""

text = text.replace("  const routeApi =", upload_route)

with open("server.ts", "w") as f:
    f.write(text)
