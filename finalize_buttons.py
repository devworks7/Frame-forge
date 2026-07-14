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

    content = re.sub(
        r'font-medium text-\[14px\] tracking-\[0.1em\] uppercase',
        r'font-semibold text-[14px] tracking-[0.08em] uppercase',
        content
    )
    
    content = re.sub(
        r'font-medium text-\[14px\] tracking-\[0.08em\] uppercase',
        r'font-semibold text-[14px] tracking-[0.08em] uppercase',
        content
    )

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    process_directory('src/components')
