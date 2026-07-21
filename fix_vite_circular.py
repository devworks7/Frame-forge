import re

with open('vite.config.ts', 'r') as f:
    content = f.read()

content = content.replace("""              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
""", "")

with open('vite.config.ts', 'w') as f:
    f.write(content)
