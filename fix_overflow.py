import re

with open('src/App.tsx', 'r') as f:
    content = f.read()
content = content.replace('overflow-x-clip', 'overflow-x-hidden')
content = content.replace('min-h-[100dvh]', 'min-h-screen')

with open('src/App.tsx', 'w') as f:
    f.write(content)

with open('src/components/Hero.tsx', 'r') as f:
    content2 = f.read()
content2 = content2.replace('overflow-clip', 'overflow-hidden')
content2 = content2.replace('min-h-[100dvh]', 'min-h-screen')

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content2)
