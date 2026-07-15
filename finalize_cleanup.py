import os
import re

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            
            content = content.replace('font-medium font-normal', 'font-normal')
            content = content.replace('font-display font-medium text-[22px] sm:text-[28px] text-white tracking-tight leading-tight', 'font-display font-normal text-[22px] sm:text-[28px] text-white tracking-tight leading-tight')
            
            content = content.replace('text-[14px] tracking-[0.1em] text-white uppercase ] tracking-wide', 'text-[14px] tracking-[0.1em] text-white uppercase')
            content = content.replace('text-[14px] tracking-[0.1em] text-white uppercase ]', 'text-[14px] tracking-[0.1em] text-white uppercase')
            
            # fix font-inter to font-sans
            content = content.replace('font-inter', 'font-sans')
            
            # h2 uppercase tracking 0.08em -> section label
            content = content.replace('className="font-sans font-medium text-[14px] text-white uppercase tracking-[0.08em]"', 'className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase"')
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed final styles in {filepath}")
