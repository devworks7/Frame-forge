import re

def revert_file(filepath):
    with open(filepath, "r") as f:
        text = f.read()
    
    # We just replace the exact inserted string with nothing!
    onfocus_str = ' onFocus={(e) => { setTimeout(() => { e.target.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300); }}'
    text = text.replace(onfocus_str, '')
    
    with open(filepath, "w") as f:
        f.write(text)

revert_file("src/components/ClientRequestPage.tsx")
revert_file("src/components/AdminPanel.tsx")
