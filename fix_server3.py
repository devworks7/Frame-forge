import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace("import uploadApi from './api/upload.js';", "")
content = content.replace("} else if (pathname === '/api/upload' || pathname === '/api/admin/upload') {\n        return await uploadApi(req, res);\n      ", "")
content = content.replace("} else if (pathname === '/api/upload' || pathname === '/api/admin/upload') {\n        return await uploadApi(req, res);\n      ", "") # in case

with open('server.ts', 'w') as f:
    f.write(content)
