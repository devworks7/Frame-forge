import React, { useState, useEffect } from "react";
import {
  ShieldAlert, Lock, Eye, Key, LayoutDashboard, FileSpreadsheet, Film, FileText, Settings,
  Activity, Users, Mail, Play, CheckCircle, ChevronLeft, ChevronRight, Download, Upload, Trash2, ArrowUp, ArrowDown, Plus, HelpCircle, UserPlus, Sparkles, X, Edit, Boxes
} from "lucide-react";
import { PortfolioItem, PDFDoc, ClientRequest, FAQItem, Testimonial, SectionContent, Analytics, RecentActivity, ServiceItem } from "../types";
import Logo from "./Logo";
import {
  getPortfolioItems, savePortfolioItem, deletePortfolioItem,
  getPDFDocuments, savePDFDocument, deletePDFDocument,
  getFAQs, saveFAQ, deleteFAQ,
  getTestimonials, saveTestimonial, deleteTestimonial,
  getSectionContent, saveSectionContent,
  getClientRequests, saveClientRequest, deleteClientRequest,
  getAnalytics, getRecentActivities,
  getServices, saveServiceItem, deleteServiceItem
} from "../lib/dataService";

function formatBytes(bytes: number) {
  if (!bytes || bytes === 0) return "0 MB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function formatTime(seconds: number) {
  if (!seconds || seconds === 0 || !isFinite(seconds)) return "calculating...";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

interface AdminPanelProps {
  onClose: () => void;
  onLoginStateChange: (loggedIn: boolean) => void;
}

export default function AdminPanel({ onClose, onLoginStateChange }: AdminPanelProps) {
  // Authentication states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("ff_admin_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Inline feedback states
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Core Data States
  const [analytics, setAnalytics] = useState<Analytics>({ totalVisitors: 0, projectRequests: 0, emailsReceived: 0, videoViews: 0, pdfViews: 0 });
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [pdfs, setPdfs] = useState<PDFDoc[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<SectionContent | null>(null);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"metrics" | "requests" | "portfolio" | "pdfs" | "content" | "services">("metrics");

  // Filtering states
  const [requestFilterStatus, setRequestFilterStatus] = useState<string>("All");
  const [requestSearch, setRequestSearch] = useState("");
  const [requestPage, setRequestPage] = useState(1);

  // Item Editing Forms
  const [editingProject, setEditingProject] = useState<Partial<PortfolioItem> | null>(null);
  const [editingPdf, setEditingPdf] = useState<Partial<PDFDoc> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  // File uploading states
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStats, setUploadStats] = useState({ loaded: 0, total: 0, speed: 0, eta: 0 });

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; mode: string; error: string | null }>({
    connected: false,
    mode: "checking",
    error: null,
  });

  useEffect(() => {
    async function fetchDbStatus() {
      try {
        const res = await fetch("/api/db-status");
        if (res.ok) {
          const d = await res.json();
          setDbStatus(d);
        }
      } catch (e) {
        console.error("Failed to check database status:", e);
      }
    }
    fetchDbStatus();
  }, []);

  // Check login on startup
  useEffect(() => {
    async function validate() {
      if (token) {
        try {
          const res = await fetch("/api/admin/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const d = await res.json();
          if (d.valid) {
            setIsAuthenticated(true);
            setMustChangePassword(d.mustChangePassword);
            onLoginStateChange(true);
            loadDashboardData();
          } else {
            localStorage.removeItem("ff_admin_token");
            setToken(null);
          }
        } catch (e) {
          console.error("Session validation error:", e);
        }
      }
    }
    validate();
  }, [token]);

  // Load all system data when authenticated
  const loadDashboardData = async () => {
    try {
      const [an, ac, reqList, portList, pdfsList, faqList, testList, textContent, srvList] = await Promise.all([
        getAnalytics(),
        getRecentActivities(),
        getClientRequests(),
        getPortfolioItems(),
        getPDFDocuments(),
        getFAQs(),
        getTestimonials(),
        getSectionContent(),
        getServices()
      ]);

      setAnalytics(an);
      setActivities(ac);
      setRequests(reqList);
      setPortfolio(portList);
      setPdfs(pdfsList);
      setFaqs(faqList);
      setTestimonials(testList);
      setContent(textContent);
      setServices([...srvList].sort((a, b) => a.order - b.order));
    } catch (e) {
      console.error("Dashboard database fetch failed:", e);
    }
  };

  // Secure Auth Actions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      let d: any = {};
      try {
        d = await res.json();
      } catch (jsonErr) {
        if (!res.ok) {
          setLoginError(`Server error (${res.status}). Please verify your credentials and try again.`);
          return;
        }
        throw jsonErr;
      }

      if (res.ok && d.success) {
        localStorage.setItem("ff_admin_token", d.token);
        setToken(d.token);
        setIsAuthenticated(true);
        setMustChangePassword(d.mustChangePassword);
        onLoginStateChange(true);
        loadDashboardData();
      } else {
        setLoginError(d.error || "Credentials verification failed.");
      }
    } catch (err) {
      console.error("Login processing error:", err);
      setLoginError("Error contacting the secure auth engine.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (!newPassword || newPassword.length < 6) {
      setPasswordError("Password must contain at least 6 characters.");
      return;
    }
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      
      let d: any = {};
      try {
        d = await res.json();
      } catch (jsonErr) {
        if (!res.ok) {
          setPasswordError(`Server error during password change (${res.status}).`);
          return;
        }
        throw jsonErr;
      }

      if (res.ok && d.success) {
        setMustChangePassword(false);
        setPasswordChangeSuccess(true);
        setTimeout(() => setPasswordChangeSuccess(false), 3000);
      } else {
        setPasswordError(d.error || "Password change failed.");
      }
    } catch (e) {
      console.error("Password update error:", e);
      setPasswordError("Password transition failed.");
    }
  };

  // Status management for Client Requests
  const handleUpdateStatus = async (reqId: string, status: ClientRequest["status"]) => {
    const updated = requests.map((r) => {
      if (r.id === reqId) {
        const item = { ...r, status };
        saveClientRequest(item); // Write changes to database
        return item;
      }
      return r;
    });
    setRequests(updated);
  };

  const handleDeleteRequest = async (id: string) => {
    if (confirm("Confirm deletion of this request?")) {
      await deleteClientRequest(id);
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  // CSV Export trigger
  const handleExportCSV = async () => {
    setExportError(null);
    try {
      const res = await fetch("/api/admin/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, requests }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "frame_forge_client_proposals.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setExportError("Export failed. Server error.");
      }
    } catch (e) {
      setExportError("Export failed. Network error.");
    }
  };

  // Secure local file uploader on Express backend
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);
    setUploadProgress(0);
    setUploadStats({ loaded: 0, total: 0, speed: 0, eta: 0 });

    const formData = new FormData();
    formData.append("file", file);

    const startTime = Date.now();
    let lastLoaded = 0;
    let lastTime = startTime;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload", true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);

        const currentTime = Date.now();
        const timeDiff = (currentTime - lastTime) / 1000;
        
        if (timeDiff > 0.5 || event.loaded === event.total) {
          const bytesDiff = event.loaded - lastLoaded;
          const speedBps = bytesDiff / timeDiff;
          const bytesRemaining = event.total - event.loaded;
          const etaSeconds = speedBps > 0 ? bytesRemaining / speedBps : 0;
          
          setUploadStats({
            loaded: event.loaded,
            total: event.total,
            speed: speedBps,
            eta: etaSeconds
          });

          lastLoaded = event.loaded;
          lastTime = currentTime;
        }
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        try {
          const d = JSON.parse(xhr.responseText);
          if (d.success) {
            setUploadSuccessMsg("Upload complete. Verifying processing...");
            
            // Basic HEAD request to check if reachable
            try {
               const checkRes = await fetch(d.secure_url, { method: "HEAD" });
               if (!checkRes.ok && checkRes.status !== 405) {
                 throw new Error("URL not reachable");
               }
               setUploadedFileName(d.originalName);
               setUploadedFileUrl(d.secure_url);
               setUploadSuccessMsg(`File uploaded successfully: ${d.originalName}`);
               if (d.thumbnail) {
                 setEditingProject(prev => prev ? { ...prev, thumbnail: d.thumbnail, duration: d.duration ? String(Math.round(d.duration)) + "s" : prev.duration } : null);
               }
            } catch (err) {
               setUploadError("Processing failed or file not accessible.");
            }
          } else {
            setUploadError(d.error || "File upload failed.");
          }
        } catch (err) {
           setUploadError("Invalid response from server.");
        }
      } else {
        setUploadError("Upload failed. Limit: 500MB, allowed types: MP4, MOV, WebM, PDF.");
      }
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStats({ loaded: 0, total: 0, speed: 0, eta: 0 });
      }, 3000);
    };

    xhr.onerror = () => {
      setUploadError("Network error during upload.");
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.send(formData);
  };

  // Portfolio items operations
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    const finalVideoUrl = uploadedFileUrl || editingProject.videoUrl;
    if (!finalVideoUrl || finalVideoUrl.startsWith("blob:") || finalVideoUrl.startsWith("file:") || finalVideoUrl.includes("sample.mp4")) {
      alert("Please upload a valid portfolio video before forging this item.");
      return;
    }

    const finalItem: PortfolioItem = {
      id: editingProject.id || "proj-" + Date.now(),
      title: editingProject.title || "Untitled Project",
      category: (editingProject.category as any) || "Commercial",
      description: editingProject.description || "",
      clientName: editingProject.clientName || "",
      date: editingProject.date || new Date().toISOString().split("T")[0],
      softwareUsed: editingProject.softwareUsed || ["After Effects"],
      duration: editingProject.duration || "1 min",
      tags: editingProject.tags || ["VFX"],
      videoUrl: finalVideoUrl,
      thumbnail: editingProject.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      order: editingProject.order || portfolio.length + 1,
    };

    await savePortfolioItem(finalItem);
    setEditingProject(null);
    setUploadedFileUrl("");
    setUploadedFileName("");
    loadDashboardData();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Confirm deletion of this project from the database?")) {
      await deletePortfolioItem(id);
      loadDashboardData();
    }
  };

  const handleReorderProject = async (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= portfolio.length) return;

    const list = [...portfolio];
    const tempOrder = list[idx].order;
    list[idx].order = list[nextIdx].order;
    list[nextIdx].order = tempOrder;

    await Promise.all([
      savePortfolioItem(list[idx]),
      savePortfolioItem(list[nextIdx])
    ]);
    loadDashboardData();
  };

  // PDF Document Operations
  const handleSavePdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPdf) return;

    const finalItem: PDFDoc = {
      id: editingPdf.id || "pdf-" + Date.now(),
      title: editingPdf.title || "Untitled Deck",
      category: (editingPdf.category as any) || "Package",
      description: editingPdf.description || "",
      fileUrl: uploadedFileUrl || editingPdf.fileUrl || "/api/documents/brochure.pdf",
      fileName: uploadedFileName || editingPdf.fileName || "brochure.pdf",
      downloadsAllowed: editingPdf.downloadsAllowed ?? true,
      order: editingPdf.order || pdfs.length + 1,
    };

    await savePDFDocument(finalItem);
    setEditingPdf(null);
    setUploadedFileUrl("");
    setUploadedFileName("");
    loadDashboardData();
  };

  const handleDeletePdf = async (id: string) => {
    if (confirm("Confirm deletion of this PDF document?")) {
      await deletePDFDocument(id);
      loadDashboardData();
    }
  };

  // Content Operations (Website text)
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    await saveSectionContent(content);
    setContentSaveSuccess(true);
    setTimeout(() => setContentSaveSuccess(false), 3500);
    loadDashboardData();
  };

  // FAQ Operations
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    const finalItem: FAQItem = {
      id: editingFaq.id || "faq-" + Date.now(),
      question: editingFaq.question || "",
      answer: editingFaq.answer || "",
      order: editingFaq.order || faqs.length + 1,
    };
    await saveFAQ(finalItem);
    setEditingFaq(null);
    loadDashboardData();
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Delete this FAQ item?")) {
      await deleteFAQ(id);
      loadDashboardData();
    }
  };

  // Testimonial Operations
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    const finalItem: Testimonial = {
      id: editingTestimonial.id || "test-" + Date.now(),
      name: editingTestimonial.name || "",
      role: editingTestimonial.role || "",
      company: editingTestimonial.company || "",
      rating: editingTestimonial.rating || 5,
      comment: editingTestimonial.comment || "",
      avatar: editingTestimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      order: editingTestimonial.order || testimonials.length + 1,
    };
    await saveTestimonial(finalItem);
    setEditingTestimonial(null);
    loadDashboardData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Delete this Testimonial?")) {
      await deleteTestimonial(id);
      loadDashboardData();
    }
  };

  // Service Operations
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const finalItem: ServiceItem = {
      id: editingService.id || "srv-" + Date.now(),
      title: editingService.title || "New Service",
      badge: editingService.badge || "Post-Production",
      desc: editingService.desc || "",
      fullDescription: editingService.fullDescription || "",
      iconName: editingService.iconName || "Film",
      order: editingService.order || services.length + 1,
    };
    await saveServiceItem(finalItem);
    setEditingService(null);
    loadDashboardData();
  };

  const handleDeleteService = async (id: string) => {
    if (confirm("Delete this Service capability?")) {
      await deleteServiceItem(id);
      loadDashboardData();
    }
  };

  const handleReorderService = async (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= services.length) return;

    const list = [...services];
    const tempOrder = list[idx].order;
    list[idx].order = list[nextIdx].order;
    list[nextIdx].order = tempOrder;

    await Promise.all([
      saveServiceItem(list[idx]),
      saveServiceItem(list[nextIdx])
    ]);
    loadDashboardData();
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesStatus = requestFilterStatus === "All" || r.status === requestFilterStatus;
    const matchesSearch =
      r.fullName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      (r.organizationName || "").toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.projectType.toLowerCase().includes(requestSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const requestsPerPage = 8;
  const totalRequestPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (requestPage - 1) * requestsPerPage,
    requestPage * requestsPerPage
  );

  // LOGIN SCREEN RENDER (IF NOT AUTHENTICATED)
  if (!isAuthenticated) {
    return (
      <div id="admin-login-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black flex justify-center items-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-[#0a0a0c] border border-white/5 p-8 space-y-8 shadow-2xl relative overflow-hidden">
          {/* Neon background overlays */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-cyan-400">
              <ShieldAlert size={36} />
            </div>
            <div>
              <h2 className="font-sans font-black text-xl text-white tracking-widest uppercase">
                ENGINE ROOM LOGIN
              </h2>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                FRAME FORGE AGENCY ADMINISTRATOR PORTAL
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 text-xs text-gray-300">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-[11px] leading-relaxed">
                ERROR: {loginError}
              </div>
            )}
            {/* Username */}
            <div className="space-y-2">
              <label className="block font-sans font-bold text-white uppercase tracking-wider">Admin Username</label>
              <input
                required
                type="text"
                placeholder="frameforge.in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none placeholder-gray-700"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block font-sans font-bold text-white uppercase tracking-wider">Passphrase</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[10px] text-gray-500 hover:text-white uppercase transition-colors cursor-pointer"
              >
                // RETURN_TO_WEBSITE
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-black font-sans font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                ACCESS CONSOLE
              </button>
            </div>
          </form>

          <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-800/20 text-[9px] font-mono text-cyan-400 leading-relaxed text-center">
            Credentials managed securely server-side. For first login, reference manual guidelines setup.
          </div>
        </div>
      </div>
    );
  }

  // FORCE CHANGE DEFAULT PASSWORD DIALOGUE
  if (mustChangePassword) {
    return (
      <div id="admin-change-password-overlay" className="fixed inset-0 z-50 bg-black flex justify-center items-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-[#0a0a0c] border border-white/5 p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Key size={32} />
            </div>
            <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">
              UPDATE SECURITY CREDENTIALS
            </h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              As a security compliance mandate, you must change your default password (<code className="text-purple-400">framestrue27</code>) on your very first successful login.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs text-gray-300">
            {passwordError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-[11px] leading-relaxed">
                ERROR: {passwordError}
              </div>
            )}
            <div className="space-y-2">
              <label className="block font-sans font-bold text-white uppercase">New Admin Passphrase *</label>
              <input
                required
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
              />
            </div>

            {passwordChangeSuccess ? (
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400 text-center font-mono">
                PASSPHRASE SAVED SECURELY! ACCESSING...
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-sans font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                COMMIT SECURE CREDENTIALS
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD CONSOLE RENDER
  return (
    <div id="admin-dashboard-overlay" className="fixed inset-0 z-50 bg-[#060608] flex flex-col">
      {/* Top Console ribbon */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0c]">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-wider">
              FRAME FORGE CONTROL SUITE
            </h2>
            <p className="font-mono text-[9px] text-gray-500 uppercase">
              SECURE SESSION ROOT // STATUS: AUTHENTICATED // LATENCY: NOMINAL
            </p>
          </div>
        </div>

        {/* Console CTAs */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              localStorage.removeItem("ff_admin_token");
              setToken(null);
              setIsAuthenticated(false);
              onLoginStateChange(false);
            }}
            className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[9px] border border-red-500/20 transition-all cursor-pointer"
          >
            TERMINATE_SESSION
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all interactive cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Nav, Right Content workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side menu navigation */}
        <div className="w-56 border-r border-white/5 bg-[#0a0a0c] p-4 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="block font-mono text-[8px] text-gray-600 uppercase tracking-widest px-3">
              // MODULE ENGINE
            </span>
            
            <div className="space-y-1 text-xs">
              {/* Tab 1 */}
              <button
                onClick={() => setActiveTab("metrics")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "metrics" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Dashboard Metrics</span>
              </button>

              {/* Tab 2 */}
              <button
                onClick={() => setActiveTab("requests")}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "requests" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet size={14} />
                  <span>Client Requests</span>
                </div>
                {requests.filter(r => r.status === 'new').length > 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-black font-mono text-[8px] font-black leading-none">
                    {requests.filter(r => r.status === 'new').length}
                  </span>
                )}
              </button>

              {/* Tab 3 */}
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "portfolio" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <Film size={14} />
                <span>Portfolio Library</span>
              </button>

              {/* Tab 4 */}
              <button
                onClick={() => setActiveTab("pdfs")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "pdfs" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <FileText size={14} />
                <span>Documents Vault</span>
              </button>

              {/* Tab 5 */}
              <button
                onClick={() => setActiveTab("content")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "content" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <Settings size={14} />
                <span>Content Studio</span>
              </button>

              {/* Tab 6: Services */}
              <button
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "services" ? "bg-white/5 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                <Boxes size={14} />
                <span>Capabilities Studio</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[8px] text-gray-500 leading-normal space-y-1">
            <div>CORE_VER: v1.0.4</div>
            <div>
              PERSIST_ENGINE:{" "}
              <span className={dbStatus.connected ? "text-green-400 font-bold" : "text-rose-400 font-bold animate-pulse"}>
                {dbStatus.connected ? "MongoDB Atlas" : dbStatus.mode === "checking" ? "Checking DB..." : "MongoDB Offline"}
              </span>
            </div>
            <div>ENCRYPT: SHA-256 HSM</div>
            <div>© FRAME FORGE 2026</div>
          </div>
        </div>

        {/* Right workspace */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#060608]">
          {/* Resilient Database Status Banner */}
          {!dbStatus.connected && dbStatus.mode !== "checking" && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-sans leading-relaxed flex items-start space-x-3 shadow-[0_0_15px_rgba(244,63,94,0.1)] animate-fade-in">
              <ShieldAlert className="text-rose-400 shrink-0 mt-0.5" size={16} />
              <div className="space-y-1">
                <span className="font-bold text-white uppercase tracking-wider block">Database Connection Status: Offline / Unavailable</span>
                <p>
                  The application could not reach your MongoDB Atlas database. Please verify your Atlas Cluster state, credentials, or network/IP Access List configurations.
                </p>
                <p className="text-[11px] text-gray-400 font-mono">
                  Error: {dbStatus.error || "Mongoose connection timeout (5000ms)"}
                </p>
                <div className="pt-1.5 flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold font-mono">ACTION REQUIRED</span>
                    <span className="text-gray-300">
                      Ensure <strong>MONGODB_URI</strong> is correctly configured and MongoDB Atlas is up and accepting connections from the server.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* TAB 1: METRICS */}
          {activeTab === "metrics" && (
            <div id="admin-tab-metrics" className="space-y-8 animate-fade-in">
              <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide border-b border-white/5 pb-3">
                ANALYTICS & METRICS
              </h2>

              {/* Metrics Counters Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { label: "Total Visitors", val: analytics.totalVisitors, color: "text-blue-400", icon: <Users size={16} /> },
                  { label: "Project Requests", val: analytics.projectRequests, color: "text-purple-400", icon: <FileSpreadsheet size={16} /> },
                  { label: "Emails Dispatched", val: analytics.emailsReceived, color: "text-cyan-400", icon: <Mail size={16} /> },
                  { label: "Video Streams", val: analytics.videoViews, color: "text-white", icon: <Play size={16} /> },
                  { label: "PDF Views", val: analytics.pdfViews, color: "text-blue-300", icon: <FileText size={16} /> },
                ].map((m, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="p-2 rounded bg-white/[0.02] border border-white/10 text-gray-400">
                        {m.icon}
                      </span>
                      <span className="font-mono text-[8px] text-gray-600 font-bold uppercase">MTRX_{idx + 1}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className={`block font-sans font-black text-2xl ${m.color} tracking-tight`}>{m.val}</span>
                      <span className="block text-gray-400 font-sans text-[10px] font-semibold uppercase">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity logs */}
              <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                  <Activity size={16} className="text-cyan-400" />
                  <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                    Recent Activity logs (Live-Sync)
                  </h3>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto font-mono text-[10px] text-gray-400">
                  {activities.map((act) => (
                    <div key={act.id} className="flex justify-between items-center p-2.5 rounded bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                          act.type === 'request' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                          act.type === 'video_view' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                          'bg-gray-900 text-gray-400'
                        }`}>
                          {act.type.toUpperCase()}
                        </span>
                        <span className="text-gray-300 font-sans">{act.description}</span>
                      </div>
                      <span className="text-[9px] text-gray-600">{new Date(act.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}

                  {activities.length === 0 && (
                    <p className="text-center py-6 text-gray-500">No activity logged yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLIENT REQUESTS */}
          {activeTab === "requests" && (
            <div id="admin-tab-requests" className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  CLIENT PROPOSAL ARCHIVE
                </h2>

                <div className="flex items-center space-x-3">
                  {exportError && (
                    <span className="text-rose-400 font-mono text-[10px] animate-fade-in uppercase">
                      [{exportError}]
                    </span>
                  )}
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>

              {/* Table search, filtering & statuses row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {["All", "new", "in_progress", "completed", "rejected"].map((st) => (
                    <button
                      key={st}
                      onClick={() => { setRequestFilterStatus(st); setRequestPage(1); }}
                      className={`px-3 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase border whitespace-nowrap cursor-pointer ${
                        requestFilterStatus === st
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Filter by name, email, project..."
                  value={requestSearch}
                  onChange={(e) => { setRequestSearch(e.target.value); setRequestPage(1); }}
                  className="px-4 py-2 max-w-xs w-full rounded-lg bg-white/[0.02] border border-white/10 text-xs focus:outline-none focus:border-cyan-500/40"
                />
              </div>

              {/* Table rendering */}
              <div className="border border-white/5 rounded-2xl bg-[#0a0a0c] overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-mono text-gray-500 uppercase">
                      <th className="p-4">CLIENT & ORG</th>
                      <th className="p-4">CONTACT CHANNELS</th>
                      <th className="p-4">PROJECT TYPE & BUDGET</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRequests.map((r) => (
                      <React.Fragment key={r.id}>
                        <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors leading-relaxed">
                          <td className="p-4">
                            <span className="block font-sans font-bold text-white text-sm">{r.fullName}</span>
                            <span className="block font-sans text-xs text-gray-500">{r.organizationName || "No Company"}</span>
                            <span className="block font-mono text-[9px] text-gray-600 mt-1 uppercase">LOC: {r.city || "?"}, {r.country || "?"}</span>
                          </td>
                          <td className="p-4">
                            <span className="block text-cyan-400">{r.email}</span>
                            <span className="block text-gray-500">{r.phoneNumber || "No Phone"}</span>
                          </td>
                          <td className="p-4">
                            <span className="block font-sans font-semibold text-white uppercase">{r.projectType}</span>
                            <span className="block text-purple-400 font-mono text-[10px]">{r.budget}</span>
                          </td>
                          <td className="p-4">
                            <select
                              value={r.status}
                              onChange={(e) => handleUpdateStatus(r.id, e.target.value as any)}
                              className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase border focus:outline-none ${
                                r.status === "new" ? "bg-blue-950/40 text-blue-400 border-blue-800" :
                                r.status === "in_progress" ? "bg-yellow-950/40 text-yellow-400 border-yellow-800" :
                                r.status === "completed" ? "bg-green-950/40 text-green-400 border-green-800" :
                                "bg-red-950/40 text-red-400 border-red-800"
                              }`}
                            >
                              <option value="new">NEW</option>
                              <option value="in_progress">IN PROGRESS</option>
                              <option value="completed">COMPLETED</option>
                              <option value="rejected">REJECTED</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              {/* Expand View/details */}
                              <button
                                type="button"
                                onClick={() => setExpandedRequestId(expandedRequestId === r.id ? null : r.id)}
                                className={`p-2 rounded cursor-pointer transition-colors ${
                                  expandedRequestId === r.id
                                    ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                                }`}
                                title="View full specs"
                              >
                                <Eye size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRequest(r.id)}
                                className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                                title="Delete request"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRequestId === r.id && (
                          <tr className="bg-white/[0.02] border-b border-white/5 animate-fade-in">
                            <td colSpan={5} className="p-6 text-xs text-gray-400 space-y-4 font-sans">
                              <div className="space-y-1">
                                <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Project Specification details</span>
                                <p className="text-gray-200 whitespace-pre-wrap font-sans text-xs bg-[#030304] p-4 rounded-xl border border-white/5 leading-relaxed shadow-inner">
                                  {r.description}
                                </p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 border-t border-white/5 mt-3">
                                <div className="space-y-1">
                                  <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Reference Links</span>
                                  <div className="text-gray-300 break-all font-mono text-[11px] bg-black/20 p-2.5 rounded-lg border border-white/5">
                                    {r.referenceLinks || "No reference links supplied."}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Uploaded Specification Document</span>
                                  <div className="text-gray-300 block font-mono text-[11px] bg-black/20 p-2.5 rounded-lg border border-white/5">
                                    {r.fileName ? (
                                      <div className="flex items-center space-x-2">
                                        <FileText size={12} className="text-cyan-400" />
                                        <span className="truncate max-w-xs text-cyan-400 font-bold">{r.fileName}</span>
                                        {r.fileUrl && (
                                          <a
                                            href={r.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-auto text-[9px] uppercase bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 transition-colors"
                                          >
                                            Open file
                                          </a>
                                        )}
                                      </div>
                                    ) : (
                                      "No specification document uploaded."
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}

                    {paginatedRequests.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500">
                          No client requests logged matching search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination controls */}
              {totalRequestPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">
                  <span>Page {requestPage} of {totalRequestPages}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={requestPage === 1}
                      onClick={() => setRequestPage((p) => p - 1)}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      disabled={requestPage === totalRequestPages}
                      onClick={() => setRequestPage((p) => p + 1)}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PORTFOLIO LIBRARY */}
          {activeTab === "portfolio" && (
            <div id="admin-tab-portfolio" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  PORTFOLIO LIBRARY & REORDER
                </h2>

                <button
                  onClick={() => setEditingProject({})}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>ADD PROJECT</span>
                </button>
              </div>

              {/* Form trigger popup (Add / Edit Project) */}
              {editingProject && (
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-cyan-500/20 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h3 className="font-sans font-bold text-white uppercase text-xs">
                      {editingProject.id ? "EDIT PORTFOLIO SPECIFICATIONS" : "NEW PORTFOLIO PROJECT SPECIFICATION"}
                    </h3>
                    <button onClick={() => setEditingProject(null)} className="text-gray-500 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Project Title *</label>
                      <input
                        required
                        type="text"
                        value={editingProject.title || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Category *</label>
                      <select
                        value={editingProject.category || "Commercial"}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      >
                        {["Commercial", "Corporate", "YouTube", "Motion Graphics", "VFX", "Reels", "3D", "Short Films"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block font-sans font-bold uppercase">Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingProject.description || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Client Name</label>
                      <input
                        type="text"
                        value={editingProject.clientName || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Duration (e.g., 45s, 5 min)</label>
                      <input
                        type="text"
                        value={editingProject.duration || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Thumbnail Unsplash Image URL</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={editingProject.thumbnail || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-cyan-500/40 text-white focus:outline-none"
                      />
                    </div>

                    {/* Secure File Uploader widget */}
                    <div className="space-y-1.5">
                      <label className="block font-sans font-bold uppercase">Video File Upload (secure node)</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          id="admin-video-file"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="video/mp4,video/quicktime,video/webm"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="admin-video-file"
                          className={`px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-semibold flex items-center space-x-1 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}`}
                        >
                          <Upload size={12} />
                          <span>{isUploading ? "Uploading..." : "Select Video"}</span>
                        </label>
                        {uploadedFileName && !isUploading && (
                          <span className="text-[10px] text-green-400 truncate max-w-xs">{uploadedFileName}</span>
                        )}
                      </div>
                      
                      {isUploading && (
                        <div className="mt-4 bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                          <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>{formatBytes(uploadStats.loaded)} / {formatBytes(uploadStats.total)}</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                            <div 
                              className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-gray-500">
                            <span>Speed: {formatBytes(uploadStats.speed)}/s</span>
                            <span>ETA: {formatTime(uploadStats.eta)}</span>
                          </div>
                        </div>
                      )}

                      {uploadSuccessMsg && !isUploading && (
                        <p className="text-[10px] text-green-400 mt-1">{uploadSuccessMsg}</p>
                      )}
                      {uploadError && !isUploading && (
                        <p className="text-[10px] text-rose-400 mt-1">{uploadError}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 flex justify-end space-x-2 pt-2 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        Forge Item
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Portfolio reordering list */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {portfolio.map((proj, idx) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-[#0a0a0c] border border-white/5 flex items-center justify-between text-xs gap-4">
                    <div className="flex items-center space-x-4 min-w-0">
                      <img src={proj.thumbnail} alt={proj.title} referrerPolicy="no-referrer" className="w-12 h-8 rounded object-cover" />
                      <div className="min-w-0">
                        <span className="font-mono text-[9px] text-cyan-400 uppercase">{proj.category}</span>
                        <h4 className="font-sans font-bold text-white text-sm truncate">{proj.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                      {/* Order indicator */}
                      <span className="font-mono text-gray-500 text-[10px]">ORDER_{proj.order}</span>

                      {/* Reorder Arrows */}
                      <div className="flex items-center space-x-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleReorderProject(idx, "up")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          disabled={idx === portfolio.length - 1}
                          onClick={() => handleReorderProject(idx, "down")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS VAULT */}
          {activeTab === "pdfs" && (
            <div id="admin-tab-documents" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  DOCUMENTS VAULT (PRICE LISTS, DECKS)
                </h2>

                <button
                  onClick={() => setEditingPdf({})}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>ADD PDF</span>
                </button>
              </div>

              {/* Form Dialog for PDFs */}
              {editingPdf && (
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-cyan-500/20 space-y-4 text-xs">
                  <h3 className="font-sans font-bold text-white uppercase">ADD / EDIT PDF FILE PARAMETERS</h3>
                  
                  <form onSubmit={handleSavePdf} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                    <div className="space-y-1.5">
                      <label className="block font-bold">Document Title *</label>
                      <input
                        required
                        type="text"
                        value={editingPdf.title || ""}
                        onChange={(e) => setEditingPdf({ ...editingPdf, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold">Category *</label>
                      <select
                        value={editingPdf.category || "Package"}
                        onChange={(e) => setEditingPdf({ ...editingPdf, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none"
                      >
                        {["Quotation", "Price List", "Package", "Brochure", "Company Profile"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block font-bold">Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingPdf.description || ""}
                        onChange={(e) => setEditingPdf({ ...editingPdf, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] text-white border border-white/10 focus:outline-none"
                      />
                    </div>

                    {/* PDF File Upload */}
                    <div className="space-y-1.5">
                      <label className="block font-bold">PDF File Upload</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          id="admin-pdf-file"
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="application/pdf"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="admin-pdf-file"
                          className={`px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 flex items-center space-x-1 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}`}
                        >
                          <Upload size={12} />
                          <span>{isUploading ? "Uploading..." : "Select PDF"}</span>
                        </label>
                        {uploadedFileName && !isUploading && (
                          <span className="text-[10px] text-green-400 truncate max-w-xs">{uploadedFileName}</span>
                        )}
                      </div>
                      
                      {isUploading && (
                        <div className="mt-4 bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                          <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>{formatBytes(uploadStats.loaded)} / {formatBytes(uploadStats.total)}</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                            <div 
                              className="bg-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-gray-500">
                            <span>Speed: {formatBytes(uploadStats.speed)}/s</span>
                            <span>ETA: {formatTime(uploadStats.eta)}</span>
                          </div>
                        </div>
                      )}

                      {uploadSuccessMsg && !isUploading && (
                        <p className="text-[10px] text-green-400 mt-1">{uploadSuccessMsg}</p>
                      )}
                      {uploadError && !isUploading && (
                        <p className="text-[10px] text-rose-400 mt-1">{uploadError}</p>
                      )}
                    </div>

                    {/* Downloads Allowed Toggle */}
                    <div className="flex items-center space-x-3 sm:col-span-2 p-3 bg-white/[0.01] border border-white/5 rounded-lg">
                      <input
                        type="checkbox"
                        id="pdf-downloads-toggle"
                        checked={editingPdf.downloadsAllowed ?? true}
                        onChange={(e) => setEditingPdf({ ...editingPdf, downloadsAllowed: e.target.checked })}
                        className="accent-cyan-500 rounded cursor-pointer"
                      />
                      <label htmlFor="pdf-downloads-toggle" className="font-sans text-xs text-gray-300 cursor-pointer select-none">
                        Allow Client Downloading (if false, clients can only preview/print but cannot download)
                      </label>
                    </div>

                    <div className="sm:col-span-2 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingPdf(null)}
                        className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-6 py-2 rounded-lg font-sans font-bold text-black ${isUploading ? 'bg-cyan-500/50 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                      >
                        Commit PDF
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of PDFs */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {pdfs.map((docItem) => (
                  <div key={docItem.id} className="p-4 rounded-xl bg-[#0a0a0c] border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 rounded bg-white/[0.02] text-cyan-400">
                        <FileText size={16} />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">{docItem.category}</span>
                        <h4 className="font-sans font-bold text-white text-sm">{docItem.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black ${docItem.downloadsAllowed ? "bg-green-950 text-green-400" : "bg-red-950 text-red-400"}`}>
                        {docItem.downloadsAllowed ? "DL_ALLOWED" : "DL_LOCKED"}
                      </span>
                      <button
                        onClick={() => handleDeletePdf(docItem.id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTENT STUDIO (WEBSITE TEXTS) */}
          {activeTab === "content" && content && (
            <div id="admin-tab-content" className="space-y-8 animate-fade-in text-xs text-gray-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  CONTENT STUDIO (IN-LINE EDITOR)
                </h2>
              </div>

              <form onSubmit={handleSaveContent} className="space-y-6">
                {/* 0. Studio Logo Upload */}
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                  <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider border-b border-white/5 pb-1">
                    STUDIO BRAND LOGO
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Upload your custom Frame Forge Studios brand logo. Supported formats: PNG, JPG, JPEG, SVG.
                        This will dynamically propagate across all headers, footers, navigation, and loading stages in real-time.
                      </p>
                      <div className="flex items-center space-x-3">
                        <label className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all inline-block">
                          <span>UPLOAD LOGO IMAGE</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === "string") {
                                    setContent({ ...content, logoUrl: reader.result });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                        {content.logoUrl && (
                          <button
                            type="button"
                            onClick={() => setContent({ ...content, logoUrl: "" })}
                            className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold uppercase transition-all cursor-pointer"
                          >
                            RESET TO VECTOR
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col items-center justify-center min-h-[120px] text-center space-y-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">// Brand Logo Preview</span>
                      {content.logoUrl ? (
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={content.logoUrl}
                            alt="Uploaded Logo Preview"
                            className="h-16 w-16 object-contain rounded bg-[#F6F5F2] p-2"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] text-green-400 font-mono">Dynamic Image Active</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <Logo size={42} showText={true} variant="dark" />
                          <span className="text-[10px] text-cyan-400 font-mono">Vector Fallback Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 1. Hero text */}
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                  <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider border-b border-white/5 pb-1">
                    LANDING HERO BRANDING
                  </h3>

                  <div className="space-y-2">
                    <label className="block font-bold">Hero Title (Use newline for cinematic pacing) *</label>
                    <textarea
                      required
                      rows={2}
                      value={content.heroTitle}
                      onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white font-sans font-bold focus:outline-none focus:border-cyan-500/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold">Hero Subtitle *</label>
                    <input
                      required
                      type="text"
                      value={content.heroSubtitle}
                      onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                    />
                  </div>
                </div>

                {/* 2. About page text */}
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                  <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider border-b border-white/5 pb-1">
                    ABOUT STUDIO SPECS
                  </h3>

                  <div className="space-y-2">
                    <label className="block font-bold">About Headline *</label>
                    <input
                      required
                      type="text"
                      value={content.aboutTitle}
                      onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold">About Quote</label>
                    <textarea
                      rows={3}
                      value={content.aboutQuote || ""}
                      onChange={(e) => setContent({ ...content, aboutQuote: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold">About Mission Body *</label>
                    <textarea
                      required
                      rows={4}
                      value={content.aboutText}
                      onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40 leading-relaxed"
                    />
                  </div>
                </div>

                {/* 3. Contact details */}
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                  <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider border-b border-white/5 pb-1">
                    STAGING STACK CHANNELS (CONTACT METRICS)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-bold">Official Email *</label>
                      <input
                        required
                        type="email"
                        value={content.contactEmail}
                        onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold">Official Phone *</label>
                      <input
                        required
                        type="text"
                        value={content.contactPhone}
                        onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold">WhatsApp Action Link *</label>
                      <input
                        required
                        type="text"
                        value={content.contactWhatsapp}
                        onChange={(e) => setContent({ ...content, contactWhatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold">Instagram URL *</label>
                      <input
                        required
                        type="text"
                        value={content.contactInstagram}
                        onChange={(e) => setContent({ ...content, contactInstagram: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block font-bold">BKC Headquarters Location Address *</label>
                      <input
                        required
                        type="text"
                        value={content.contactLocation}
                        onChange={(e) => setContent({ ...content, contactLocation: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Submits content */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/5">
                  {contentSaveSuccess && (
                    <span className="text-green-400 font-mono text-[11px] animate-fade-in">
                      ✓ Website configurations saved successfully!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-sans font-black text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all cursor-pointer"
                  >
                    SAVE ALL TEXT CONFIGS
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: CAPABILITIES & SERVICES STUDIO */}
          {activeTab === "services" && (
            <div id="admin-tab-services" className="space-y-6 animate-fade-in text-xs text-gray-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="font-sans font-black text-xl text-white uppercase tracking-wide">
                  CAPABILITIES & CORE SERVICES
                </h2>
                {!editingService && (
                  <button
                    onClick={() => setEditingService({ iconName: "Film", order: services.length + 1 })}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>ADD NEW SERVICE</span>
                  </button>
                )}
              </div>

              {/* SERVICE EDITOR FORM */}
              {editingService && (
                <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 space-y-4">
                  <h3 className="font-sans font-black text-xs text-cyan-400 uppercase tracking-wider border-b border-white/5 pb-2">
                    {editingService.id ? "EDIT SERVICE CAPABILITY" : "CREATE NEW SERVICE CAPABILITY"}
                  </h3>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-1.5">
                        <label className="block font-bold">Service Title *</label>
                        <input
                          required
                          type="text"
                          value={editingService.title || ""}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                          placeholder="e.g. Premium Video Editing"
                        />
                      </div>

                      {/* Badge */}
                      <div className="space-y-1.5">
                        <label className="block font-bold">Badge *</label>
                        <input
                          required
                          type="text"
                          value={editingService.badge || ""}
                          onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                          placeholder="e.g. Editorial, CGI & 3D, VFX"
                        />
                      </div>

                      {/* Icon Selector */}
                      <div className="space-y-1.5">
                        <label className="block font-bold">Lucide Icon Type *</label>
                        <select
                          value={editingService.iconName || "Film"}
                          onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0a0a0c] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40 cursor-pointer"
                        >
                          <option value="Film">Film (Video / Editorial)</option>
                          <option value="Layers">Layers (Motion Graphics)</option>
                          <option value="Sparkles">Sparkles (Visual Effects)</option>
                          <option value="Boxes">Boxes (3D / CGI)</option>
                          <option value="Target">Target (Commercials / Ads)</option>
                          <option value="Palette">Palette (Color Science)</option>
                        </select>
                      </div>

                      {/* Order */}
                      <div className="space-y-1.5">
                        <label className="block font-bold">Display Order *</label>
                        <input
                          required
                          type="number"
                          value={editingService.order || ""}
                          onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div className="space-y-1.5">
                      <label className="block font-bold">Short Description (Sub-bar text, approx. 10 words) *</label>
                      <input
                        required
                        type="text"
                        value={editingService.desc || ""}
                        onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40"
                        placeholder="Narrative pacing, seamless multi-cam assembly..."
                      />
                    </div>

                    {/* Full Description (Popped open text) */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block font-bold">Pop-open Detail Description (~50 words detailed view) *</label>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {editingService.fullDescription ? editingService.fullDescription.split(/\s+/).filter(Boolean).length : 0} words
                        </span>
                      </div>
                      <textarea
                        required
                        rows={4}
                        value={editingService.fullDescription || ""}
                        onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-cyan-500/40 leading-relaxed font-sans text-xs"
                        placeholder="Provide an immersive 40-60 words detailed paragraph about your post-production workflow, sound engineering, and creative methods for this service. This pops open with smooth animations when clicked."
                      />
                    </div>

                    {/* Actions row */}
                    <div className="flex justify-end space-x-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 text-xs font-bold uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-400 transition-all cursor-pointer"
                      >
                        Save Capability
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SERVICES LISTING */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="font-sans font-bold text-xs text-white uppercase tracking-wider">
                    CURRENT SERVICE ITEMS
                  </h3>
                  <span className="font-mono text-[9px] text-gray-500">{services.length} SAVED</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {services.map((srv, idx) => (
                    <div
                      key={srv.id}
                      className="p-5 rounded-2xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-gray-600 font-bold px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5">
                            ORD_{srv.order}
                          </span>
                          <span className="font-sans font-bold text-sm text-cyan-400 uppercase tracking-wide">
                            {srv.title}
                          </span>
                          <span className="font-mono text-[8px] font-black px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-wider">
                            {srv.badge}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                            <span className="text-gray-600 uppercase font-bold text-[9px] mr-1">Summary:</span>
                            {srv.desc}
                          </p>
                          <p className="text-gray-500 text-xs italic leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.02]">
                            <span className="text-cyan-600/60 uppercase font-black not-italic text-[8px] tracking-wider block mb-1">// DYNAMIC POP OPEN DETAIL (~50 words):</span>
                            "{srv.fullDescription}"
                          </p>
                        </div>
                      </div>

                      {/* Management actions */}
                      <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                        {/* Order Up */}
                        <button
                          disabled={idx === 0}
                          onClick={() => handleReorderService(idx, "up")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        {/* Order Down */}
                        <button
                          disabled={idx === services.length - 1}
                          onClick={() => handleReorderService(idx, "down")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => setEditingService(srv)}
                          className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 cursor-pointer"
                          title="Edit service details"
                        >
                          <Edit size={12} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                          title="Delete capability"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {services.length === 0 && (
                    <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
                      <p className="text-gray-500 text-sm">No capabilities/services in the database yet.</p>
                      <button
                        onClick={() => setEditingService({ iconName: "Film", order: 1 })}
                        className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-black font-sans font-bold text-xs uppercase cursor-pointer inline-flex items-center gap-1"
                      >
                        <Plus size={12} /> Add First Service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
