import re

with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

new_upload_logic = """  // Secure direct-to-Cloudinary file uploader
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
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
        throw new Error(signData.error || "Failed to get upload signature");
      }

      // 2. Prepare FormData for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const startTime = Date.now();
      let lastLoaded = 0;
      let lastTime = startTime;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);

          const currentTime = Date.now();
          const timeDiff = (currentTime - lastTime) / 1000;
          
          if (timeDiff > 0.5 || event.loaded === event.total) {
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

            lastLoaded = event.loaded;
            lastTime = currentTime;
          }
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          try {
            const d = JSON.parse(xhr.responseText);
            setUploadSuccessMsg("Upload complete. Verifying processing...");
            
            // Basic HEAD request to check if reachable
            try {
               const checkRes = await fetch(d.secure_url, { method: "HEAD" });
               if (!checkRes.ok && checkRes.status !== 405) {
                 throw new Error("URL not reachable");
               }
               setUploadedFileName(file.name);
               setUploadedFileUrl(d.secure_url);
               setUploadSuccessMsg(`File uploaded successfully: ${file.name}`);
               
               const isVideo = file.type.startsWith("video/");
               const thumbnailUrl = isVideo && d.secure_url ? d.secure_url.replace(/\.[^/.]+$/, ".jpg") : d.secure_url;

               if (thumbnailUrl) {
                 setEditingProject(prev => prev ? { ...prev, thumbnail: thumbnailUrl, duration: d.duration ? String(Math.round(d.duration)) + "s" : prev.duration } : null);
               }
            } catch (err) {
               setUploadError("Processing failed or file not accessible.");
            }
          } catch (err) {
             setUploadError("Invalid response from Cloudinary.");
          }
        } else {
          setUploadError("Upload failed. Limit: 500MB, allowed types: MP4, MOV, WebM, PDF.");
        }
        setIsUploading(false);
        setTimeout(() => {
          setUploadProgress(0);
          setUploadStats({ loaded: 0, total: 0, speed: 0, eta: 0 });
        }, 3000);
      };

      xhr.onerror = () => {
        setUploadError("Network error during upload.");
        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (err: any) {
      setUploadError(err.message || "Failed to initiate upload.");
      setIsUploading(false);
    }
  };"""

# Use regex to replace the function definition block.
pattern = r"\s*// Secure local file uploader on Express backend\s*const handleFileUpload = \(e: React.ChangeEvent<HTMLInputElement>\) => \{.*?\n  \};\n"

new_content = re.sub(pattern, "\n" + new_upload_logic + "\n", content, flags=re.DOTALL)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(new_content)

