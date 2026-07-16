import React, { useState, useEffect } from "react";
import { Upload, X, CheckCircle, FileText, Send, ShieldCheck, Sparkles } from "lucide-react";
import { ClientRequest } from "../types.js";
import { saveClientRequest, incrementAnalytics, logActivity } from "../lib/dataService.js";

interface ClientRequestPageProps {
  onClose: () => void;
}

export default function ClientRequestPage({ onClose }: ClientRequestPageProps) {
  useEffect(() => {
    
    // Add history API for back button
    window.history.pushState({ modalOpen: true }, '');
    const handlePopState = () => {
      // It's already popped, just call onClose
      onClose();
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    projectType: "Commercial Trailer",
    purpose: "",
    budget: "€5,000 - €25,000",
    deadline: "",
    hearFrom: "Social Media",
    description: "",
    referenceLinks: "",
    fileName: "",
    fileUrl: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const budgetOptions = [
    "Under €5,000",
    "€5,000 - €25,000",
    "€25,000 - €100,000",
    "€100,000+",
  ];

  const projectTypes = [
    "Commercial Trailer",
    "Corporate Video",
    "YouTube Editing",
    "Motion Graphics",
    "Instagram / Reels",
    "Short Film",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
      }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, fileName: "", fileUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!formData.fullName || !formData.email || !formData.description) {
      setErrorMsg("Please populate all required fields.");
      return;
    }
    if (!formData.consent) {
      setErrorMsg("Please accept our Privacy Policy and NDA terms.");
      return;
    }

    setIsSubmitting(true);

    try {
      const id = "req-" + Date.now();
      const request: ClientRequest = {
        id,
        fullName: formData.fullName,
        organizationName: formData.organizationName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        city: formData.city,
        projectType: formData.projectType,
        purpose: formData.purpose,
        budget: formData.budget,
        deadline: formData.deadline,
        hearFrom: formData.hearFrom,
        description: formData.description,
        referenceLinks: formData.referenceLinks,
        fileName: formData.fileName,
        fileUrl: formData.fileUrl,
        status: "new",
        createdAt: new Date().toISOString(),
      };

      await saveClientRequest(request);
      await incrementAnalytics("projectRequests");
      await incrementAnalytics("emailsReceived");
      await logActivity("request", `Submitted request: "${formData.projectType}" by ${formData.fullName}`);

      // Dispatch simulated notify email via Express API route
      await fetch("/api/notify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestDetails: request }),
      }).catch((err) => console.log("Simulated notification sent."));

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg("Submission encountered an issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="request-page-root" className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex flex-col md:items-center py-0 px-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-12 sm:pb-12 sm:px-6 animate-opacity-fade">
      <div className="max-w-3xl w-full min-h-max flex-1 sm:flex-none sm:rounded-2xl liquid-glass border-0 sm:border border-white/10 shadow-2xl relative animate-subtle-scale bg-[#080d12]/95">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-black/40">
          <div className="flex items-center space-x-3.5">
            <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white">
              <Sparkles size={14} />
            </div>
            <div>
              <h2 className="font-display font-medium text-[13px] tracking-[0.3em] text-white/65 uppercase">
                Project Specification
              </h2>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Frame Forge Studio Acquisition Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => { window.history.back(); }}
            className="p-3 md:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full liquid-glass hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer border border-white/5"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10">
          {submitSuccess ? (
            /* SUCCESS REVEAL SCREEN */
            <div id="submit-success-reveal" className="py-12 text-center space-y-6 max-w-lg mx-auto">
              <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/15 text-white shadow-sm">
                <CheckCircle size={44} />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-display font-medium text-[22px] sm:text-[28px] text-white tracking-tight font-normal leading-tight">
                  Proposal Submitted
                </h3>
                <p className="font-sans font-normal text-[15px] text-white/80 leading-[1.7]">
                  Thank you, <strong className="text-white font-medium">{formData.fullName}</strong>. Your creative specifications have been securely parsed and logged.
                </p>
                <p className="font-sans font-normal text-[15px] text-white/80 leading-[1.7]">
                  Our directors will review your parameters within 24 hours. A customized visual treatment script and cost outline will be sent to <strong className="text-white font-medium">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono text-[10px] text-white/40 tracking-widest uppercase">
                STATUS: REGISTERED // TRANSACTION ID: {Date.now().toString().slice(-6)}
              </div>

              <button
                onClick={() => { window.history.back(); }}
                className="liquid-glass hover-lift px-8 py-3.5 rounded-full text-white font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase transition-all cursor-pointer"
              >
                Return to Studio
              </button>
            </div>
          ) : (
            /* COMPREHENSIVE SUBMIT PROPOSAL FORM */
            <form onSubmit={handleSubmit} className="space-y-8 text-xs text-white/50">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-400 text-xs font-sans leading-relaxed flex items-center space-x-2 animate-fade-in">
                  <span className="font-bold uppercase tracking-wider">Error:</span>
                  <span>{errorMsg}</span>
                </div>
              )}
              
              {/* Form Category headers */}
              <div className="space-y-6">
                <h3 className="font-sans font-normal text-[12px] text-white/60 border-b border-white/5 pb-2">
                  01 / Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g., Julien Moreau"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Organization Name</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="e.g., Moreau Media Group"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., julien@moreau.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., +33 6 1234 5678"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g., France"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Paris"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                    />
                  </div>
                </div>
              </div>

              {/* Form parameters 2 */}
              <div className="space-y-6">
                <h3 className="font-sans font-normal text-[12px] text-white/60 border-b border-white/5 pb-2">
                  02 / Project specifications
                </h3>

                <div>
                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[13px] text-white/70 mb-1.5">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-white text-white focus:outline-none font-sans text-[13px] min-h-[44px]"
                    >
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-zinc-950 text-white">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] text-white/70 mb-1.5">Project Description *</label>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your vision, core pacing direction, reference examples, and master preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white focus:bg-white/10 text-white focus:outline-none placeholder-zinc-600 leading-relaxed font-sans text-[13px] min-h-[44px]"
                  />
                </div>
                {/* Reference Links */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] text-white/70 mb-1.5">Reference Links (Optional)</label>
                  <input
                    type="text"
                    name="referenceLinks"
                    value={formData.referenceLinks}
                    onChange={handleInputChange}
                    placeholder="Paste URLs to inspiration, assets, or references..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-white text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px] min-h-[44px]"
                  />
                </div>

              </div>


              {/* Legal terms */}
              <div className="p-5 rounded-xl liquid-glass border border-white/5 space-y-3.5 bg-black/20">
                <div className="flex items-start space-x-3">
                  <input
                    required
                    type="checkbox"
                    id="consent-box"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    className="mt-1 accent-white rounded cursor-pointer min-h-[44px]"
                  />
                  <label htmlFor="consent-box" className="font-sans text-[13px] text-white/70 font-light leading-relaxed cursor-pointer select-none">
                    I authorize Frame Forge Studio to log this request parameters in their protected database. I acknowledge that all discussions are bound by strict NDA covenants to protect concept ownership.
                  </label>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-white/40 font-sans font-medium pl-6 leading-relaxed">
                  <ShieldCheck size={14} className="text-white/40 shrink-0" />
                  <span>SECURE PROTOCOL ACTIVE</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end pt-4 border-t border-white/5">
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto justify-center px-8 py-3.5 rounded-full font-display font-medium text-[14px] tracking-[0.1em] text-white uppercase flex items-center space-x-2.5 transition-all cursor-pointer hover-lift min-h-[44px] ${
                    isSubmitting
                      ? "bg-white/5 text-white/50 cursor-not-allowed border border-white/5"
                      : "liquid-glass text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span>TRANSMITTING...</span>
                      <div className="animate-spin h-3 w-3 border border-zinc-500 border-t-white rounded-full" />
                    </>
                  ) : (
                    <>
                      <span>Submit Specifications</span>
                      <Send size={11} />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
