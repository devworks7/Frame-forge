import { connectToDatabase } from "./utils/db-helper.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { requestDetails } = req.body || {};
  if (!requestDetails) {
    return res.status(400).json({ error: "Request details are required" });
  }

  const { fullName, email, projectType, budget, description } = requestDetails;

  console.log("\n=======================================================");
  console.log("📧 EMAIL DISPATCH SYSTEM - FRAME FORGE SMTP INTERCEPT");
  console.log("=======================================================");
  console.log(`[TO ADMIN] devashishpd@gmail.com`);
  console.log(`[SUBJECT] 🔥 New Project Proposal Forged: ${projectType} by ${fullName}`);
  console.log(`[BODY]:`);
  console.log(`  Hey Forge Admin,`);
  console.log(`  A new custom cinematic request has been submitted by ${fullName} (${email}).`);
  console.log(`  Project Type: ${projectType}`);
  console.log(`  Est. Budget: ${budget}`);
  console.log(`  Description: "${description}"`);
  console.log(`  Go to the Admin Dashboard to review/approve details!`);
  console.log("-------------------------------------------------------");
  console.log(`[TO CLIENT] ${email}`);
  console.log(`[SUBJECT] ⚡ Proposal Captured: Frame Forge is Processing Your Vision`);
  console.log(`[BODY]:`);
  console.log(`  Dear ${fullName},`);
  console.log(`  We don't edit videos. We forge experiences.`);
  console.log(`  Our Creative Director and Senior Motion Engineers have captured your request.`);
  console.log(`  We are reviewing your ${projectType} project parameters.`);
  console.log(`  Expect a customized visual treatment proposal in your inbox within 24 hours.`);
  console.log(`  Forge onward,`);
  console.log(`  The Frame Forge Team`);
  console.log("=======================================================\n");

  return res.json({
    success: true,
    message: "Emails processed successfully and logged to security server terminal.",
  });
}
