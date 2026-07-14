import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace all font-sans in AdminPanel with font-inter
content = content.replace("font-sans", "font-inter")
content = content.replace("font-mono", "font-mono") # keep mono
content = content.replace("font-serif", "font-serif") # keep serif if any

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(content)

# For forms in other components (e.g., ClientRequestPage, ContactSection), change font-sans on inputs to font-inter
def use_inter_on_forms(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # Let's replace font-sans with font-inter on input/textarea/select classes
    file_content = re.sub(
        r'(<(?:input|textarea|select)[^>]*className="[^"]*)font-sans',
        r'\1font-inter',
        file_content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(file_content)

use_inter_on_forms("src/components/ClientRequestPage.tsx")
use_inter_on_forms("src/components/ContactSection.tsx")

