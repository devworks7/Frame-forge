import re

with open("src/index.css", "r") as f:
    content = f.read()

# Replace the Google Fonts import
# Let's import Instrument Serif and Inter
import_str = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');"
content = re.sub(r"@import url\('.*?'\);", import_str, content)

# Replace Space Grotesk with Instrument Serif
content = content.replace('"Space Grotesk"', '"Instrument Serif"')

with open("src/index.css", "w") as f:
    f.write(content)
