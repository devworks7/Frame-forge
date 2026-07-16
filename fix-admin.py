import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'getPDFDocuments, savePDFDocument, deletePDFDocument,',
    'getPDFDocuments, savePDFDocument, deletePDFDocument, getPricingPackages, savePricingPackage, deletePricingPackage,'
)

text = text.replace(
    'import { PortfolioItem, PDFDoc, FAQItem, Testimonial, ClientRequest, Analytics, RecentActivity, ServiceItem, SectionContent } from "../types";',
    'import { PortfolioItem, PDFDoc, FAQItem, Testimonial, ClientRequest, Analytics, RecentActivity, ServiceItem, SectionContent, PricingPackage } from "../types";'
)

# Add packages to state
state_vars = '''
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PricingPackage[]>([]);
'''
text = text.replace('  const [services, setServices] = useState<ServiceItem[]>([]);', state_vars)

state_vars2 = '''
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingPackage, setEditingPackage] = useState<Partial<PricingPackage> | null>(null);
'''
text = text.replace('  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);', state_vars2)

# Load data
load_data = '''
        getServices(),
        getPricingPackages(),
'''
text = text.replace('        getServices(),', load_data)

load_data2 = '''
        setServices(data[6] as ServiceItem[]);
        setPackages(data[7] as PricingPackage[]);
'''
text = text.replace('        setServices(data[6] as ServiceItem[]);', load_data2)

# Handle Save Package
handle_save = '''
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage || !editingPackage.name || !editingPackage.price || !editingPackage.period || !editingPackage.desc) {
      alert("Missing required fields for Package");
      return;
    }
    
    setIsUploading(true);
    try {
      const p: PricingPackage = {
        id: editingPackage.id || "",
        name: editingPackage.name,
        price: editingPackage.price,
        period: editingPackage.period,
        desc: editingPackage.desc,
        features: editingPackage.features || [],
        popular: editingPackage.popular || false,
        order: editingPackage.order || 0,
        enabled: editingPackage.enabled !== undefined ? editingPackage.enabled : true,
      };
      await savePricingPackage(p);
      setPackages(await getPricingPackages());
      setEditingPackage(null);
    } catch (err: any) {
      alert(err.message || "Failed to save Package");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm("DELETE SECURE PACKAGE PROFILE?")) {
      await deletePricingPackage(id);
      setPackages(await getPricingPackages());
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
'''
text = text.replace('  const handleSaveService = async (e: React.FormEvent) => {', handle_save)

# Add Tab link
tabs = '''
              <button
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "services" ? "bg-white/10 text-white font-medium shadow-[inset_2px_0_0_#fff]" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Layers size={16} />
                <span>Services Forge</span>
              </button>
              
              <button
                onClick={() => setActiveTab("packages")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "packages" ? "bg-white/10 text-white font-medium shadow-[inset_2px_0_0_#fff]" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Database size={16} />
                <span>Bespoke Packages</span>
              </button>
'''
text = text.replace('''              <button
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === "services" ? "bg-white/10 text-white font-medium shadow-[inset_2px_0_0_#fff]" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Layers size={16} />
                <span>Services Forge</span>
              </button>''', tabs)


# Add the tab content
package_tab = '''
          {/* TAB 8: PACKAGES */}
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
            </div>
          )}
'''
text = text.replace('          {/* TAB 8: SYSTEM SETTINGS */}', package_tab + '\n          {/* TAB 8: SYSTEM SETTINGS */}')

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
