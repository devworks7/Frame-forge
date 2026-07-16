with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

pricing_headers = '''
              {/* Packages Settings section in TAB 8 */}
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
'''

text = text.replace(
    '          {/* TAB 8: PACKAGES */}\n          {activeTab === "packages" && (\n            <div id="admin-tab-packages" className="space-y-6 animate-fade-in">',
    '          {/* TAB 8: PACKAGES */}\n          {activeTab === "packages" && (\n            <div id="admin-tab-packages" className="space-y-6 animate-fade-in">\n' + pricing_headers
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
