import os
import re

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            
            content = content.replace('font-display font-medium font-display font-medium', 'font-display font-medium')
            content = content.replace('text-white text-white', 'text-white')
            
            # fix navigation hover
            content = content.replace('font-display font-medium text-[15px] uppercase tracking-[0.12em]', 'font-display font-medium text-[15px]')
            content = content.replace('text-white/70 hover:text-white', 'text-white/70 hover:text-white') # just making sure
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {filepath}")
