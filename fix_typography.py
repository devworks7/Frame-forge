import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Section Labels: ALL UPPERCASE, SF Pro Display Medium, tracking-[0.28em] to [0.35em], 12-15px, 60-70% opacity
    # Replace anything that looks like a section label (small text, uppercase, tracking wide)
    # e.g., font-mono font-medium text-[12px] tracking-[0.2em] text-white/60 uppercase
    # or font-sans font-bold text-[9px] uppercase tracking-[0.25em] text-white/50
    content = re.sub(
        r'font-(mono|sans|display)\s+(font-medium|font-bold|font-semibold|font-light)\s+text-\[\d+px\]\s+tracking-\[0\.\d+em\]\s+text-white/\d+\s+uppercase',
        r'font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase',
        content
    )
    # also variants where uppercase is at the end or tracking is at the end
    content = re.sub(
        r'font-(mono|sans|display)\s+(font-medium|font-bold|font-light)\s+text-\[\d+px\]\s+text-white/\d+\s+uppercase\s+tracking-\[0\.\d+em\]',
        r'font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase',
        content
    )

    # 2. Hero Titles
    # Usually they have text-[...px] up to text-[110px]
    content = re.sub(
        r'font-display\s+font-medium\s+text-\[42px\]\s+sm:text-\[56px\]\s+md:text-\[72px\]\s+lg:text-\[110px\]\s+text-white\s+leading-\[0\.95\]\s+tracking-\[-0\.04em\]',
        r'font-display font-normal text-[42px] sm:text-[56px] md:text-[72px] lg:text-[110px] text-white leading-[1.1] tracking-tight mb-6',
        content
    )

    # 3. Section Headings
    # Typically text-[42px] md:text-[56px] text-white leading-[1.05] tracking-tight
    content = re.sub(
        r'font-display\s+font-medium\s+text-\[42px\]\s+md:text-\[56px\]\s+text-white\s+leading-\[1\.05\]\s+tracking-tight',
        r'font-display font-normal text-[36px] sm:text-[48px] text-white leading-[1.2] mb-6 tracking-tight',
        content
    )

    # 4. Paragraphs / Descriptions
    # font-sans font-light text-white/70 text-[17px] sm:text-[19px] leading-[1.7] or leading-[1.8] tracking-wide
    content = re.sub(
        r'font-(sans|inter)\s+font-light\s+text-white/70\s+text-\[17px\]\s+sm:text-\[19px\]\s+leading-\[1\.[78]\]\s+tracking-wide',
        r'font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7] mb-10',
        content
    )
    # Other paragraphs
    content = re.sub(
        r'font-sans\s+font-light\s+text-\[14px\]\s+text-white/70\s+leading-\[1\.6\]',
        r'font-sans font-normal text-[15px] text-white/80 leading-[1.7]',
        content
    )

    # 5. Buttons
    # w-full sm:w-auto px-8 py-4 rounded-full liquid-glass hover-lift text-white font-display font-medium text-[16px] tracking-wide flex items-center justify-center space-x-3 ...
    content = re.sub(
        r'font-display\s+font-medium\s+text-\[15px|16px\]\s+tracking-wide\s+(flex items-center justify-center space-x-3)',
        r'font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase \1',
        content
    )

    # 6. Navigation
    if 'Navbar' in filepath:
        # Navbar has uppercase nav links
        content = re.sub(
            r'font-sans\s+font-medium\s+text-\[14px\]\s+uppercase\s+tracking-\[0\.12em\]',
            r'font-display font-medium text-[15px]',
            content
        )
        # remove uppercase from the actual text:
        content = content.replace('>HOME<', '>Home<')
        content = content.replace('>SERVICES<', '>Services<')
        content = content.replace('>PORTFOLIO<', '>Portfolio<')
        content = content.replace('>ABOUT<', '>About<')
        content = content.replace('>CONTACT<', '>Contact<')
    
    # 7. Quotes
    # font-serif italic text-[28px] sm:text-[36px] text-white/90 leading-[1.2] tracking-wide
    content = re.sub(
        r'font-serif\s+italic\s+text-\[28px\]\s+sm:text-\[36px\]\s+text-white/90\s+leading-\[1\.2\]\s+tracking-wide',
        r'font-sans italic text-[22px] sm:text-[26px] text-white/90 leading-[1.6]',
        content
    )

    # 8. Metadata
    # font-mono font-medium text-[10px] text-white/50 uppercase tracking-[0.15em]
    content = re.sub(
        r'font-mono\s+font-medium\s+text-\[1[01]px\]\s+text-white/50\s+(uppercase\s+)?tracking-\[0\.15em\]\s*(uppercase)?',
        r'font-sans font-normal text-[12px] text-white/60',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/components'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            process_file(os.path.join(root, file))

