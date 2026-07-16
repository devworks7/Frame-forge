import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Add min-h-[44px] to all inputs and textareas and buttons
# Only in classes to avoid breaking react syntax
text = re.sub(r'(<input[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<textarea[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<button[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<select[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
