import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Update Hero Title to use font-display
    content = re.sub(
        r'className="([^"]*)font-serif([^"]*text-\[\d+px\][^"]*)"(.*?)dangerouslySetInnerHTML=\{\{\s*__html:\s*content\?\.heroTitle',
        r'className="\1font-display font-medium\2"\3dangerouslySetInnerHTML={{ __html: content?.heroTitle',
        content, flags=re.DOTALL
    )
    
    # 2. Find uppercase section labels/tags (often tracking widish) and use font-mono
    # Things like: font-sans font-medium text-[12px] tracking-[0.3em] uppercase
    content = re.sub(
        r'font-sans\s+(font-medium|font-bold|font-semibold)\s+text-\[(\d+)px\]\s+tracking-\[([0-9\.]+)em\](\s+text-[^\s]+)?\s+uppercase',
        r'font-mono font-medium text-[\2px] tracking-[0.2em]\4 uppercase',
        content
    )

    # 3. Major headings to font-display
    # Looking for section titles, like font-sans text-3xl font-bold etc.
    # We will search for 'font-sans' mixed with 'text-[42px]', 'text-4xl', 'text-5xl', etc.
    content = re.sub(
        r'font-sans([^"]*text-\[(?:2[4-9]|[3-9]\d|\d{3})px\]|text-(?:3|4|5|6|7|8|9)xl)',
        r'font-display font-medium\1',
        content
    )
    
    # Clean up double font-medium
    content = content.replace("font-display font-medium font-medium", "font-display font-medium")
    content = content.replace("font-display font-medium font-bold", "font-display font-semibold")

    # 4. Paragraphs stay font-sans but maybe we can ensure they are clean.
    # "Use SF Pro Text for paragraphs, descriptions, body copy, form labels, and navigation where appropriate."

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            update_file(os.path.join(root, file))

