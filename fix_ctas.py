import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Hero buttons / General large buttons
    # w-full sm:w-auto px-8 py-4 rounded-full liquid-glass hover-lift text-white font-mono font-medium text-[14px] tracking-[0.2em] uppercase
    content = re.sub(
        r'font-mono font-medium text-\[14px\] tracking-\[0.2em\] uppercase\s+(flex items-center justify-center space-x-3)',
        r'font-display font-medium text-[16px] tracking-wide \1',
        content
    )
    
    content = re.sub(
        r'font-mono font-medium text-\[14px\] tracking-\[0.2em\] uppercase',
        r'font-display font-medium text-[15px] tracking-wide',
        content
    )
    
    # also remove "font-normal" from hero title since we have font-medium
    content = content.replace("font-display font-medium text-[42px] sm:text-[56px] md:text-[72px] lg:text-[110px] text-white font-normal", "font-display font-medium text-[42px] sm:text-[56px] md:text-[72px] lg:text-[110px] text-white")
    content = content.replace("font-display font-medium tracking-tight text-[42px] md:text-[56px] text-white font-normal", "font-display font-medium tracking-tight text-[42px] md:text-[56px] text-white")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated CTAs in {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            update_file(os.path.join(root, file))

