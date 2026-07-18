import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Replace:
#       const signData = await signRes.json();
#       
#       if (!signData.success) {
#         throw new Error("Failed to get upload signature");
#       }

# With safe parsing and error throwing:

replacement = """
      if (!signRes.ok) {
        throw new Error(`Failed to get upload signature (${signRes.status})`);
      }
      
      const contentType = signRes.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid non-JSON response from signature API");
      }

      const signData = await signRes.json();
      
      if (!signData || !signData.success || !signData.signature) {
        throw new Error("Invalid signature data received");
      }
"""

original = """      const signData = await signRes.json();
      
      if (!signData.success) {
        throw new Error("Failed to get upload signature");
      }"""

text = text.replace(original, replacement.strip('\n'))

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
