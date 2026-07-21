import re

with open('vite.config.ts', 'r') as f:
    content = f.read()

manual_chunks = """    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
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
"""

content = content.replace("    server: {", f"{manual_chunks}    server: {{")

with open('vite.config.ts', 'w') as f:
    f.write(content)
