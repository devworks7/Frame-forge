import re
with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

old_upload = """      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);"""

new_upload = """      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (isPdf && file.size > 100 * 1024 * 1024) {
        setUploadError("PDF file exceeds 100 MB limit.");
        setIsUploading(false);
        return;
      }

      // 2. Upload directly to Cloudinary or our backend
      const formData = new FormData();
      formData.append("file", file);
      if (!isPdf) {
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", signData.timestamp.toString());
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);
      }"""

text = text.replace(old_upload, new_upload)

old_url = """        const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;"""

new_url = """        const uploadUrl = isPdf ? "/api/upload" : `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;"""

text = text.replace(old_url, new_url)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
