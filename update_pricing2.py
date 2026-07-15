import re

with open("src/components/PricingDocuments.tsx", "r", encoding="utf-8") as f:
    text = f.read()

documents_section = r'''      </div>
      
      {/* Documents Section */}
      {documents.length > 0 && (
        <div className="pt-20 border-t border-white/5 space-y-10">
          <div className="text-center space-y-4">
            <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block animate-opacity-fade">
              STUDIO DOCUMENTS
            </span>
            <h2 className="font-display font-normal text-[28px] sm:text-[36px] text-white leading-[1.2] tracking-tight">
              Resources & Brochures
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="flex flex-col justify-between p-6 rounded-xl border border-white/5 liquid-glass hover-lift transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                      <FileText size={12} className="text-white/50" />
                      <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">{doc.category}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-[20px] text-white tracking-tight mb-2">
                      {doc.title}
                    </h3>
                    <p className="font-sans font-normal text-[14px] text-white/70 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-white/5">
                  <a 
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-sans font-medium text-[13px] uppercase tracking-wider interactive cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}'''

text = re.sub(r'      </div>\s*</div>\s*\);\s*\}', documents_section, text)

with open("src/components/PricingDocuments.tsx", "w", encoding="utf-8") as f:
    f.write(text)
