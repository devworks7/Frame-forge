import {
  PortfolioItem,
  PDFDoc,
  Testimonial,
  FAQItem,
  SectionContent,
  ClientRequest,
  Analytics,
  RecentActivity,
  ServiceItem
} from "../types";
import {
  DEFAULT_PORTFOLIO,
  DEFAULT_PDFS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
  DEFAULT_CONTENT,
  DEFAULT_SERVICES
} from "./seedData";

const getHeaders = () => {
  const token = localStorage.getItem("ff_admin_token");
  return {
    "Content-Type": "application/json",
    "X-Seeding-Bypass": "frameforge-seed-2026",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper to check and seed collections via REST API
export async function seedDatabaseIfEmpty() {
  try {
    // 1. Portfolio
    const portItems = await getPortfolioItems();
    if (portItems.length === 0 || (portItems.length === DEFAULT_PORTFOLIO.length && !localStorage.getItem("seeded_portfolio"))) {
      console.log("Seeding portfolio collection...");
      for (const item of DEFAULT_PORTFOLIO) {
        await savePortfolioItem(item);
      }
      localStorage.setItem("seeded_portfolio", "true");
    }

    // 2. PDFs
    const pdfsList = await getPDFDocuments();
    if (pdfsList.length === 0 || (pdfsList.length === DEFAULT_PDFS.length && !localStorage.getItem("seeded_pdfs"))) {
      console.log("Seeding pdfs collection...");
      for (const item of DEFAULT_PDFS) {
        await savePDFDocument(item);
      }
      localStorage.setItem("seeded_pdfs", "true");
    }

    // 3. Testimonials
    const testList = await getTestimonials();
    if (testList.length === 0 || (testList.length === DEFAULT_TESTIMONIALS.length && !localStorage.getItem("seeded_testimonials"))) {
      console.log("Seeding testimonials collection...");
      for (const item of DEFAULT_TESTIMONIALS) {
        await saveTestimonial(item);
      }
      localStorage.setItem("seeded_testimonials", "true");
    }

    // 4. FAQs
    const faqList = await getFAQs();
    if (faqList.length === 0 || (faqList.length === DEFAULT_FAQS.length && !localStorage.getItem("seeded_faqs"))) {
      console.log("Seeding faqs collection...");
      for (const item of DEFAULT_FAQS) {
        await saveFAQ(item);
      }
      localStorage.setItem("seeded_faqs", "true");
    }

    // 4.5 Services
    const srvList = await getServices();
    if (srvList.length === 0 || (srvList.length === DEFAULT_SERVICES.length && !localStorage.getItem("seeded_services"))) {
      console.log("Seeding services collection...");
      for (const item of DEFAULT_SERVICES) {
        await saveServiceItem(item);
      }
      localStorage.setItem("seeded_services", "true");
    }

    // 5. Section Content (Single Doc)
    const content = await getSectionContent();
    if (!content || !content.heroTitle) {
      console.log("Seeding settings content doc...");
      await saveSectionContent(DEFAULT_CONTENT);
    }

    // 6. Analytics
    const analytics = await getAnalytics();
    if (analytics.totalVisitors === 0) {
      await fetch("/api/db/settings_analytics", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          totalVisitors: 452,
          projectRequests: 18,
          emailsReceived: 34,
          videoViews: 1290,
          pdfViews: 142
        })
      });
    }
  } catch (error) {
    console.error("Failed to seed local database:", error);
  }
}

// ------------------------------------------
// PORTFOLIO API
// ------------------------------------------
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch("/api/db/portfolio");
    if (!res.ok) throw new Error("Failed to fetch portfolio");
    const items = await res.json();
    return items.length > 0 ? items : DEFAULT_PORTFOLIO;
  } catch (e) {
    console.warn("Local portfolio read failed, using static fallback:", e);
    return DEFAULT_PORTFOLIO;
  }
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
  try {
    const res = await fetch("/api/db/pdfs");
    if (!res.ok) throw new Error("Failed to fetch pdfs");
    const docsList = await res.json();
    return docsList.length > 0 ? docsList : DEFAULT_PDFS;
  } catch (e) {
    console.warn("Local pdfs read failed, using static fallback:", e);
    return DEFAULT_PDFS;
  }
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
  try {
    const res = await fetch("/api/db/testimonials");
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    const items = await res.json();
    return items.length > 0 ? items : DEFAULT_TESTIMONIALS;
  } catch (e) {
    return DEFAULT_TESTIMONIALS;
  }
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
  try {
    const res = await fetch("/api/db/faqs");
    if (!res.ok) throw new Error("Failed to fetch faqs");
    const items = await res.json();
    return items.length > 0 ? items : DEFAULT_FAQS;
  } catch (e) {
    return DEFAULT_FAQS;
  }
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
  try {
    const res = await fetch("/api/db/services");
    if (!res.ok) throw new Error("Failed to fetch services");
    const items = await res.json();
    return items.length > 0 ? items : DEFAULT_SERVICES;
  } catch (e) {
    console.warn("Local services read failed, using static fallback:", e);
    return DEFAULT_SERVICES;
  }
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
export async function getSectionContent(): Promise<SectionContent> {
  try {
    const res = await fetch("/api/db/settings_content");
    if (!res.ok) throw new Error("Failed to fetch section content");
    const data = await res.json();
    return data || DEFAULT_CONTENT;
  } catch (e) {
    return DEFAULT_CONTENT;
  }
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
  try {
    const res = await fetch("/api/db/requests");
    if (!res.ok) throw new Error("Failed to fetch requests");
    const requests: ClientRequest[] = await res.json();
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    return [];
  }
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
  try {
    const res = await fetch("/api/db/settings_analytics");
    if (!res.ok) throw new Error("Failed to fetch analytics");
    const data = await res.json();
    return data || { totalVisitors: 452, projectRequests: 18, emailsReceived: 34, videoViews: 1290, pdfViews: 142 };
  } catch (e) {
    return { totalVisitors: 0, projectRequests: 0, emailsReceived: 0, videoViews: 0, pdfViews: 0 };
  }
}

export async function incrementAnalytics(field: keyof Analytics): Promise<void> {
  try {
    const res = await fetch("/api/db/analytics/increment", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ field }),
    });
    if (!res.ok) throw new Error("Failed to increment analytics");
  } catch (e) {
    console.warn("Analytics increment failed:", e);
  }
}

// Log a recent activity to file database
export async function logActivity(type: RecentActivity["type"], description: string): Promise<void> {
  try {
    const id = "act-" + Date.now();
    const activity: RecentActivity = {
      id,
      type,
      description,
      timestamp: new Date().toISOString()
    };
    const res = await fetch("/api/db/activities", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(activity),
    });
    if (!res.ok) throw new Error("Failed to save activity");
  } catch (e) {
    console.warn("Activity logging failed:", e);
  }
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  try {
    const res = await fetch("/api/db/activities");
    if (!res.ok) throw new Error("Failed to fetch activities");
    const list: RecentActivity[] = await res.json();
    return list
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10); // Show top 10
  } catch (e) {
    return [];
  }
}
