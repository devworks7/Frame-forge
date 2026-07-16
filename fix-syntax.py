import re

def fix_file(filepath):
    with open(filepath, "r") as f:
        text = f.read()
    
    # fix self-closing tags
    text = re.sub(r'/\s+onFocus=\{(.*?)\}>', r'onFocus={\1} />', text)
    # fix textarea/select which are not self closing
    # original was `className="...">` so \1 was `...`, \2 was `>`. It became `... onFocus={...}>`. This is actually correct for non self closing tags!
    # Let me check if there's any `/>` for textarea/select. They aren't self closing.
    # Wait, the error TS1005: '>' expected is in ClientRequestPage.tsx at line 260, which is an <input>.
    
    with open(filepath, "w") as f:
        f.write(text)

fix_file("src/components/ClientRequestPage.tsx")
fix_file("src/components/AdminPanel.tsx")
