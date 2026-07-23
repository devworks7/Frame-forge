import re

with open('server.ts', 'r') as f:
    content = f.read()

upload_route_new = """  app.post('/api/upload', async (req, res, next) => {
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

content = re.sub(r"  app\.post\('/api/upload', upload\.single\('file'\), async \(req, res\) => \{[\s\S]*?\}\);\n", upload_route_new + "\n", content)

with open('server.ts', 'w') as f:
    f.write(content)
