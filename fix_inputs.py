import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace inputs in editingProject modal
def add_disabled(match):
    m = match.group(0)
    if 'disabled=' not in m:
        return m.replace('<input ', '<input disabled={isSaving || isUploading} ') \
                .replace('<textarea ', '<textarea disabled={isSaving || isUploading} ') \
                .replace('<select ', '<select disabled={isSaving || isUploading} ')
    return m

text = re.sub(r'<input [^>]*onChange=\{\(e\) => setEditing[^>]*>', add_disabled, text)
text = re.sub(r'<textarea [^>]*onChange=\{\(e\) => setEditing[^>]*>', add_disabled, text)
text = re.sub(r'<select [^>]*onChange=\{\(e\) => setEditing[^>]*>', add_disabled, text)

# For content tab
text = re.sub(r'<input [^>]*onChange=\{\(e\) => setContent[^>]*>', add_disabled, text)
text = re.sub(r'<textarea [^>]*onChange=\{\(e\) => setContent[^>]*>', add_disabled, text)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
