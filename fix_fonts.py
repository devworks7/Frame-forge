import re

with open('index.html', 'r') as f:
    html_content = f.read()

font_links = """
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
"""
if "family=Inter" not in html_content:
    html_content = html_content.replace("</head>", f"{font_links}</head>")
    with open('index.html', 'w') as f:
        f.write(html_content)

with open('src/index.css', 'r') as f:
    css_content = f.read()
css_content = re.sub(r"@import url\('https://fonts\.googleapis\.com[^\)]+'\);\n", "", css_content)
with open('src/index.css', 'w') as f:
    f.write(css_content)
