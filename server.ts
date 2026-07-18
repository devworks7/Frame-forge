import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import adminApi from './api/admin.js';
import dbApi from './api/db.js';
import notifyApi from './api/notify.js';
import systemApi from './api/system.js';
import cloudinarySignApi from './api/cloudinary-sign.js';


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use((req, res, next) => {
    express.json({ limit: '50mb' })(req, res, next);
  });
  
  const routeApi = async (req: any, res: any) => {
    const pathname = req.path;
    try {
      if (pathname === '/api/cloudinary-sign') {
        return await cloudinarySignApi(req, res);
      } else if (pathname === '/api/health' || pathname === '/api/db-status' || pathname.startsWith('/api/stream-video/') || pathname.startsWith('/api/documents/')) {
        return await systemApi(req, res);
      } else if (pathname === '/api/notify-email' || pathname === '/api/notify') {
        return await notifyApi(req, res);
      } else if (pathname.startsWith('/api/admin')) {
        return await adminApi(req, res);
      } else if (pathname.startsWith('/api/db')) {
        return await dbApi(req, res);
      }
    } catch (err: any) {
      console.error("API error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || "Internal Server Error" });
      }
      return;
    }
    if (!res.headersSent) {
      res.status(404).json({ error: "API Route Not Found" });
    }
  };

  app.all('/api/*', routeApi);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
