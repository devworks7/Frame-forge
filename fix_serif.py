import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace any font-serif on headings with font-display
    content = re.sub(
        r'font-serif([^"]*text-\[(?:3[0-9]|[4-9]\d|\d{3})px\]|text-(?:3|4|5|6|7|8|9)xl)',
        r'font-display font-medium tracking-tight\1',
        content
    )
    
    # Clean up double
    content = content.replace("font-display font-medium tracking-tight font-medium", "font-display font-medium tracking-tight")
    
    # Let's find quote/testimonial sections and use font-serif there? We don't have TestimonialsSection right now it seems, just those 12 files.
    # What about form labels in ClientRequestPage.tsx? They should use font-sans. Let's see if they use font-sans.

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated Serif in {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            update_file(os.path.join(root, file))

