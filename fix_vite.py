import re

with open('vite.config.ts', 'r') as f:
    content = f.read()

content = content.replace(" && pathname !== '/api/admin/upload' && pathname !== '/api/upload'", "")
content = content.replace("          if (pathname === '/api/admin/upload' || pathname === '/api/upload') {\n            filePath = './api/upload.ts';\n          } else if (pathname === '/api/health'", "          if (pathname === '/api/health'")

with open('vite.config.ts', 'w') as f:
    f.write(content)
