import os

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            content = content.replace('text-[font-display', 'font-display')
            content = content.replace('font-display font-medium text-[16px] tracking-wide font-display', 'font-display')
            content = content.replace('font-display font-medium text-[15px] tracking-wide font-display', 'font-display')
            content = content.replace('font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase', 'font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase')
            
            # actually let's just use regex to fix the duplicate part
            import re
            content = re.sub(r'font-display font-medium text-\[(15px|16px)\] tracking-wide font-display font-medium', 'font-display font-medium', content)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {filepath}")
