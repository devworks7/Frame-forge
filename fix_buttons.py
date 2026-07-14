with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Fix 'Forge Item'
old_forge = """                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        Forge Item
                      </button>"""
new_forge = """                      <button
                        type="submit"
                        disabled={isUploading || isSaving}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading || isSaving ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        {isSaving ? "Saving..." : "Forge Item"}
                      </button>"""
text = text.replace(old_forge, new_forge)

# Fix 'Commit PDF'
old_pdf = """                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        Commit PDF
                      </button>"""
new_pdf = """                      <button
                        type="submit"
                        disabled={isUploading || isSaving}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading || isSaving ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        {isSaving ? "Saving..." : "Commit PDF"}
                      </button>"""
text = text.replace(old_pdf, new_pdf)

# Fix 'SAVE ALL TEXT CONFIGS'
old_cfg = """                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-sans font-black text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all cursor-pointer"
                  >
                    SAVE ALL TEXT CONFIGS
                  </button>"""
new_cfg = """                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`px-8 py-3 rounded-xl font-sans font-black text-xs uppercase transition-all ${isSaving ? 'bg-cyan-500/50 text-black/50 cursor-not-allowed' : 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer'}`}
                  >
                    {isSaving ? "SAVING..." : "SAVE ALL TEXT CONFIGS"}
                  </button>"""
text = text.replace(old_cfg, new_cfg)

# Fix 'Save Capability'
old_srv = """                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all cursor-pointer"
                      >
                        Save Capability
                      </button>"""
new_srv = """                      <button
                        type="submit"
                        disabled={isSaving}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-xs uppercase transition-all ${isSaving ? 'bg-cyan-500/50 text-black/50 cursor-not-allowed' : 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer'}`}
                      >
                        {isSaving ? "Saving..." : "Save Capability"}
                      </button>"""
text = text.replace(old_srv, new_srv)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
