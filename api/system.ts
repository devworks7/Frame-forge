import { connectToDatabase } from "./utils/db-helper.js";

export default async function handler(req: any, res: any) {
  try {
    const host = (req && req.headers && req.headers.host) || 'localhost';
    const url = new URL((req && req.url) || '', `http://${host}`);
    const pathname = url.pathname;

  let connected = false;
  let error = null;

  try {
    await connectToDatabase();
    connected = true;
  } catch (err: any) {
    connected = false;
    error = err.message || "Failed to connect to database";
  }

  if (pathname === "/api/health") {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
    return res.status(connected ? 200 : 503).json({
      status: connected ? "healthy" : "unhealthy",
      time: new Date().toISOString(),
      database: {
        mode: "mongodb",
        connected,
        error,
      },
    });
  }

  if (pathname === "/api/db-status") {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
    return res.json({
      connected,
      mode: "mongodb",
      error,
    });
  }

  if (pathname.startsWith("/api/stream-video/")) {
    return res.redirect("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4");
  }

  if (pathname.startsWith("/api/documents/")) {
    return res.redirect("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  }

  return res.status(404).json({ error: "System endpoint not found" });
  } catch (err: any) {
    console.error("System API handler error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
