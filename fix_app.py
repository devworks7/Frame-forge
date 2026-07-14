with open("src/App.tsx", "r") as f:
    content = f.read()

import re

# Remove setShowCookieConsent(true) block
content = re.sub(r'\s*if \(\!localStorage\.getItem\("ff_cookies_accepted"\)\) \{\s*setShowCookieConsent\(true\);\s*\}', '', content)

# Remove handleAcceptCookies
content = re.sub(r'\s*const handleAcceptCookies = \(\) => \{\s*localStorage\.setItem\("ff_cookies_accepted", "true"\);\s*setShowCookieConsent\(false\);\s*\};', '', content)

# Remove cookie consent JSX block
cookie_jsx = r'\{\s*/\*\s*Cookie Consent Toast\s*\*/\s*\}.*?Assent Parameters\s*</button>\s*</div>\s*</div>\s*\)}'
content = re.sub(cookie_jsx, '', content, flags=re.DOTALL)

with open("src/App.tsx", "w") as f:
    f.write(content)

