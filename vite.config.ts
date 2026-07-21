import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Vercel-like API routing plugin for local development
function vercelApiPlugin() {
  return {
    name: 'vercel-like-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const urlObj = new URL(req.url || '', 'http://localhost');
        const pathname = urlObj.pathname;

        if (pathname.startsWith('/api')) {
          // Parse query parameters
          req.query = Object.fromEntries(urlObj.searchParams.entries());

          // Parse body for POST/PUT if bodyParser is not disabled
          if ((req.method === 'POST' || req.method === 'PUT') && pathname !== '/api/admin/upload' && pathname !== '/api/upload') {
            req.body = await new Promise((resolve) => {
              let bodyData = '';
              req.on('data', chunk => { bodyData += chunk; });
              req.on('end', () => {
                try {
                  resolve(JSON.parse(bodyData));
                } catch {
                  const params = new URLSearchParams(bodyData);
                  resolve(Object.fromEntries(params.entries()));
                }
              });
            });
          }

          // Vercel-like response helpers
          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          res.json = (obj: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(obj));
            return res;
          };
          res.send = (data: any) => {
            if (typeof data === 'object') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } else {
              res.end(data);
            }
            return res;
          };
          res.redirect = (url: string) => {
            res.writeHead(302, { Location: url });
            res.end();
            return res;
          };

          // Route file mapping
          let filePath = '';
          if (pathname === '/api/admin/upload' || pathname === '/api/upload') {
            filePath = './api/upload.ts';
          } else if (pathname === '/api/health' || pathname === '/api/db-status' || pathname.startsWith('/api/stream-video/') || pathname.startsWith('/api/documents/')) {
            filePath = './api/system.ts';
          } else if (pathname === '/api/notify-email' || pathname === '/api/notify') {
            filePath = './api/notify.ts';
          } else if (pathname.startsWith('/api/admin')) {
            filePath = './api/admin.ts';
          } else if (pathname.startsWith('/api/db')) {
            filePath = './api/db.ts';
          }

          if (filePath) {
            try {
              const modulePath = path.resolve(process.cwd(), filePath);
              const apiModule = await server.ssrLoadModule(modulePath);
              await apiModule.default(req, res);
              return;
            } catch (err: any) {
              console.error(`Error loading API route ${filePath}:`, err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || "Internal Server Error" }));
              return;
            }
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: "API Route Not Found" }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), vercelApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'lucide-vendor';
              }
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'motion-vendor';
              }
              if (id.includes('three') || id.includes('@react-three')) {
                return 'three-vendor';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
