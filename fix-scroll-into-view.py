import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

# Add onFocus to input, textarea, select
onfocus_code = r' onFocus={(e) => { setTimeout(() => { e.target.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300); }}'

text = re.sub(r'(<input[^>]*)(>)', r'\1' + onfocus_code + r'\2', text)
text = re.sub(r'(<textarea[^>]*)(>)', r'\1' + onfocus_code + r'\2', text)
text = re.sub(r'(<select[^>]*)(>)', r'\1' + onfocus_code + r'\2', text)

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
