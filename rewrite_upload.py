import re
with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(r'const \[isUploading, setIsUploading\] = useState\(false\);',
r'const [isUploading, setIsUploading] = useState(false);\n  const [uploadStage, setUploadStage] = useState("Preparing...");',
text)

upload_logic = r'''
    setIsUploading(true);
    setUploadStage("Preparing...");
    setUploadError(null);
    setUploadSuccessMsg(null);
    setUploadProgress(0);
    setUploadStats({ loaded: 0, total: 0, speed: 0, eta: 0 });

    try {
      // 1. Get signed upload parameters from our backend
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const signData = await signRes.json();
      
      if (!signData.success) {
        throw new Error("Failed to get upload signature");
      }

      setUploadStage("Uploading...");

      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const startTime = Date.now();
      let lastTime = startTime;
      let lastLoaded = 0;

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            
            const currentTime = Date.now();
            const timeDiff = (currentTime - lastTime) / 1000; // seconds
            
            if (timeDiff > 0.5) { // Update stats every 500ms
              const bytesDiff = event.loaded - lastLoaded;
              const speedBps = bytesDiff / timeDiff;
              const bytesRemaining = event.total - event.loaded;
              const etaSeconds = speedBps > 0 ? bytesRemaining / speedBps : 0;
              
              setUploadStats({
                loaded: event.loaded,
                total: event.total,
                speed: speedBps,
                eta: etaSeconds
              });
              
              lastTime = currentTime;
              lastLoaded = event.loaded;
            }
            
            setUploadProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", async () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
               const d = JSON.parse(xhr.responseText);
               setUploadStage("Processing...");
               
               // Verification logic
               if (!d.secure_url) throw new Error("No secure URL returned");
               
               setUploadStage("Optimizing...");
               
               // Wait a brief moment to ensure Cloudinary has propagated the file (prevent broken streams)
               await new Promise(r => setTimeout(r, 800));
               
               setUploadStage("Publishing...");
               
               // Attempt to HEAD request the url to verify it's active
               try {
                 const checkRes = await fetch(d.secure_url, { method: "HEAD" });
                 if (!checkRes.ok) console.warn("Resource may not be fully propagated yet.");
               } catch (e) {
                 // Ignore cross-origin HEAD errors if any
               }

               const isVideo = file.type.startsWith("video/");
               const thumbnailUrl = isVideo && d.secure_url ? d.secure_url.replace(/\.[^/.]+$/, ".jpg") : d.secure_url;
               
               setUploadedFileUrl(d.secure_url);
               setUploadedFileName(file.name);
               
               // Automatically generate thumbnail for projects if editing
               if (editingProject) {
                 setEditingProject(prev => prev ? { ...prev, thumbnail: thumbnailUrl, duration: d.duration ? String(Math.round(d.duration)) + "s" : prev.duration } : null);
               }
               
               setUploadStage("Completed");
               setUploadSuccessMsg("Media optimized and ready.");
               setTimeout(() => setUploadSuccessMsg(null), 3000);
               resolve(d);
            } catch (err: any) {
               reject(new Error("Failed to parse upload response: " + err.message));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
        xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

        xhr.open("POST", `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`);
        xhr.send(formData);
      });

      await uploadPromise;
      
    } catch (err: any) {
      setUploadError(err.message || "An error occurred during upload.");
      console.error(err);
    } finally {
      setIsUploading(false);
      setUploadStage("Preparing...");
    }
'''

# We need to replace the body of handleFileUpload
# First, let's locate handleFileUpload
text = re.sub(
    r'setIsUploading\(true\);\s*setUploadError\(null\);.*?(?=const handleSaveProject)',
    upload_logic + '\n  };\n\n  ',
    text,
    flags=re.DOTALL
)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
