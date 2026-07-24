import re

with open('src/components/AdminPanel.tsx', 'r') as f:
    content = f.read()

# Change formData.append condition
content = content.replace("""      if (!isPdf) {
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", signData.timestamp.toString());
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);
      }""", """      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);""")

# Change uploadUrl
content = content.replace("""        const uploadUrl = isPdf ? "/api/upload" : `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;""", """        const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;""")

# Remove the headers setting
content = content.replace("""        if (isPdf) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        }""", "")

with open('src/components/AdminPanel.tsx', 'w') as f:
    f.write(content)
