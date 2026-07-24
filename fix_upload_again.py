import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

with open("old_upload.txt", "r") as f:
    target = f.read()

replacement = """      const uploadPromise = new Promise(async (resolve, reject) => {
        const resourceType = isPdf ? "raw" : "auto";
        const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;

        if (isPdf && file.size > 5 * 1024 * 1024) { // Only chunk PDFs larger than 5MB
          try {
            const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
            const uploadId = Math.random().toString(36).substring(2) + Date.now().toString(36);
            const totalChunks = Math.ceil(file.size / chunkSize);
            let uploadedBytes = 0;
            let finalResponse: any = null;

            for (let i = 0; i < totalChunks; i++) {
              const start = i * chunkSize;
              const end = Math.min(start + chunkSize - 1, file.size - 1);
              const chunk = file.slice(start, end + 1);

              const chunkFormData = new FormData();
              chunkFormData.append("file", chunk, file.name);
              chunkFormData.append("api_key", signData.apiKey);
              chunkFormData.append("timestamp", signData.timestamp.toString());
              chunkFormData.append("signature", signData.signature);
              chunkFormData.append("folder", signData.folder);

              await new Promise((chunkResolve, chunkReject) => {
                const chunkXhr = new XMLHttpRequest();
                
                chunkXhr.upload.addEventListener("progress", (event) => {
                  if (event.lengthComputable) {
                    const currentLoaded = uploadedBytes + event.loaded;
                    const percentComplete = Math.round((currentLoaded / file.size) * 100);
                    
                    const currentTime = Date.now();
                    const timeDiff = (currentTime - lastTime) / 1000; // seconds
                    
                    if (timeDiff > 0.5) { // Update stats every 500ms
                      const bytesDiff = currentLoaded - lastLoaded;
                      const speedBps = bytesDiff / timeDiff;
                      const bytesRemaining = file.size - currentLoaded;
                      const etaSeconds = speedBps > 0 ? bytesRemaining / speedBps : 0;
                      
                      setUploadStats({
                        loaded: currentLoaded,
                        total: file.size,
                        speed: speedBps,
                        eta: etaSeconds
                      });
                      
                      lastTime = currentTime;
                      lastLoaded = currentLoaded;
                    }
                    
                    setUploadProgress(percentComplete);
                  }
                });

                chunkXhr.addEventListener("load", () => {
                  if (chunkXhr.status >= 200 && chunkXhr.status < 300) {
                    uploadedBytes += (end - start + 1);
                    finalResponse = JSON.parse(chunkXhr.responseText);
                    chunkResolve(null);
                  } else {
                    let errorMsg = `Cloudinary chunk upload failed with status ${chunkXhr.status}`;
                    try {
                      const errRes = JSON.parse(chunkXhr.responseText);
                      if (errRes.error && errRes.error.message) {
                        errorMsg = `Cloudinary upload failed: ${errRes.error.message}`;
                      } else {
                        errorMsg = `Cloudinary upload failed: ${chunkXhr.responseText}`;
                      }
                    } catch(e) {
                      errorMsg = `Cloudinary upload failed: ${chunkXhr.responseText}`;
                    }
                    if (chunkXhr.status === 400 && errorMsg.includes("Invalid file type")) errorMsg = "Invalid file type";
                    if (chunkXhr.status === 400 && errorMsg.includes("exceeds")) errorMsg = "File exceeds upload limit";
                    chunkReject(new Error(errorMsg));
                  }
                });
                
                chunkXhr.addEventListener("error", () => chunkReject(new Error("Network error during chunk upload")));
                chunkXhr.addEventListener("abort", () => chunkReject(new Error("Upload aborted")));

                chunkXhr.open("POST", uploadUrl);
                chunkXhr.setRequestHeader("X-Unique-Upload-Id", uploadId);
                chunkXhr.setRequestHeader("Content-Range", `bytes ${start}-${end}/${file.size}`);
                chunkXhr.send(chunkFormData);
              });
            }
            
            const d = finalResponse;
            setUploadStage("Processing...");
            
            if (!d.secure_url) throw new Error("No secure URL returned");
            
            setUploadStage("Optimizing...");
            await new Promise(r => setTimeout(r, 800));
            setUploadStage("Publishing...");
            
            try {
              const checkRes = await fetch(d.secure_url, { method: "HEAD" });
            } catch (e) {
              // Ignore cross-origin HEAD errors if any
            }

            setUploadedFileUrl(d.secure_url);
            setUploadedFileName(file.name);
            
            setUploadStage("Completed");
            setUploadSuccessMsg("Media optimized and ready.");
            setTimeout(() => setUploadSuccessMsg(null), 3000);
            resolve(d);
          } catch (err) {
            reject(err);
          }
        } else {
          // Standard upload for videos, images, and small PDFs
          const xhr = new XMLHttpRequest();
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
                 
                 if (!d.secure_url) throw new Error("No secure URL returned");
                 
                 setUploadStage("Optimizing...");
                 await new Promise(r => setTimeout(r, 800));
                 setUploadStage("Publishing...");
                 
                 try {
                   const checkRes = await fetch(d.secure_url, { method: "HEAD" });
                 } catch (e) {
                   // Ignore cross-origin HEAD errors if any
                 }

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
        }
      });"""

if target in content:
    content = content.replace(target, replacement)
    with open("src/components/AdminPanel.tsx", "w") as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Target not found")
