import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace("import { uploadBufferToCloudinary, verifySession } from './api/utils/db-helper.js';", "import { uploadBufferToCloudinary, verifySession, cloudinaryStorage } from './api/utils/db-helper.js';")

multer_init_old = """  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB
  });"""
multer_init_new = """  const upload = multer({ 
    storage: cloudinaryStorage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB
  });"""

content = content.replace(multer_init_old, multer_init_new)

upload_route_old = """      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      if (req.file.size > 100 * 1024 * 1024) { 
        return res.status(400).json({ error: { message: "File exceeds 100MB limit" }});
      }

      const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname, req.file.mimetype);
      
      return res.json({
        secure_url: result.secure_url,
        duration: result.duration,
        public_id: result.public_id
      });"""

upload_route_new = """      if (!req.file) return res.status(400).json({ error: { message: "No file uploaded" } });

      const fileData = req.file as any;
      return res.json({
        secure_url: fileData.secure_url,
        duration: fileData.duration,
        public_id: fileData.public_id
      });"""

content = content.replace(upload_route_old, upload_route_new)

with open('server.ts', 'w') as f:
    f.write(content)
