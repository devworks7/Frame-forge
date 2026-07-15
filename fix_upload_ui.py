import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace the first span which was just `<span>{formatBytes(uploadStats.loaded)}...` with the new UI.
# Let's just find and replace the whole `isUploading && (` block

block_search = r'\{isUploading && \(\s*<div className="mt-3 space-y-2">\s*<div className="flex justify-between text-\[11px\] font-sans text-white/70">\s*<span>\{formatBytes\(uploadStats\.loaded\)\} / \{formatBytes\(uploadStats\.total\)\}</span>\s*<span>\{uploadProgress\}%</span>\s*</div>\s*<div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">\s*<div\s*className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"\s*style=\{\{ width: `\$\{uploadProgress\}%` \}\}\s*/>\s*</div>\s*<div className="flex justify-between text-\[10px\] font-mono text-white/50">\s*<span>Speed: \{formatBytes\(uploadStats\.speed\)\}/s</span>\s*<span>ETA: \{formatTime\(uploadStats\.eta\)\}</span>\s*</div>\s*</div>\s*\)'

replacement = r'''{isUploading && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-[11px] font-sans text-white/70 font-medium">
                            <span>{uploadStage}</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                            <div 
                              className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-white/50">
                            <span>{formatBytes(uploadStats.loaded)} / {formatBytes(uploadStats.total)}</span>
                            <span>{formatBytes(uploadStats.speed)}/s &bull; ETA: {formatTime(uploadStats.eta)}</span>
                          </div>
                        </div>
                      )}'''

text = re.sub(block_search, replacement, text)

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
