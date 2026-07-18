import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# I will find the start of TAB 7: BESPOKE PACKAGES MATRIX
start_marker = r'          \{/\* TAB 7: BESPOKE PACKAGES MATRIX \*/\}'
end_marker = r'          \)\}  # Wait, I need a reliable way to replace the block.'

# It's better to just use a regular expression that matches the block.
# Since the block is very large, I can split the file before the start marker, and after the end marker.

parts = text.split('          {/* TAB 7: BESPOKE PACKAGES MATRIX */}')
if len(parts) < 2:
    print("Could not find start marker")
    exit(1)

before = parts[0]
after_start = parts[1]

# Now find the end of the block in after_start
# We know the block ends with:
#               </div>
#             </div>
#           )}
#         </div>
#       </div>
#       {saveSuccessMsg && (
end_parts = after_start.split('        </div>\n      </div>\n\n      {saveSuccessMsg && (')
if len(end_parts) < 2:
    print("Could not find end marker")
    exit(1)

# The end of the packages tab is the first part up to `          )}\n`
block_text = end_parts[0]
after = '        </div>\n      </div>\n\n      {saveSuccessMsg && (' + end_parts[1]

new_block = """          {/* TAB 7: BESPOKE PACKAGES MATRIX */}
          {activeTab === "packages" && (
            <ErrorBoundary>
            <div id="admin-tab-packages" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  BESPOKE PACKAGES MATRIX
                </h2>
                <button
                  onClick={() => setEditingPackage({ features: [] })}
                  disabled={isPackagesLoading}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>ADD PACKAGE</span>
                </button>
              </div>

              {/* Form Dialog */}
              {editingPackage && (
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-cyan-500/20 space-y-4 text-xs">
                  <h3 className="font-sans font-bold text-white uppercase">ADD / EDIT PACKAGE DATA</h3>
                  <form onSubmit={handleSavePackage} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/70">
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Package Name *</label>
                      <input
                        required
                        type="text"
                        value={editingPackage?.name ?? ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold">Price *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. $5,000"
                        value={editingPackage?.price ?? ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Period/Sub-text</label>
                      <input
                        type="text"
                        placeholder="e.g. / project or / month"
                        value={editingPackage?.period ?? ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold">Order (Display Order)</label>
                      <input
                        type="number"
                        value={editingPackage?.order ?? 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, order: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Short Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingPackage?.desc ?? ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Features (comma separated) *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="4K Recording, Sound Design, Color Grading..."
                        value={editingPackage?.features?.join(", ") ?? ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, features: e.target.value.split(",").map(s => s.trim()) })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPackage?.popular ?? false}
                          onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })}
                          className="w-4 h-4 rounded bg-black border-white/20 text-cyan-500 focus:ring-cyan-500/50"
                        />
                        <span className="font-bold">Highlight as "Most Selected"</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPackage?.enabled !== false}
                          onChange={(e) => setEditingPackage({ ...editingPackage, enabled: e.target.checked })}
                          className="w-4 h-4 rounded bg-black border-white/20 text-cyan-500 focus:ring-cyan-500/50"
                        />
                        <span className="font-bold">Enabled</span>
                      </label>
                    </div>

                    <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4 mt-4 sticky bottom-4 z-10 bg-[#0a0a0c]/95 backdrop-blur-md p-4 -mx-4 rounded-xl border border-white/10 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:mx-0 sm:border-0 shadow-2xl sm:shadow-none">
                      <button
                        type="button"
                        onClick={() => setEditingPackage(null)}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-bold cursor-pointer"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-bold uppercase disabled:opacity-50 cursor-pointer min-h-[44px]"
                      >
                        {isUploading ? "SAVING..." : "COMMIT PACKAGE"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {isPackagesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] animate-pulse h-32"></div>
                  ))}
                </div>
              ) : packages.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-[#0a0a0c] border border-white/5 rounded-2xl">
                  <Boxes className="text-white/20 mb-2" size={48} />
                  <p className="text-white/70 font-sans font-bold uppercase">No packages yet.</p>
                  <p className="text-white/40 text-xs">Create your first bespoke package to display it on the pricing page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg?.id ?? Math.random()} className="p-4 rounded-xl border border-white/5 liquid-glass flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex flex-col">
                             <span className="text-white font-bold text-sm flex items-center space-x-2">
                                <span>{pkg?.name ?? "Unnamed"}</span>
                                {pkg?.popular && <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">POPULAR</span>}
                                {pkg && !pkg.enabled && <span className="text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">DISABLED</span>}
                             </span>
                             <span className="text-white/50 text-xs">{pkg?.price ?? ""} {pkg?.period ?? ""}</span>
                          </div>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed mb-3 line-clamp-2">
                          {pkg?.desc ?? ""}
                        </p>
                      </div>
                      <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/5">
                        <button onClick={() => setEditingPackage(pkg)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDeletePackage(pkg?.id ?? "")} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Packages Settings section */}
              <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4 text-xs mt-8">
                  <h3 className="font-sans font-bold text-white uppercase">PAGE HEADERS</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/70">
                    <div className="space-y-1.5">
                      <label className="block font-bold">Sub Headline</label>
                      <input
                        type="text"
                        value={content?.pricingTitle ?? ""}
                        onChange={(e) => setContent(content ? { ...content, pricingTitle: e.target.value } : { pricingTitle: e.target.value } as any)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Headline</label>
                      <input
                        type="text"
                        value={content?.pricingSubtitle ?? ""}
                        onChange={(e) => setContent(content ? { ...content, pricingSubtitle: e.target.value } : { pricingSubtitle: e.target.value } as any)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Description Text</label>
                      <textarea
                        rows={3}
                        value={content?.pricingDesc ?? ""}
                        onChange={(e) => setContent(content ? { ...content, pricingDesc: e.target.value } : { pricingDesc: e.target.value } as any)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={handleSaveContent}
                        disabled={isUploading}
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-bold uppercase disabled:opacity-50 cursor-pointer min-h-[44px]"
                      >
                        {isUploading ? "SAVING..." : "SAVE HEADERS"}
                      </button>
                  </div>
              </div>
            </div>
            </ErrorBoundary>
          )}
"""

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(before + new_block + after)
