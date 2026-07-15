import React from "react";
import { Check } from "lucide-react";

export default function PricingDocuments() {
  const plans = [
    {
      name: "Standard Cut",
      price: "€2,500",
      period: "per minute",
      desc: "Ideal for boutique brands and digital leaders seeking cinematic-grade marketing cuts.",
      features: [
        "Cinematic Edit Assembly",
        "Classic Color Science",
        "Baseline Sound Treatment",
        "FHD Master Delivery",
        "Unlimited Broadcast Licensing",
      ],
    },
    {
      name: "Cinematic Master",
      price: "€6,000",
      period: "per minute",
      desc: "Built for luxury labels and complex productions requiring high-poly CGI and VFX.",
      features: [
        "High-Poly 3D Modeling",
        "Environmental VFX Compositing",
        "DaVinci Film Color Grading",
        "Spatial Audio Scoring",
        "Uncompressed 4K master",
      ],
      popular: true,
    },
  ];

  return (
    <div id="pricing-documents-root" className="max-w-4xl mx-auto px-6 py-32 space-y-16">
      
      {/* Page Header */}
      <div id="pricing-header" className="space-y-6 text-center max-w-2xl mx-auto">
        <span className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase block animate-opacity-fade">
          STUDIO RATES
        </span>
        <h1 className="font-display font-normal text-[36px] sm:text-[48px] text-white leading-[1.2] tracking-tight animate-fade-rise">
          Bespoke Packages
        </h1>
        <p className="font-sans font-normal text-white/80 text-[16px] sm:text-[18px] leading-[1.7] max-w-lg mx-auto">
          Calibrated rates for elite video editing, motion design, and CGI.
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

    </div>
  );
}
