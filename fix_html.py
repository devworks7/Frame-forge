import re

with open('index.html', 'r') as f:
    content = f.read()

preload_tags = """
    <link rel="preload" href="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1920" as="image" fetchpriority="high">
    <link rel="preload" href="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" as="video" type="video/mp4" fetchpriority="high">
"""

if "fetchpriority" not in content:
    content = content.replace("</head>", f"{preload_tags}</head>")
    with open('index.html', 'w') as f:
        f.write(content)
