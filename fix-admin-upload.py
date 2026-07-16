import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

upload_progress_original = """                      {isUploading && (
                        <div className="mt-4 bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                          <div className="flex justify-between text-xs font-mono text-white/60">
                            <span>{formatBytes(uploadStats.loaded)} / {formatBytes(uploadStats.total)}</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                            <div 
                              className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-white/50">
                            <span>Speed: {formatBytes(uploadStats.speed)}/s</span>
                            <span>ETA: {formatTime(uploadStats.eta)}</span>
                          </div>
                        </div>
                      )}"""

upload_progress_new = """                      {isUploading && (
                        <div className="mt-4 bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                          <div className="flex justify-between text-xs font-mono text-white/60">
                            <span className="truncate pr-2">{formatBytes(uploadStats.loaded)} / {formatBytes(uploadStats.total)}</span>
                            <span className="shrink-0">{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                            <div 
                              className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${Math.min(uploadProgress, 100)}%`, maxWidth: '100%' }}
                            />
                          </div>
                          <div className="flex flex-row justify-between text-[10px] font-mono text-white/50">
                            <span className="truncate pr-2">Speed: {formatBytes(uploadStats.speed)}/s</span>
                            <span className="shrink-0">ETA: {formatTime(uploadStats.eta)}</span>
                          </div>
                        </div>
                      )}"""

text = text.replace(upload_progress_original, upload_progress_new)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
