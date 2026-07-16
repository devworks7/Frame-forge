import React from "react";
import { Check, Download, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { getPDFDocuments, getPricingPackages } from "../lib/dataService";
import { PDFDoc, PricingPackage, SectionContent } from "../types";


export default function PricingDocuments({ content }: { content: SectionContent | null }) {
  const [documents, setDocuments] = useState<PDFDoc[]>([]);
  const [plans, setPlans] = useState<PricingPackage[]>([]);

  useEffect(() => {
    getPricingPackages().then(data => {
      setPlans(data.filter(p => p.enabled).sort((a, b) => a.order - b.order));
    });
    getPDFDocuments().then(data => {
      setDocuments(data.filter(d => d.downloadsAllowed).sort((a, b) => a.order - b.order));
    });
  }, []);

  return (
    <div id="pricing-documents-root" className="max-w-4xl mx-auto px-6 py-32 space-y-16">
      
      {/* Page Header */}
      <div id="pricing-header" className="space-y-6 text-center max-w-2xl mx-auto">
        <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block animate-opacity-fade">
          {content?.pricingTitle || "STUDIO RATES"}
        </span>
        <h1 className="font-display font-normal text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight animate-fade-rise">
          {content?.pricingSubtitle || "Bespoke Packages"}
        </h1>
        <p className="font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7] max-w-lg mx-auto">
          {content?.pricingDesc || "Calibrated rates for elite video editing, motion design, and CGI."}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative p-8 rounded-xl border border-white/5 liquid-glass hover-lift transition-all duration-300 ${
              plan.popular ? "bg-white/[0.04] ring-1 ring-white/10" : ""
            }`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-sm border border-white/15 bg-white/5 text-white/70 font-mono text-[10px] font-medium uppercase tracking-[0.1em]">
                Most Selected
              </span>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block">
                  {plan.name}
                </span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-display font-medium text-4xl text-white tracking-tight">{plan.price}</span>
                  <span className="font-sans text-[13px] text-white/50">{plan.period}</span>
                </div>
                <p className="font-sans font-normal text-[15px] text-white/80 leading-[1.7]">
                  {plan.desc}
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 pt-4 border-t border-white/5">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2.5 text-[14px] text-white/70 leading-relaxed font-light">
                    <Check size={12} className="text-white/40 shrink-0" />
                    <span className="font-sans">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
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
}
