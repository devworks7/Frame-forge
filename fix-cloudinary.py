import re

with open("server.ts", "r") as f:
    text = f.read()

text = text.replace("pathname === '/api/cloudinary/sign'", "pathname === '/api/cloudinary-sign'")

with open("server.ts", "w") as f:
    f.write(text)

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace('"/api/cloudinary/sign"', '"/api/cloudinary-sign"')

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
