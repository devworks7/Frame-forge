import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'const (.*?) = lazy\(\(\) => import\("(.*?)"\)\);', r'import \1 from "\2";', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
