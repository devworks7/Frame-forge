import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('preload="metadata"', 'preload="auto" poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1920"')

with open('src/App.tsx', 'w') as f:
    f.write(content)
