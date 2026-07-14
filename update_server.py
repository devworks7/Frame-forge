with open("server.ts", "r") as f:
    content = f.read()

import re
content = content.replace("import uploadApi from './api/upload.js';", "import uploadApi from './api/upload.js';\nimport cloudinarySignApi from './api/cloudinary-sign.js';")
content = content.replace("} else if (pathname === '/api/health'", "} else if (pathname === '/api/cloudinary/sign') {\n        return await cloudinarySignApi(req, res);\n      } else if (pathname === '/api/health'")

with open("server.ts", "w") as f:
    f.write(content)
