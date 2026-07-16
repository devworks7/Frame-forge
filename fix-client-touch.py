import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

# Add min-h-[44px] to all inputs, textareas, buttons, and selects
text = re.sub(r'(<input[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<textarea[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<button[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)
text = re.sub(r'(<select[^>]*className=")([^"]*)(")', r'\1\2 min-h-[44px]\3', text)

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
