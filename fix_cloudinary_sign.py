import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

pattern = r"(    try {\n      // 1\. Get signed upload parameters from our backend.*?      if \(isPdf && file\.size > 100 \* 1024 \* 1024\) {\n        setUploadError\(\"PDF file exceeds 100 MB limit\.\"\);\n        setIsUploading\(false\);\n        return;\n      })"
match = re.search(pattern, content, re.DOTALL)

if match:
    original = match.group(1)
    print("Found original block")
    
    replacement = """    try {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (isPdf && file.size > 100 * 1024 * 1024) {
        setUploadError("PDF file exceeds 100 MB limit.");
        setIsUploading(false);
        return;
      }

      let signData: any = null;

      if (!isPdf) {
        // 1. Get signed upload parameters from our backend
        const signRes = await fetch("/api/cloudinary-sign", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (!signRes.ok) {
          throw new Error(`Failed to get upload signature (${signRes.status})`);
        }
              
        const contentType = signRes.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid non-JSON response from signature API");
        }
        
        signData = await signRes.json();
              
        if (!signData || !signData.success || !signData.signature) {
          throw new Error("Invalid signature data received");
        }
      }
      
      setUploadStage("Uploading...");"""
      
    content = content.replace(original, replacement)
    with open("src/components/AdminPanel.tsx", "w") as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")
