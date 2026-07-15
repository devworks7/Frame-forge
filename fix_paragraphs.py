import os
import re

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            
            # Find font-sans font-light
            content = re.sub(
                r'font-sans\s+font-light\s+text-white/70\s+text-\[17px\]\s+sm:text-\[19px\]\s+leading-\[1\.7\]',
                r'font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7]',
                content
            )
            content = re.sub(
                r'font-sans\s+font-light',
                r'font-sans font-normal',
                content
            )
            content = content.replace('text-[17px] sm:text-[19px]', 'text-[16px] sm:text-[18px]')
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed paragraphs in {filepath}")
