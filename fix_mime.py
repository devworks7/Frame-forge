import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add a MIME type check inside handleFileUpload
text = text.replace(
    'const file = e.target.files[0];\n    \n    setIsUploading(true);',
    'const file = e.target.files[0];\n    if (!file.type.startsWith("video/") && !file.type.startsWith("image/") && file.type !== "application/pdf") {\n      alert("Invalid file format. Please upload a valid media or document file.");\n      return;\n    }\n    setIsUploading(true);'
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
