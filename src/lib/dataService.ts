import { 
  PortfolioItem, PDFDoc, FAQItem, Testimonial, 
  ClientRequest, Analytics, RecentActivity, 
  ServiceItem, SectionContent 
} from "../types";

const getHeaders = () => {
  const token = localStorage.getItem("ff_admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

export async function checkInitialSeed(): Promise<void> {
  // DB automatically seeds itself on startup via seedDB() inside api/utils/db-helper.ts and mongodb.ts
  return;
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("ff_admin_token");
  
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Upload to Cloudinary failed");
  }

  const data = await res.json();
  return data.url;
}

// ------------------------------------------
// PORTFOLIO API
// ------------------------------------------
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch("/api/db/portfolio");
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const res = await fetch("/api/db/portfolio", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to save portfolio item");
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const res = await fetch(`/api/db/portfolio/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete portfolio item");
}

// ------------------------------------------
// PDF DOCUMENTS API
// ------------------------------------------
export async function getPDFDocuments(): Promise<PDFDoc[]> {
  const res = await fetch("/api/db/pdfs");
  if (!res.ok) throw new Error("Failed to fetch pdfs");
  return res.json();
}

export async function savePDFDocument(pdf: PDFDoc): Promise<void> {
  const res = await fetch("/api/db/pdfs", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(pdf),
  });
  if (!res.ok) throw new Error("Failed to save pdf document");
}

export async function deletePDFDocument(id: string): Promise<void> {
  const res = await fetch(`/api/db/pdfs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete pdf document");
}

// ------------------------------------------
// TESTIMONIALS API
// ------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch("/api/db/testimonials");
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function saveTestimonial(test: Testimonial): Promise<void> {
  const res = await fetch("/api/db/testimonials", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(test),
  });
  if (!res.ok) throw new Error("Failed to save testimonial");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const res = await fetch(`/api/db/testimonials/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete testimonial");
}

// ------------------------------------------
// FAQS API
// ------------------------------------------
export async function getFAQs(): Promise<FAQItem[]> {
  const res = await fetch("/api/db/faqs");
  if (!res.ok) throw new Error("Failed to fetch faqs");
  return res.json();
}

export async function saveFAQ(faq: FAQItem): Promise<void> {
  const res = await fetch("/api/db/faqs", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(faq),
  });
  if (!res.ok) throw new Error("Failed to save FAQ");
}

export async function deleteFAQ(id: string): Promise<void> {
  const res = await fetch(`/api/db/faqs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete FAQ");
}

// ------------------------------------------
// SERVICES API
// ------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  const res = await fetch("/api/db/services");
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function saveServiceItem(item: ServiceItem): Promise<void> {
  const res = await fetch("/api/db/services", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to save service item");
}

export async function deleteServiceItem(id: string): Promise<void> {
  const res = await fetch(`/api/db/services/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete service item");
}

// ------------------------------------------
// SECTION CONTENT (SETTINGS)
// ------------------------------------------
export async function getSectionContent(): Promise<SectionContent | null> {
  const res = await fetch("/api/db/settings_content");
  if (!res.ok) throw new Error("Failed to fetch section content");
  const data = await res.json();
  if (!data || Object.keys(data).length === 0) return null;
  return data;
}

export async function saveSectionContent(content: SectionContent): Promise<void> {
  const res = await fetch("/api/db/settings_content", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(content),
  });
  if (!res.ok) throw new Error("Failed to save section content");
}

// ------------------------------------------
// CLIENT REQUESTS
// ------------------------------------------
export async function getClientRequests(): Promise<ClientRequest[]> {
  const res = await fetch("/api/db/requests");
  if (!res.ok) throw new Error("Failed to fetch requests");
  const requests: ClientRequest[] = await res.json();
  return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveClientRequest(req: ClientRequest): Promise<void> {
  const res = await fetch("/api/db/requests", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error("Failed to save client request");
}

export async function deleteClientRequest(id: string): Promise<void> {
  const res = await fetch(`/api/db/requests/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete client request");
}

// ------------------------------------------
// ANALYTICS & RECENT ACTIVITIES
// ------------------------------------------
export async function getAnalytics(): Promise<Analytics> {
  const res = await fetch("/api/db/settings_analytics");
  if (!res.ok) throw new Error("Failed to fetch analytics");
  const data = await res.json();
  if (!data || Object.keys(data).length === 0) return { totalVisitors: 0, projectRequests: 0, emailsReceived: 0, videoViews: 0, pdfViews: 0 };
  return data;
}

export async function incrementAnalytics(field: keyof Analytics): Promise<void> {
  try {
    await fetch("/api/db/analytics/increment", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ field }),
    });
  } catch (e) {
    console.warn("Analytics increment failed:", e);
  }
}

export async function logActivity(type: RecentActivity["type"], description: string): Promise<void> {
  try {
    const id = "act-" + Date.now();
    const activity: RecentActivity = {
      id,
      type,
      description,
      timestamp: new Date().toISOString()
    };
    await fetch("/api/db/activities", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(activity),
    });
  } catch (e) {
    console.warn("Activity logging failed:", e);
  }
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  const res = await fetch("/api/db/activities");
  if (!res.ok) throw new Error("Failed to fetch activities");
  const list: RecentActivity[] = await res.json();
  return list
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);
}
