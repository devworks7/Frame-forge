import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace("import cloudinarySignApi from './api/cloudinary-sign.js';", "import cloudinarySignApi from './api/cloudinary-sign.js';\nimport uploadApi from './api/upload.js';")

multer_app_post = """  const upload = multer({ 
    storage: cloudinaryStorage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB
  });

  app.post('/api/upload', async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];
      if (!token) return res.status(403).json({ error: "Unauthorized" });

      const isValid = await verifySession(token);
      if (!isValid) return res.status(403).json({ error: "Unauthorized" });

      next();
    } catch (e) {
      res.status(500).json({ error: "Auth verification failed" });
    }
  }, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: { message: "No file uploaded" } });

      const fileData = req.file as any;
      return res.json({
        secure_url: fileData.secure_url,
        duration: fileData.duration,
        public_id: fileData.public_id
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: { message: err.message || "Upload failed" }});
    }
  });"""

content = content.replace(multer_app_post, "")
content = content.replace("import multer from 'multer';\n", "")
content = content.replace("import { verifySession, cloudinaryStorage } from './api/utils/db-helper.js';\n", "")


content = content.replace("} else if (pathname.startsWith('/api/admin')) {", "} else if (pathname === '/api/upload' || pathname === '/api/admin/upload') {\n        return await uploadApi(req, res);\n      } else if (pathname.startsWith('/api/admin')) {")

with open('server.ts', 'w') as f:
    f.write(content)
