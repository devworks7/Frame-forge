import re

with open('api/utils/db-helper.ts', 'r') as f:
    content = f.read()

# Remove the custom multer engine and the buffer upload
content = re.sub(r'// Cloudinary Multer Storage Engine.*', '', content, flags=re.DOTALL)

with open('api/utils/db-helper.ts', 'w') as f:
    f.write(content)
