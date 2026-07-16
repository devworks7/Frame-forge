import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

# Remove body scroll locks
text = re.sub(r"\s*document\.body\.style\.overflow = 'hidden';", "", text)
text = re.sub(r"\s*document\.body\.style\.overflow = '';", "", text)

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
