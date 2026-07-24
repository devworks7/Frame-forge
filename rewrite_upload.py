import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

# find the exact string from `      // 2. Upload directly to Cloudinary or our backend` to `      await uploadPromise;`

pattern = r"(      // 2\. Upload directly to Cloudinary or our backend.*?      await uploadPromise;)"
match = re.search(pattern, content, re.DOTALL)
if match:
    original = match.group(1)
    print("Found original block of length:", len(original))
    replacement = """      // 2. Upload directly to Cloudinary or our backend
      const startTime = Date.now();
      let lastTime = startTime;
      let lastLoaded = 0;

      if (isPdf) {
        let currentAbortController = new AbortController();
        const uploadPromise = new Promise(async (resolve, reject) => {
          try {
            setUploadStage("Uploading...");
            const blob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/blob-upload',
              abortSignal: currentAbortController.signal,
              onUploadProgress: (event) => {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                const currentTime = Date.now();
                const timeDiff = (currentTime - lastTime) / 1000;
                if (timeDiff > 0.5) {
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
            setUploadStage("Publishing...");
            setUploadedFileUrl(blob.url);
            setUploadedFileName(file.name);
            setUploadStage("Completed");
            setUploadSuccessMsg("PDF uploaded to Vercel Blob successfully.");
            setTimeout(() => setUploadSuccessMsg(null), 3000);
            resolve(blob);
          } catch (err: any) {
             if (err.name === "AbortError") {
                 reject(new Error("Upload aborted"));
             } else {
                 reject(err);
             }
          }
        });
        await uploadPromise;
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", signData.timestamp.toString());
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`;
        const xhr = new XMLHttpRequest();
        
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              const currentTime = Date.now();
              const timeDiff = (currentTime - lastTime) / 1000;
              if (timeDiff > 0.5) {
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
                 if (!d.secure_url) throw new Error("No secure URL returned");
                 setUploadStage("Optimizing...");
                 await new Promise(r => setTimeout(r, 800));
                 setUploadStage("Publishing...");
                 try {
                   const checkRes = await fetch(d.secure_url, { method: "HEAD" });
                 } catch (e) {}
                 const isVideo = file.type.startsWith("video/");
                 const thumbnailUrl = isVideo && d.secure_url ? d.secure_url.replace(/\.[^/.]+$/, ".jpg") : d.secure_url;
                 setUploadedFileUrl(d.secure_url);
                 setUploadedFileName(file.name);
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
            }
          });
          xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
          xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));
          xhr.open("POST", uploadUrl);
          xhr.send(formData);
        });
        await uploadPromise;
      }"""
    
    content = content.replace(original, replacement)
    with open("src/components/AdminPanel.tsx", "w") as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")
