import re
with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

old_upload_req = """        xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
        xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

        xhr.open("POST", `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`);
        xhr.send(formData);"""

new_upload_req = """        xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
        xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        const resourceType = isPdf ? "raw" : "auto";
        const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;
        
        console.log("[Frontend Upload Log]");
        console.log("- Selected filename:", file.name);
        console.log("- File size:", file.size);
        console.log("- MIME type:", file.type);
        console.log("- Request URL:", uploadUrl);
        console.log("- FormData contents: file, api_key, timestamp, signature, folder");

        xhr.open("POST", uploadUrl);
        xhr.send(formData);"""

text = text.replace(old_upload_req, new_upload_req)

old_error_handling = """          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }"""

new_error_handling = """          } else {
            let errorMsg = `Cloudinary upload failed with status ${xhr.status}`;
            try {
              const errRes = JSON.parse(xhr.responseText);
              if (errRes.error && errRes.error.message) {
                errorMsg = `Cloudinary upload failed: ${errRes.error.message}`;
              } else {
                errorMsg = `Cloudinary upload failed: ${xhr.responseText}`;
              }
            } catch(e) {
              errorMsg = `Cloudinary upload failed: ${xhr.responseText}`;
            }
            if (xhr.status === 400 && errorMsg.includes("Invalid file type")) errorMsg = "Invalid file type";
            if (xhr.status === 400 && errorMsg.includes("exceeds")) errorMsg = "File exceeds upload limit";
            reject(new Error(errorMsg));
          }"""

text = text.replace(old_error_handling, new_error_handling)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
