with open("server.ts", "r") as f:
    content = f.read()

import re

# Remove import uploadApi
content = re.sub(r"import uploadApi from '\./api/upload\.js';\n", "", content)

# Replace app.use logic for /api/admin/upload
content = re.sub(r"if \(req\.path\.startsWith\('/api/admin/upload'\) \|\| req\.path\.startsWith\('/api/upload'\)\) \{\n\s*next\(\);\n\s*\} else \{\n\s*express\.json\(\{ limit: '50mb' \}\)\(req, res, next\);\n\s*\}", "express.json({ limit: '50mb' })(req, res, next);", content)

# Remove /api/upload route logic
route_pattern = r"if \(pathname === '/api/admin/upload' \|\| pathname === '/api/upload'\) \{\n\s*return await uploadApi\(req, res\);\n\s*\} else "
content = re.sub(route_pattern, "", content)

with open("server.ts", "w") as f:
    f.write(content)
