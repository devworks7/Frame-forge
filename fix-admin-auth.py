import re
with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

old_open = """        xhr.open("POST", uploadUrl);
        xhr.send(formData);"""

new_open = """        xhr.open("POST", uploadUrl);
        if (isPdf) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        xhr.send(formData);"""

text = text.replace(old_open, new_open)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
