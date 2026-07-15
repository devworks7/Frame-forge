import re
with open("src/components/Navbar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("text-[14px] tracking-[0.1em] text-white uppercase ] tracking-wide", "text-[14px] tracking-[0.1em] text-white uppercase")
# check for other files
content = content.replace("text-[14px] tracking-[0.1em] text-white uppercase ]", "text-[14px] tracking-[0.1em] text-white uppercase")

with open("src/components/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
