import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Add packages to activeTab type
text = text.replace(
    'const [activeTab, setActiveTab] = useState<"metrics" | "requests" | "portfolio" | "pdfs" | "content" | "services">("metrics");',
    'const [activeTab, setActiveTab] = useState<"metrics" | "requests" | "portfolio" | "pdfs" | "content" | "services" | "packages">("metrics");'
)

# Add the Tab link
tabs = '''
              {/* Tab 7: Packages */}
              <button
                onClick={() => setActiveTab("packages")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "packages" ? "bg-white/5 text-cyan-400" : "text-white/60 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <Database size={14} />
                <span>Bespoke Packages</span>
              </button>
            </div>
'''
text = text.replace('            </div>\n\n            {/* Logout/Support Menu */}\n', tabs + '\n            {/* Logout/Support Menu */}\n')


package_tab = '''
          {/* TAB 7: BESPOKE PACKAGES MATRIX */}
          {activeTab === "packages" && (
            <div id="admin-tab-packages" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  BESPOKE PACKAGES MATRIX
                </h2>
                <button
                  onClick={() => setEditingPackage({ features: [] })}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer"
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
                        value={editingPackage.name || ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Price *</label>
                      <input
                        required
                        type="text"
                        value={editingPackage.price || ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Period (e.g. per minute) *</label>
                      <input
                        required
                        type="text"
                        value={editingPackage.period || ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Display Order</label>
                      <input
                        type="number"
                        value={editingPackage.order || 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, order: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Short Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingPackage.desc || ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Features (comma separated) *</label>
                      <textarea
                        required
                        rows={3}
                        value={editingPackage.features?.join(", ") || ""}
                        onChange={(e) => setEditingPackage({ ...editingPackage, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        placeholder="Cinematic Edit Assembly, Classic Color Science..."
                      />
                    </div>
                    
                    <div className="sm:col-span-2 flex space-x-6 pt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPackage.popular || false}
                          onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })}
                          className="w-4 h-4 rounded bg-black border-white/20 text-cyan-500 focus:ring-cyan-500/50"
                        />
                        <span className="font-bold">Highlight as "Most Selected"</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPackage.enabled !== false}
                          onChange={(e) => setEditingPackage({ ...editingPackage, enabled: e.target.checked })}
                          className="w-4 h-4 rounded bg-black border-white/20 text-cyan-500 focus:ring-cyan-500/50"
                        />
                        <span className="font-bold">Enabled</span>
                      </label>
                    </div>

                    <div className="sm:col-span-2 flex justify-end space-x-4 mt-2">
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
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-bold uppercase disabled:opacity-50 cursor-pointer"
                      >
                        {isUploading ? "SAVING..." : "COMMIT PACKAGE"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-xl border border-white/5 liquid-glass flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-col">
                           <span className="text-white font-bold text-sm flex items-center space-x-2">
                              <span>{pkg.name}</span>
                              {pkg.popular && <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">POPULAR</span>}
                              {!pkg.enabled && <span className="text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">DISABLED</span>}
                           </span>
                           <span className="text-white/50 text-xs">{pkg.price} {pkg.period}</span>
                        </div>
                      </div>
                      <p className="text-white/60 text-[11px] leading-relaxed mb-3 line-clamp-2">
                        {pkg.desc}
                      </p>
                    </div>
                    <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/5">
                      <button onClick={() => setEditingPackage(pkg)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeletePackage(pkg.id)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Packages Settings section */}
              <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4 text-xs mt-8">
                  <h3 className="font-sans font-bold text-white uppercase">PAGE HEADERS</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/70">
                    <div className="space-y-1.5">
                      <label className="block font-bold">Sub Headline</label>
                      <input
                        type="text"
                        value={content.pricingTitle || ""}
                        onChange={(e) => setContent({ ...content, pricingTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block font-bold">Headline</label>
                      <input
                        type="text"
                        value={content.pricingSubtitle || ""}
                        onChange={(e) => setContent({ ...content, pricingSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block font-bold">Description</label>
                      <input
                        type="text"
                        value={content.pricingDesc || ""}
                        onChange={(e) => setContent({ ...content, pricingDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSaveContent}
                        disabled={isUploading}
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-bold uppercase disabled:opacity-50 cursor-pointer"
                      >
                        {isUploading ? "SAVING..." : "SAVE HEADERS"}
                      </button>
                  </div>
              </div>
            </div>
          )}
'''
text = text.replace('        </div>\n      </div>\n    </div>\n  );\n}', package_tab + '\n        </div>\n      </div>\n    </div>\n  );\n}')

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
