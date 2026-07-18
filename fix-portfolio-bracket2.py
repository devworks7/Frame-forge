import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

pattern = r"\s*\}\)\)\}\s*\{projects\.length === 0 && \(\s*<div className=\"col-span-full py-20 text-center\">\s*<p className=\"font-sans text-white/50 text-xs\">No project streams are online at this time\.</p>\s*</div>\s*\)\}\s*</div>"
replacement = "\n          ))}\n        </div>\n        )}"

text = re.sub(pattern, replacement, text)

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
