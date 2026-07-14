import os
import re

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # 1. Hero Headline
    # from: font-serif text-[42px] sm:text-[56px] md:text-[72px] lg:text-[100px] text-white font-normal leading-[0.95] tracking-[-0.04em] animate-fade-rise
    # to: font-serif text-[42px] sm:text-[56px] md:text-[72px] lg:text-[110px] text-white font-light leading-[0.95] tracking-[-0.04em] animate-fade-rise
    content = re.sub(
        r'className="font-serif text-\[42px\] sm:text-\[56px\] md:text-\[72px\] lg:text-\[100px\] text-white font-normal leading-\[0.95\] tracking-\[-0.04em\]',
        r'className="font-serif text-[42px] sm:text-[56px] md:text-[72px] lg:text-[110px] text-white font-light leading-[0.95] tracking-[-0.04em]',
        content
    )

    # 2. Section Headings
    # from: font-serif text-[34px] sm:text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight
    # to: font-serif text-[42px] md:text-[56px] text-white font-normal leading-[1.05] tracking-tight
    content = re.sub(
        r'font-serif text-\[34px\] sm:text-\[42px\] md:text-\[56px\]',
        r'font-serif text-[42px] md:text-[56px]',
        content
    )

    # 3. Subheadings
    # from: font-serif italic text-[18px] sm:text-[22px] md:text-[26px]
    # to: font-sans font-medium text-[22px] sm:text-[28px]
    content = re.sub(
        r'font-serif italic text-\[18px\] sm:text-\[22px\] md:text-\[26px\]',
        r'font-sans font-medium text-[22px] sm:text-[28px]',
        content
    )

    content = re.sub(
        r'font-serif text-\[28px\] sm:text-\[34px\]',
        r'font-sans font-medium text-[22px] sm:text-[28px]',
        content
    )

    # 4. Remove other italics, except maybe some specific ones if any. Let's just remove "italic " inside classNames
    content = re.sub(r'\bitalic\s+', '', content)
    content = re.sub(r'\s+italic\b', '', content)

    # 5. Body
    # font-sans font-light text-white/70 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.7]
    content = re.sub(
        r'text-\[15px\] sm:text-\[17px\] md:text-\[19px\]',
        r'text-[17px] sm:text-[19px]',
        content
    )

    # Navigation (Navbar.tsx)
    content = re.sub(
        r'font-sans text-\[11px\] uppercase tracking-\[0.08em\] text-white/60 hover:text-white transition-colors py-2 font-medium',
        r'font-sans text-[14px] uppercase tracking-[0.12em] font-medium text-white/70 hover:text-white transition-colors py-2',
        content
    )

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    process_directory('src/components')
