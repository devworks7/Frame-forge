import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectToDatabase, createSession, verifySession, deleteSession } from "./utils/db-helper.js";
import { AdminUser, ClientRequest } from "../src/db/mongodb.js";

export default async function handler(req: any, res: any) {
  try {
    const host = (req && req.headers && req.headers.host) || 'localhost';
    const url = new URL((req && req.url) || '', `http://${host}`);
    const pathname = url.pathname;

    try {
      await connectToDatabase();
    } catch (err: any) {
      return res.status(503).json({ error: "Database Service Unavailable." });
    }

  // Handle /api/admin/login
  if (pathname === "/api/admin/login") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });
    try {
      const admin = await AdminUser.findOne({ username });
      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (isMatch) {
          const token = crypto.randomBytes(32).toString("hex");
          await createSession(token);
          return res.json({ success: true, token, mustChangePassword: admin.mustChangePassword });
        }
      }
      return res.status(401).json({ error: "Invalid username or password" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Login failed" });
    }
  }

  // Handle /api/admin/change-password
  if (pathname === "/api/admin/change-password") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { token, newPassword } = req.body || {};
    if (!token) return res.status(403).json({ error: "Unauthorized session" });
    const isValid = await verifySession(token);
    if (!isValid) return res.status(403).json({ error: "Unauthorized session" });
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    const newHash = await bcrypt.hash(newPassword, 10);
    await AdminUser.updateMany({}, { passwordHash: newHash, mustChangePassword: false });
    return res.json({ success: true, message: "Password updated successfully" });
  }

  // Handle /api/admin/logout
  if (pathname === "/api/admin/logout") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { token } = req.body || {};
    if (token) {
      await deleteSession(token);
    }
    return res.json({ success: true });
  }

  // Handle /api/admin/validate
  if (pathname === "/api/admin/validate") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { token } = req.body || {};
    if (!token) return res.json({ valid: false });
    const isValid = await verifySession(token);
    if (isValid) {
      const admin = await AdminUser.findOne();
      const mustChange = admin ? admin.mustChangePassword : true;
      return res.json({ valid: true, mustChangePassword: mustChange });
    }
    return res.json({ valid: false });
  }

  // Handle /api/admin/export-csv
  if (pathname === "/api/admin/export-csv") {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { token, requests: bodyRequests } = req.body || {};
    if (!token) return res.status(403).json({ error: "Unauthorized access" });
    const isValid = await verifySession(token);
    if (!isValid) return res.status(403).json({ error: "Unauthorized access" });

    let list = bodyRequests;
    if (!list || !Array.isArray(list)) {
      list = await ClientRequest.find().sort({ createdAt: -1 });
    }

    const csvRows = [];
    csvRows.push([
      "ID",
      "Full Name",
      "Organization",
      "Email",
      "Phone",
      "Country",
      "City",
      "Project Type",
      "Purpose",
      "Budget",
      "Deadline",
      "Hear From",
      "Status",
      "Created At"
    ].join(","));

    for (const r of list) {
      const row = [
        `"${r.id || ''}"`,
        `"${(r.fullName || '').replace(/"/g, '""')}"`,
        `"${(r.organizationName || '').replace(/"/g, '""')}"`,
        `"${(r.email || '').replace(/"/g, '""')}"`,
        `"${(r.phoneNumber || '').replace(/"/g, '""')}"`,
        `"${(r.country || '').replace(/"/g, '""')}"`,
        `"${(r.city || '').replace(/"/g, '""')}"`,
        `"${(r.projectType || '').replace(/"/g, '""')}"`,
        `"${(r.purpose || '').replace(/"/g, '""')}"`,
        `"${(r.budget || '').replace(/"/g, '""')}"`,
        `"${(r.deadline || '').replace(/"/g, '""')}"`,
        `"${(r.hearFrom || '').replace(/"/g, '""')}"`,
        `"${(r.status || 'new')}"`,
        `"${r.createdAt || ''}"`
      ];
      csvRows.push(row.join(","));
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=frame_forge_requests.csv");
    return res.send(csvRows.join("\n"));
  }

  return res.status(404).json({ error: "Admin endpoint not found" });
  } catch (err: any) {
    console.error("Admin API handler error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
