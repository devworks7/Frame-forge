import re

with open('index.html', 'r') as f:
    content = f.read()

if "name=\"description\"" not in content:
    content = content.replace("<title>Frame Forge</title>", "<title>Frame Forge | Creative Video Post-Production Studio</title>\n    <meta name=\"description\" content=\"Premium websites, cinematic edits, and AI-powered digital experiences designed to build trust and attract more customers.\" />")
    with open('index.html', 'w') as f:
        f.write(content)
