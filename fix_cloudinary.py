import re

with open('api/utils/db-helper.ts', 'r') as f:
    content = f.read()

content = content.replace("chunk_size: 20000000", "chunk_size: 5000000") # 5MB chunks to bypass 10MB limit

with open('api/utils/db-helper.ts', 'w') as f:
    f.write(content)
