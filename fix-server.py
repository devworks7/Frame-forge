import re

with open("server.ts", "r") as f:
    content = f.read()

content = content.replace("import cloudinarySignApi from './api/cloudinary-sign.js';", "import cloudinarySignApi from './api/cloudinary-sign.js';\nimport blobUploadApi from './api/blob-upload.js';")
content = content.replace("      if (pathname === '/api/cloudinary-sign') {", "      if (pathname === '/api/blob-upload') {\n        return await blobUploadApi(req, res);\n      } else if (pathname === '/api/cloudinary-sign') {")

with open("server.ts", "w") as f:
    f.write(content)
