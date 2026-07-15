import os
import re

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            
            # Remove mb-6 and mb-10 added by previous script
            content = content.replace(' mb-6', '')
            content = content.replace(' mb-10', '')
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed spacing in {filepath}")
