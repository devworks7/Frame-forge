import re
with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

old_success = """               const d = JSON.parse(xhr.responseText);
               setUploadStage("Processing...");"""

new_success = """               const d = JSON.parse(xhr.responseText);
               console.log("[Frontend Upload Log] - API Response (Success):", d);
               setUploadStage("Processing...");"""

text = text.replace(old_success, new_success)

old_error = """              const errRes = JSON.parse(xhr.responseText);
              if (errRes.error && errRes.error.message) {"""

new_error = """              const errRes = JSON.parse(xhr.responseText);
              console.log("[Frontend Upload Log] - API Response (Error):", errRes);
              if (errRes.error && errRes.error.message) {"""

text = text.replace(old_error, new_error)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
